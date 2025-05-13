'use client'
import { Resolver, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { useActionState } from 'react'
import { useRouter } from 'next/navigation'
import { useRef, startTransition, useEffect } from 'react'
import { ActionButtons } from '@/components/common/ActionButtons'
import { routes } from '@/config/routes'
import { editContactInfoSchema } from '@/schemas/update-user.schema'
import {
  updateUserProfile,
  type ProfileActionState,
} from '@/app/actions/web/main/customerProfile'
import CustomerInfoForm from './CustomerInfoForm'
import { Button } from '@/components/ui/button'

export type CustomerInfoFormValues = z.infer<typeof editContactInfoSchema>

interface CustomerInfoProps {
  data: CustomerInfoFormValues
}

export default function CustomerInfo(props: CustomerInfoProps) {
  const InitialCustomerInfoState: ProfileActionState = {
    status: 'idle',
    errors: undefined,
    message: '',
    data: props.data,
  }
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction, isPending] = useActionState<
    ProfileActionState,
    FormData
  >(updateUserProfile, InitialCustomerInfoState)

  console.log('data', state.data[0].firstName)

  function SaveButton() {
    return (
      <Button
        type="submit"
        className="bg-Orange hover:bg-Orange/80 w-full"
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

  const methods = useForm<CustomerInfoFormValues>({
    resolver: zodResolver(
      editContactInfoSchema,
    ) as Resolver<CustomerInfoFormValues>,
    defaultValues: {
      firstName: state.data[0]?.firstName,
      lastName: state.data[0]?.lastName,
      phoneNumber: state.data[0]?.phoneNumber,
      buildingNo: state.data[0]?.buildingNo,
      street: state.data[0]?.street,
      district: state.data[0]?.district,
      city: state.data[0]?.city,
      province: state.data[0]?.province,
      postalCode: state.data[0]?.postalCode,
      secondaryNumber: state.data[0]?.secondaryNumber,
      shortAddress: state.data[0]?.shortAddress,
      unitNumber: state.data[0]?.unitNumber,
      country: state.data[0]?.country,
    },
  })

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = methods

  // const onSubmit = () => {
  //   if (!formRef.current) return
  //   const formData = new FormData(formRef.current)
  //   const formValues = methods.getValues()
  //   console.log('Form Values:', formValues)
  //   startTransition(() => {
  //     formAction(formData)
  //   })
  // }

  // Handle server-side validation errors
  useEffect(() => {
    if (state?.status === 'error' && state.errors) {
      Object.entries(state.errors).forEach(([field, errors]) => {
        setError(field as keyof CustomerInfoFormValues, {
          type: 'server',
          message: errors[0],
        })
      })
    }
  }, [state, setError])

  // Redirect on success
  useEffect(() => {
    if (state?.status === 'success') {
      router.push(routes.home)
    }
  }, [state?.status, router])

  // const isPending = state?.status === 'submitting'

  return (
    <FormProvider {...methods}>
      <form ref={formRef} action={formAction}>
        <div className="mt-5 gap-5">
          <CustomerInfoForm />
        </div>

        {/* Action Buttons */}
        <div className="mt-8">
          {/* <ActionButtons
            onCancel={() => router.push(routes.profile)}
            onSave={handleSubmit(onSubmit)}
            isLoading={isPending || isSubmitting}
          /> */}
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
