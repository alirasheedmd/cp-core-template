import { useEffect, useState } from "react";

export function useCloudinaryMediaLibrary() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://media-library.cloudinary.com/global/all.js";
    script.async = true;

    script.onload = () => {
      setIsLoaded(true);
      setError(null);
    };

    script.onerror = () => {
      setError("Failed to load Cloudinary Media Library");
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return { isLoaded, error };
}
