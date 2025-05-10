'use client'

import React from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import WebContainer from '@/components/web/shared/WebContainer'

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .transform((val) => val.replace(/[\s\-\(\)]/g, ''))
    .pipe(
      z
        .string()
        .regex(/^\+?[0-9]+$/, 'Must contain only numbers and optional + prefix')
        .min(8, 'Phone number must be at least 8 digits')
        .max(20, 'Phone number must not exceed 20 digits'),
    ),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormValues = z.infer<typeof contactFormSchema>

export default function ContactPage() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  })

  const onSubmit = async (data: ContactFormValues) => {
    // Here you would typically send the data to your backend
    console.log(data)
    // For now, we'll just show an alert
    alert('Thank you for your message! We will get back to you soon.')
    form.reset()
  }

  return (
    <WebContainer className="max-w-2xl py-8">
      <h1 className="mb-8 text-center text-3xl font-bold">Contact Us</h1>
      <p className="mb-8 text-center text-gray-600">
        Have a question or feedback? We&apos;d love to hear from you. Fill out
        the form below and we&apos;ll get back to you as soon as possible.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="your.email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="+1234567890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <textarea
                    className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring min-h-[120px] w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Your message here..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <button
            type="submit"
            className="bg-primary hover:bg-primary/90 w-full rounded-md px-4 py-2 text-white transition-colors"
          >
            Send Message
          </button>
        </form>
      </Form>

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="text-center">
          <h3 className="mb-2 font-semibold">Email Us</h3>
          <p className="text-gray-600">support@example.com</p>
        </div>
        <div className="text-center">
          <h3 className="mb-2 font-semibold">Call Us</h3>
          <p className="text-gray-600">+1 (555) 123-4567</p>
        </div>
      </div>
    </WebContainer>
  )
}
