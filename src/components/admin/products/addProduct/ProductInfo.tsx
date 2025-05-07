'use client'
import { Resolver, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import LeftSideForm from './LeftSideForm'
import RightSideForm from './RightSideForm'
import { FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { useActionState } from 'react'
import { type ProductActionState } from '@/app/actions/admin/main/product'
import { useRouter } from 'next/navigation'
import { useRef, startTransition, useEffect } from 'react'
import { ActionButtons } from '@/components/common/ActionButtons'
import { routes } from '@/config/routes'
import { productSchema } from '@/schemas/product-form.schema'

// Dummy function to replace createProduct
const dummyCreateProduct = async (
  _prevState: ProductActionState,
  formData: FormData,
): Promise<ProductActionState> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Simulate success response
  return {
    status: 'success' as const,
    data: {
      status: 'active',
      title: formData.get('title') as string,
      sku: formData.get('sku') as string,
      description: formData.get('description') as string,
      publishDate: formData.get('publishDate') as string,
      categories: [formData.get('categories') as string],
      subcategories: [],
      images: [{ src: '', alt: '' }],
      price: formData.get('price') as string,
    },
    message: 'Product created successfully',
  }
}

export type ProductFormValues = z.infer<typeof productSchema>

export default function ProductInfo() {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction] = useActionState<ProductActionState, FormData>(
    async (_prevState, formData) => dummyCreateProduct(_prevState, formData),
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
      router.push(routes.admin.products)
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
            onCancel={() => router.push(routes.admin.products)}
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
