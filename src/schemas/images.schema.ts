import { z } from 'zod'

export const InitialiseMultipartUploadSchema = z.object({
  name: z.string(),
  uuid: z.string(),
})

export const GetMultipartUploadSchema = z.object({
  fileKey: z.string(),
  fileId: z.string(),
  parts: z.number(),
})

export const FinaliseMultipartUploadSchema = z.object({
  fileKey: z.string(),
  fileId: z.string(),
  parts: z.array(z.object({ PartNumber: z.number(), ETag: z.string() })),
})
