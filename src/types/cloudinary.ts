export interface CloudinaryUploadResult {
  info: {
    secure_url: string;
    public_id?: string;
  };
}

export interface CloudinaryMediaLibraryAsset {
  secure_url: string;
}

export interface CloudinaryMediaLibraryData {
  assets: CloudinaryMediaLibraryAsset[];
}

declare global {
  interface Window {
    cloudinary: {
      openMediaLibrary: (
        options: {
          cloud_name: string;
          api_key: string;
          folder: { path: string };
          multiple: boolean;
          max_files: number;
          insert_caption: string;
        },
        callbacks: {
          insertHandler: (data: CloudinaryMediaLibraryData) => void;
          errorHandler: () => void;
        },
      ) => void;
    };
  }
}
