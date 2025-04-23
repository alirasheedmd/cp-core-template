import { MAX_IMAGES, MAX_IMAGE_SIZE } from "@/config/constants";
import { cn, convertToMb } from "@/lib/utils";
import { ImagePlus, Loader2 } from "lucide-react";
import {
  type ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ImageItem } from "@/types/image-uploader";

interface DragAndDropProps {
  isUploading: boolean;
  setIsUploading: (loading: boolean) => void;
  items: ImageItem[];
  setFiles: (validFile: File[]) => void;
}

export const DragAndDrop = (props: DragAndDropProps) => {
  const { isUploading, setIsUploading, items, setFiles } = props;
  const dropRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [filesRejected, setFilesRejected] = useState<string[]>([]);
  const [isError, setIsError] = useState({ status: false, message: "" });
  const [isDraggingOver, setDraggingOver] = useState(false);

  const clearError = useCallback(() => {
    setIsError({ status: false, message: "" });
  }, []);

  const handleFilesRejected = useCallback((fileSizeTooBig: string[]) => {
    if (fileSizeTooBig.length) {
      setFilesRejected((prev) => [...prev, ...fileSizeTooBig]);
    }
  }, []);

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    clearError();
    setFilesRejected([]);
    if (e.target.files && e.target.files.length > 0) {
      if (MAX_IMAGES < e.target.files.length + items.length) {
        setIsError({
          status: true,
          message: `You can only upload a maximum of ${MAX_IMAGES} images`,
        });
        return;
      }

      const fileSizeTooBig = Array.from(e.target.files)
        .filter((file) => file.size > MAX_IMAGE_SIZE)
        .map((file) => file.name);

      handleFilesRejected(fileSizeTooBig);

      const validFiles = Array.from(e.target.files).filter(
        (file) => file.size <= MAX_IMAGE_SIZE,
      );

      if (validFiles.length) {
        setIsUploading(true);
        setFiles(validFiles);
      }
    }
    e.target.value = "";
  };

  const handleClick = () => inputRef.current?.click();
  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    clearError();
    setFilesRejected([]);
    if (e.dataTransfer?.files && e.dataTransfer?.files.length > 0) {
      if (MAX_IMAGES < e.dataTransfer?.files.length + items.length) {
        setIsError({
          status: true,
          message: `You can only upload a maximum of ${MAX_IMAGES} images`,
        });
        return;
      }

      const fileSizeTooBig = Array.from(e.dataTransfer?.files)
        .filter((file) => file.size > MAX_IMAGE_SIZE)
        .map((file) => file.name);

      handleFilesRejected(fileSizeTooBig);

      const validFiles = Array.from(e.dataTransfer?.files).filter(
        (file) => file.size <= MAX_IMAGE_SIZE,
      );

      if (validFiles.length) {
        setIsUploading(true);
        setFiles(validFiles);
      }
    }
    e.dataTransfer?.clearData();
  };

  const stopEvent = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: DragEvent) => {
    stopEvent(e);
  };

  const handleDragLeave = (e: DragEvent) => {
    stopEvent(e);
    setDraggingOver(false);
  };

  const handleDragOver = (e: DragEvent) => {
    stopEvent(e);
    setDraggingOver(true);
  };

  useEffect(() => {
    const div = dropRef.current;
    if (div) {
      div.addEventListener("drop", handleDrop);
      div.addEventListener("dragover", handleDragOver);
      div.addEventListener("dragenter", handleDragEnter);
      div.addEventListener("dragleave", handleDragLeave);
    }

    return () => {
      if (div) {
        div.removeEventListener("drop", handleDrop);
        div.removeEventListener("dragover", handleDragOver);
        div.removeEventListener("dragenter", handleDragEnter);
        div.removeEventListener("dragleave", handleDragLeave);
      }
    };
  }, []);

  useEffect(() => {
    if (filesRejected.length) {
      setIsError({
        status: true,
        message: `${filesRejected.length} image${filesRejected.length > 1 ? "s" : ""} exceeded ${convertToMb(MAX_IMAGE_SIZE)} limit: \n${filesRejected.join(",\n")}`,
      });
    }
  }, [filesRejected]);

  return (
    <>
      <div
        ref={dropRef}
        className={cn(
          "relative flex h-36 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-black",
          isError.status && "border-red-500",
          isUploading && "pointer-events-none",
        )}
      >
        <input
          disabled={isUploading}
          multiple={true}
          type="file"
          ref={inputRef}
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
        />

        <div
          onClick={handleClick}
          className={cn(
            "flex h-full w-full flex-col items-center justify-center text-center font-medium",
            isUploading || (isDraggingOver && "opacity-75"),
          )}
          onKeyDown={handleClick}
        >
          <ImagePlus className="mx-auto mb-3 h-auto w-9 text-gray-400" />
          <p className="mb-1">
            <span className="text-primary">Upload Files</span>
            <span className="ml-1 text-gray-600">or drag and drop</span>
          </p>
          <p className="text-xs text-gray-600">
            PNG, JPG, WEBP, up to {convertToMb(MAX_IMAGE_SIZE)} each.
          </p>
        </div>
        {isUploading && (
          <div className="bg-opacity-50 absolute inset-0 flex items-center justify-center bg-white">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        )}
      </div>
      {isError.status && (
        <div className="flex w-full flex-wrap justify-between md:mt-3">
          <span className="text-sm font-medium text-red-500">
            {isError.message}
          </span>
        </div>
      )}
    </>
  );
};
