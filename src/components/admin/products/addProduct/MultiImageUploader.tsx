import { useFieldArray, useFormContext } from "react-hook-form";
import { ProductFormValues } from "./ProductInfo";
import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { generateThumbHashFromFile } from "@/lib/thumbhash-client";
import { createPngDataUri } from "unlazy/thumbhash";
import { ProgressArgs, Uploader } from "@/lib/uploader";
import { cn } from "@/lib/utils";
import { DragAndDrop } from "./DragAndDrop";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { SortableItem } from "./SortableItem";
import {
  ImageItem,
  ImageProgress,
  MultiImageUploaderProps,
} from "@/types/image-uploader";

const DragAndDropContext = dynamic(
  () => import("./DragAndDropContext").then((mod) => mod.DragAndDropContext),
  {
    ssr: false,
    loading: () => (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="aspect-3/2 w-full rounded-md" />
        ))}
      </div>
    ),
  },
);

export default function MultiImageUploader(props: MultiImageUploaderProps) {
  const { className } = props;
  const form = useFormContext<ProductFormValues>();
  const { fields, replace } = useFieldArray({
    control: form.control,
    name: "images",
    keyName: "uuid",
  });

  const [items, setItems] = useState<ImageItem[]>(fields as ImageItem[]);
  const [progress, setProgress] = useState<ImageProgress[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleItemProgress = useCallback((updates: ImageProgress) => {
    setProgress((prev) => {
      const index = prev.findIndex((item) => item.uuid === updates.uuid);
      if (index === -1) {
        return [...prev, updates];
      }
      const newProgress = [...prev];
      newProgress[index] = { ...newProgress[index], ...updates };
      return newProgress;
    });
  }, []);

  const handleItemsUpdate = useCallback(
    (newItems: ImageItem[]) => {
      replace(newItems);
      setItems(newItems);
    },
    [replace],
  );

  const setFiles = useCallback(
    async (validFiles: File[]) => {
      const files = Object.values(validFiles);
      setIsUploading(files.length > 0);

      let id = items.length + 1;
      const newImageData: ImageItem[] = [];

      for (const file of files) {
        const uuid = uuidv4();
        const hash = await generateThumbHashFromFile(file);
        const base64 = createPngDataUri(hash);

        const data: ImageItem = {
          id,
          uuid,
          percentage: 0,
          alt: file.name,
          key: "",
          src: "",
          base64,
          done: false,
        };

        newImageData.push(data);
        id++;

        const options = { file, uuid };

        const uploader = new Uploader(options);

        uploader
          .onProgress((progress: ProgressArgs) => {
            if (progress.percentage !== data.percentage) {
              data.src = `${process.env.NEXT_PUBLIC_S3_URL}/${progress.key}`;
              data.key = progress.key || "";
              handleItemProgress({
                uuid,
                progress: progress.percentage,
              });

              const clone = items.concat(newImageData);
              setItems(clone);
            }
          })
          .onError((error: Error) => {
            setIsUploading(false);
            console.error(error);
          })
          .onComplete(() => {
            data.done = true;
            const clone = items
              .concat(newImageData)
              .map((item) => ({ ...item, percentage: 100 }));

            setItems(clone);
            replace(clone.map((item) => ({ src: item.src, alt: item.alt })));
            setIsUploading(false);
          });

        uploader.start();
      }
    },
    [items, handleItemProgress, replace],
  );

  const remove = (i: number) => {
    setItems((prev) => prev.filter((item) => item.id !== i));
    replace(items.filter((item) => item.id !== i));
  };

  return (
    <div className={cn(className, "mt-1 space-y-3")}>
      <DragAndDrop
        items={items}
        setFiles={setFiles}
        isUploading={isUploading}
        setIsUploading={setIsUploading}
      />
      <div className="relative overflow-hidden rounded-lg">
        <DragAndDropContext
          replace={handleItemsUpdate}
          items={items}
          renderItem={(item) => (
            <SortableItem
              key={item.uuid}
              index={item.id}
              item={item}
              progress={
                progress.find((p) => p.uuid === item.uuid)?.progress as number
              }
              remove={remove}
            />
          )}
        />
      </div>
    </div>
  );
}
