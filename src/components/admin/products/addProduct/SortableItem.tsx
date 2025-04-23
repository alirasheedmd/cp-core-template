"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CheckCircle, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImgixImage } from "@/components/common/ImgixImage";
import { ImageItem } from "@/types/image-uploader";

interface SortableItemProps {
  index: number;
  item: ImageItem;
  remove: (index: number) => void;
  progress?: number;
}

export const SortableItem = (props: SortableItemProps) => {
  const { index, item, remove, progress } = props;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: index });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
  };

  return (
    <div className="group relative">
      <Button
        type="button"
        size="icon"
        data-no-dnd="true"
        draggable="false"
        onClick={() => remove(index)}
        className="absolute top-1.5 right-1.5 z-10 h-6 w-6 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      >
        <XIcon />
      </Button>
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className="cursor-move"
        style={style}
      >
        <div className="relative overflow-hidden rounded-lg">
          {item.done ? (
            <div className="h-full rounded-lg">
              <ImgixImage
                alt={item.alt}
                src={item.src}
                width={240}
                height={160}
                quality={25}
                blurDataURL={item.base64 as string}
                placeholder={item.base64 ? "blur" : "empty"}
                className="aspect-3/2 object-cover"
              />

              <CheckCircle className="absolute right-2 bottom-2 h-4 w-4 text-black opacity-100 transition-opacity duration-200 group-hover:opacity-0" />
            </div>
          ) : (
            <div className="bg-muted flex aspect-3/2 flex-col items-center justify-center rounded-lg">
              <span>{progress || 0}%</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
