'use client'
import { Resolver, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { useActionState } from 'react'
import { useRouter } from 'next/navigation'
import { useRef, useEffect } from 'react'
import { routes } from '@/config/routes'
import { subCategorySchema } from '@/schemas/category.schema'
import {
  createSubcategory,
  updateSubcategory,
  type SubcategoryActionState,
} from '@/app/actions/admin/main/category'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import SubcategoryForm from './SubcategoryForm'
import { IWebCategory } from '@/types'

export type SubcategoryFormValues = z.infer<typeof subCategorySchema>

interface CategoryInfoProps {
  data?: SubcategoryFormValues
  categories: IWebCategory[]
  parentId?: string
  id?: string
  isEditing?: boolean
}

export default function CategoryInfo(props: CategoryInfoProps) {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const { data, categories, parentId, id, isEditing } = props
  const InitialCategoryInfoState: SubcategoryActionState = {
    status: 'idle',
    errors: undefined,
    message: '',
    data: data ?? undefined,
  }
  const [state, formAction, isPending] = useActionState<
    SubcategoryActionState,
    FormData
  >(async (prevState: SubcategoryActionState, formData: FormData) => {
    try {
      // Call the appropriate action based on whether we're editing or creating
      const result = isEditing
        ? await updateSubcategory(id as string, formData)
        : await createSubcategory(formData)

      // Handle successful submission
      if (result.status === 'success') {
        router.push(routes.admin.categories)
      }

      return result
    } catch (err) {
      return {
        status: 'error',
        message: (err as Error).message || 'An error occurred',
        errors: undefined,
      }
    }
  }, InitialCategoryInfoState)

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

  const methods = useForm<SubcategoryFormValues>({
    resolver: zodResolver(subCategorySchema) as Resolver<SubcategoryFormValues>,
    defaultValues: {
      ...state?.data,
      status: state?.data?.status ?? 'enable',
      parentId: parentId ? parentId : state.data?.parentId,
    },
  })

  const { setError } = methods

  // Handle server-side validation errors
  useEffect(() => {
    if (state?.status === 'error' && state.errors) {
      Object.entries(state.errors).forEach(([field, errors]) => {
        setError(field as keyof SubcategoryFormValues, {
          type: 'server',
          message: errors[0],
        })
      })
    }
  }, [state, setError])

  // Redirect on success
  useEffect(() => {
    if (state?.status === 'success') {
      router.push(routes.admin.categories)
    }
  }, [state?.status, router])

  return (
    <FormProvider {...methods}>
      <form ref={formRef} action={formAction}>
        <div className="mt-5 flex justify-center">
          <SubcategoryForm categories={categories as IWebCategory[]} />
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-row justify-end">
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
