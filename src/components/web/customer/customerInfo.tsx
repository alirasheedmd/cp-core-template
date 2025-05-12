'use client'
import { Resolver, useForm, useFormContext } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { useActionState } from 'react'
import { useRouter } from 'next/navigation'
import { useRef, startTransition, useEffect } from 'react'
import { ActionButtons } from '@/components/common/ActionButtons'
import { routes } from '@/config/routes'
import { editContactInfoSchema } from '@/schemas/update-user.schema'
import { updateUserProfile, type ProfileActionState } from '@/app/actions/web/main/customerProfile'
import { getCurrentUser, getCustomerProfileInfo } from '@/lib/dal'


export type CustomerInfoFormValues = z.infer<typeof editContactInfoSchema>

const getCustomerData = async () => {
    const user = await getCurrentUser()
    if (!user) return
    const data = await getCustomerProfileInfo(user?.id)
    return data
}
 

const InitialCostomerInfoState: ProfileActionState = {
    status: 'idle',
    errors: undefined,
    message: '',
    data: getCustomerData() as unknown as CustomerInfoFormValues
}

export default function CustomerInfo() {
    const router = useRouter()
    const formRef = useRef<HTMLFormElement>(null)
    const [state, formAction] = useActionState<ProfileActionState, FormData>(updateUserProfile, InitialCostomerInfoState)

    const methods = useForm<CustomerInfoFormValues>({
        resolver: zodResolver(editContactInfoSchema) as Resolver<CustomerInfoFormValues>,
        defaultValues: {
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
      router.push(routes.home.profile)
    }
  }, [state?.status, router])

  const isPending = state?.status === 'submitting'

  return (
    <FormProvider {...methods}>
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-5  gap-5 ">
          {/* Form  */}
        </div>

        {/* Action Buttons */}
        <div className="mt-8">
          <ActionButtons
            onCancel={() => router.push(routes.admin.customers)}
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
