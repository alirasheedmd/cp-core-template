export interface ImageItem {
  id: number;
  uuid: string;
  percentage: number;
  alt: string;
  key: string;
  src: string;
  base64: string;
  done: boolean;
}

export interface ImageProgress {
  uuid: string;
  progress: number;
}

export interface MultiImageUploaderProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error: boolean;
}
