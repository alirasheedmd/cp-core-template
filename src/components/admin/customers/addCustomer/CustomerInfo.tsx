'use client'
import { Resolver, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { useActionState } from 'react'
import {
  createCustomer,
  updateCustomer,
  type CustomerActionState,
} from '@/app/actions/admin/main/customer'
import { useRouter } from 'next/navigation'
import { useRef, useEffect } from 'react'
import { routes } from '@/config/routes'
// import { customerSchema } from '@/schemas/customer-form.schema'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export type CustomerFormValues = z.infer<typeof customerSchema>

interface CustomerInfoProps {
  data?: CustomerFormValues
  id?: string
  isEditing?: boolean
}

export default function CustomerInfo({
  data,
  id,
  isEditing,
}: CustomerInfoProps) {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)

  const InitialCustomerInfoState: CustomerActionState = {
    status: 'idle',
    errors: undefined,
    message: '',
    data: data ?? undefined,
  }

  const [state, formAction, isPending] = useActionState<
    CustomerActionState,
    FormData
  >(async (prevState: CustomerActionState, formData: FormData) => {
    try {
      // Call the appropriate action based on whether we're editing or creating
      const result = isEditing
        ? await updateCustomer(id as string, formData)
        : await createCustomer(formData)

      // Handle successful submission
      if (result.status === 'success') {
        router.push(routes.admin.customers)
      }

      return result
    } catch (err) {
      return {
        status: 'error',
        message: (err as Error).message || 'An error occurred',
        errors: undefined,
      }
    }
  }, InitialCustomerInfoState)

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
  const methods = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema) as Resolver<CustomerFormValues>,
    defaultValues: {
      status: state.data?.status ? state.data?.status : 'active',
      categories: state.data?.categories ? state.data?.categories : [],
      trackInventory: state.data?.trackInventory
        ? state.data?.trackInventory
        : true,
      isPhysicalCustomer: state.data?.isPhysicalCustomer
        ? state.data?.isPhysicalCustomer
        : true,
      recommendedCustomers: state.data?.recommendedCustomers
        ? state.data?.recommendedCustomers
        : [],
      publishDate: state.data?.publishDate
        ? state.data?.publishDate
        : new Date(performance.now()).toISOString().split('T')[0],
      ...(state?.data ?? {}),
    },
  })

  console.log('recommended customer', state.data?.recommendedCustomers)
  const { setError } = methods

  // Handle server-side validation errors
  useEffect(() => {
    if (state?.status === 'error' && state.errors) {
      Object.entries(state.errors).forEach(([field, errors]) => {
        setError(field as keyof CustomerFormValues, {
          type: 'server',
          message: errors[0],
        })
      })
    }
  }, [state, setError])

  // Redirect on success
  useEffect(() => {
    if (state?.status === 'success') {
      router.push(routes.admin.customers)
    }
  }, [state?.status, router])

  return (
    <FormProvider {...methods}>
      <form ref={formRef} action={formAction}>
        <div className="mt-5 flex flex-col gap-5 lg:flex-row">
          {/* Form */}
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
