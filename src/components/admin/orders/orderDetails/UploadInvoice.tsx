'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface UploadInvoiceProps {
  onUploadResponse: (response: string) => void
}

export default function UploadInvoice({
  onUploadResponse,
}: UploadInvoiceProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadResponse, setUploadResponse] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    console.log('File selected:', file)
    setSelectedFile(file) // Update selected file state
    setUploadResponse(null)
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', selectedFile)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Upload failed')

      const result = await response.json()
      const successMessage = `File uploaded successfully: ${result.secure_url}`
      setUploadResponse(successMessage)
      onUploadResponse(result.secure_url) // Send the API response link to the parent component
    } catch (error) {
      console.error('Upload error:', error)
      const errorMessage = `Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      setUploadResponse(errorMessage)
      onUploadResponse(errorMessage)
    } finally {
      setIsUploading(false)
    }
  }

  const removeFile = () => {
    setSelectedFile(null) // Clear selected file state
    setUploadResponse(null)
  }

  return (
    <div className="mt-4 w-full">
      <div className="flex flex-col items-center justify-between gap-y-3 rounded-lg border border-gray-300 px-2 py-4 shadow-xs xl:flex-row">
        <div className="flex w-full flex-1 flex-col items-start gap-2 sm:flex-row sm:items-center">
          <Label className="text-sm font-semibold text-nowrap text-gray-700 lg:text-base">
            Select a file:
          </Label>
          {selectedFile ? (
            <div className="flex w-full items-center gap-2 text-sm lg:text-base">
              <span className="truncate text-sm text-gray-600">
                {selectedFile.name}
              </span>
              <button
                onClick={removeFile}
                className="text-xs text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          ) : (
            <span className="text-sm text-gray-600 lg:text-base">
              No file selected
            </span>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Input
            type="file"
            id="file-upload"
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png"
            key="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer rounded-xl border border-neutral-500 bg-white px-4 py-2 text-sm transition-colors hover:border-orange-600 hover:bg-neutral-100 hover:text-orange-600 lg:text-base"
          >
            Select File
          </label>
          <button
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            className={`bg-LightGrey w-32 rounded-xl py-2 text-sm text-nowrap shadow-sm transition-colors lg:text-base ${
              !selectedFile || isUploading
                ? 'text-muted-foreground cursor-not-allowed'
                : 'hover:text-Orange'
            }`}
          >
            {isUploading ? 'Uploading...' : 'Upload Invoice'}
          </button>
        </div>
      </div>

      {uploadResponse && (
        <div className="mt-2 w-full text-left text-sm lg:text-base">
          {uploadResponse.includes('success') ? (
            <p className="break-words text-green-600">{uploadResponse}</p>
          ) : (
            <p className="text-red-600">{uploadResponse}</p>
          )}
        </div>
      )}
    </div>
  )
}
