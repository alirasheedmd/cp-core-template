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
  type ProductActionState,
} from '@/app/actions/admin/main/product'
import { useRouter } from 'next/navigation'
import { useRef, useEffect } from 'react'
import { routes } from '@/config/routes'
import { productSchema } from '@/schemas/product-form.schema'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { IWebCategory } from '@/types'

export type ProductFormValues = z.infer<typeof productSchema>

interface ProductInfoProps {
  data?: ProductFormValues
  categories: IWebCategory[]
}

export default function ProductInfo({ data, categories }: ProductInfoProps) {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)

  const InitialProductInfoState: ProductActionState = {
    status: 'idle',
    errors: undefined,
    message: '',
    data: data ?? undefined,
  }

  const [state, formAction, isPending] = useActionState<
    ProductActionState,
    FormData
  >(createProduct, InitialProductInfoState)

  function SaveButton() {
    return (
      <Button
        type="submit"
        className="hover:bg-LightGrey ml-2 bg-white font-normal text-black"
        disabled={isPending}
      >
        {isPending ? (
          'Saving...'
        ) : (
          <span className="flex items-center gap-2">Save</span>
        )}
      </Button>
    )
  }
  function DiscardButton() {
    return (
      <Link href={routes.admin.categories}>
        <Button className="hover:bg-LightGrey mr-2 bg-white font-normal text-black">
          <span className="flex items-center gap-2">Discard</span>
        </Button>
      </Link>
    )
  }

  console.log('data:', state.data)
  const methods = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema) as Resolver<ProductFormValues>,
    defaultValues: {
      status: state.data?.status ? state.data?.status : 'active',
      categories: state.data?.categories ? state.data?.categories : [],
      publishDate: state.data?.publishDate
        ? state.data?.publishDate
        : new Date(performance.now()).toISOString().split('T')[0],
      ...(state?.data ?? {}),
    },
  })

  const { setError } = methods

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

  return (
    <FormProvider {...methods}>
      <form ref={formRef} action={formAction}>
        <div className="mt-5 flex flex-col gap-5 lg:flex-row">
          {/* Left Side */}
          <div className="basis-[70%]">
            <LeftSideForm categories={categories} />
          </div>

          {/* Right Side */}
          <div className="basis-[30%] space-y-5">
            <RightSideForm />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-row justify-center">
          <DiscardButton />
          <SaveButton />
        </div>

        {/* Show general error message */}
        {state?.status === 'error' && state.message && (
          <p className="mt-2 text-sm text-red-600">{state.message}</p>
        )}
      </form>
    </FormProvider>
  )
}
