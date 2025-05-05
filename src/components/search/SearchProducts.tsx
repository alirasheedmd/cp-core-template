'use client'
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormField, Form, FormControl, FormItem, FormMessage } from "@/components/ui/form";
import  toast  from "react-hot-toast";
import Pagination from "@/components/Pagination";
import { type Product } from "@/db/schema";
import { useDebouncedCallback } from "use-debounce";

const searchFormSchema = z.object({
  keyword: z.string().optional(),
});

type SearchFormValues = z.infer<typeof searchFormSchema>;

export default function SearchPage() {

  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = useDebouncedCallback((term: string) => {
      if (!term) {
        setSuggestions([]);
        return;
      }
      fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchText: term }),
      })
        .then((res) => res.json())
        .then((data) => {
          const results = data.products as Product[];
          setSuggestions(results);
        });
    }, 400);
  
    useEffect(() => {
      fetchSuggestions(query);
    }, [query, fetchSuggestions]);

  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      keyword: "",
    },
  });

  const onSubmit = async (data: SearchFormValues) => {
    setLoading(true);
    setShowSuggestions(false);
    toast("Searching...");
    console.log("Search data:", data)
    try {
      const { keyword } = data;
      const result = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchText: keyword }),
      });
      if (!result.ok) {
        throw new Error("Network response was not ok");
      }
      const { products } = await result.json();

      const productsData = products as Product[];
      setSearchResults(productsData);
      toast("Search Complete");
    } catch (error) {
      toast("An error occurred while searching. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log("Search Results:", searchResults);
  console.log("Suggestions:", suggestions);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(8);

  const lastProductIndex = currentPage * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;
  const currentProducts = searchResults.slice(firstProductIndex, lastProductIndex);

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col lg:flex-row lg:justify-between gap-4">
            <FormField
              control={form.control}
              name="keyword"
              render={({ field }) => (
                <FormItem className="flex mt-2 w-full sm:w-[300px] md:w-[400px] lg:w-[500px]">
                  <FormControl className="bg-blue-50 dark:bg-slate-900 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0">
                  <div className="relative w-full">
                      <Input
                        {...field}
                        placeholder="Search"
                        onChange={(e) => {
                          field.onChange(e); // ensures form value stays updated
                          setQuery(e.target.value);
                          setShowSuggestions(true);
                        }}
                        className="text-xs font-semibold text-black dark:text-white"
                      />
                      {showSuggestions && suggestions.length > 0 && (
                        <ul className="absolute z-10 mt-1 w-full bg-white dark:bg-slate-900 border border-slate-200 shadow-md">
                          {suggestions.map((s) => (
                            <li
                              key={s.id}
                              onClick={() => {
                                setQuery(s.title);
                                form.setValue("keyword", s.title); // update form field value
                                setShowSuggestions(false);
                              }}
                              className="p-2 hover:bg-gray-100 cursor-pointer text-xs"
                            >
                              {s.title}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="flex-shrink-0 lg:mt-2 self-end w-full lg:w-auto"
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </Button>
          </form>
        </Form>
      </div>

      {/* Search Results Table */}
      {searchResults.length > 0 && (
        <>
          {/* <SearchProductTableUser currentQuestions={currentProducts as Product[]} limit={productsPerPage} /> */}
          <div className="flex flex-col mx-10 mt-4">
            <h3 className="text-2xl mb-4 font-semibold">Search Results: </h3>
            <div>
              {currentProducts.length < 10 && currentProducts.length > 0 ? currentProducts.map((product) => (
                <div key={product.id} className="p-4 border rounded shadow-sm bg-white mb-2">
                  <h3 className="font-bold text-lg">{product.title}</h3>
                  <p className="text-sm text-gray-600">{product.country}</p>
                </div>
              )): null}
            </div>
          </div>
          {searchResults.length > productsPerPage &&
            <Pagination totalItems={searchResults.length} itemsPerPage={productsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
          }
        </>
      )}

      {/* No Results Message */}
      {searchResults.length === 0 && !loading && (
        <div className="text-center mt-4 text-xs font-semibold text-black dark:text-white">
          No results found
        </div>
      )}
    </div>
  );
}
