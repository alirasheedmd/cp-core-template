'use client'
import { Resolver, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import LeftSideForm from './LeftSideForm'
import RightSideForm from './RightSideForm'
import { FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { useActionState } from 'react'
import {
  createProduct,
  type ActionState,
} from '@/app/actions/admin/main/product'
import { useRouter } from 'next/navigation'
import { useRef, startTransition, useEffect } from 'react'
import { ActionButtons } from '@/components/common/ActionButtons'

export const productSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  sku: z.string().min(1, 'SKU is required'),
  barcode: z.string().optional(),
  description: z.string().min(1, 'Description is required'),
  status: z.enum(['active', 'inactive']),
  publishDate: z.string().min(1, 'Publish date is required'),
  categories: z.array(z.string()).min(1, 'Select at least one category'),
  subcategories: z.array(z.string()).default([]),
  images: z
    .array(
      z.object({
        src: z.string(),
        alt: z.string(),
      }),
    )
    .min(1, 'At least one image is required'),
  price: z.string().min(1, 'Price is required'),
  pricePerItem: z.string().optional(),
  profit: z.string().optional(),
  margin: z.string().optional(),
  defaultPrice: z.string().optional(),
  customPrice: z.string().optional(),
  tax: z.string().optional(),
  currentStock: z.string().optional(),
  lowStock: z.string().optional(),
  damageProduct: z.string().optional(),
  shippingPrice: z.string().optional(),
  weight: z.string().optional(),
  width: z.string().optional(),
  length: z.string().optional(),
  height: z.string().optional(),
  country: z.string().optional(),
  hsCode: z.string().optional(),
  pageTitle: z
    .string()
    .max(70, 'Page title must be 70 characters or less')
    .optional(),
  metaDescription: z
    .string()
    .max(100, 'Meta description must be 100 characters or less')
    .optional(),
  urlHandle: z.string().optional(),
  type: z.string().optional(),
  collection: z.string().optional(),
  organization: z.string().optional(),
  tag: z.string().optional(),
  recommendedProducts: z
    .array(
      z.object({
        _id: z.string(),
        name: z.string(),
      }),
    )
    .default([])
    .optional(),
})

export type ProductFormValues = z.infer<typeof productSchema>

export default function ProductInfo() {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction] = useActionState<ActionState, FormData>(
    async (_prevState, formData) => createProduct(formData),
    { status: 'idle' },
  )

  const methods = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema) as Resolver<ProductFormValues>,
    defaultValues: {
      status: 'active',
      publishDate: new Date(performance.now()).toISOString().split('T')[0],
      ...(state?.data ?? {}),
    },
  })

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = methods

  const onSubmit = () => {
    if (!formRef.current) return
    const formData = new FormData(formRef.current)
    const formValues = methods.getValues()
    console.log('Form Values:', formValues)
    startTransition(() => {
      formAction(formData)
    })
  }

  // Handle server-side validation errors
  useEffect(() => {
    if (state?.status === 'error' && state.errors) {
      Object.entries(state.errors).forEach(([field, errors]) => {
        setError(field as keyof ProductFormValues, {
          type: 'server',
          message: errors[0],
        })
      })
    }
  }, [state, setError])

  // Redirect on success
  useEffect(() => {
    if (state?.status === 'success') {
      router.push('/admin/products')
    }
  }, [state?.status, router])

  const isPending = state?.status === 'submitting'

  return (
    <FormProvider {...methods}>
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-5 flex flex-col gap-5 lg:flex-row">
          {/* Left Side */}
          <div className="basis-[70%]">
            <LeftSideForm />
          </div>

          {/* Right Side */}
          <div className="basis-[30%] space-y-5">
            <RightSideForm />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8">
          <ActionButtons
            onCancel={() => router.push('/admin/products')}
            onSave={handleSubmit(onSubmit)}
            isLoading={isPending || isSubmitting}
          />
        </div>

        {/* Show general error message */}
        {state?.status === 'error' && state.message && (
          <p className="mt-2 text-sm text-red-600">{state.message}</p>
        )}
      </form>
    </FormProvider>
  )
}
