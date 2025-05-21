'use client'

import { useFormContext } from 'react-hook-form'
import { CategoryFormValues } from './CategoryInfo'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import MultiImageUploader from '../../shared/MultiImageUploader'
import SearchEngineListing from './SearchEngineListing'
import AdminContainer from '@/components/admin/shared/AdminContainer'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'

export default function CategoryForm() {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext<CategoryFormValues>()

  const name = watch('name') || ''


  return (
    <div className="space-y-5">
      <AdminContainer className="space-y-7">

        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm">Name</Label>
          <Input
            id="name"
            {...register('name')}
            placeholder="Enter category name"
            className={`${errors.name ? 'border-destructive' : 'border-black'}`}
          />
          {errors.name && (
            <p className="text-destructive text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Status */}
        <div className="space-y-2">
          <FormField
            control={control}
            name="status"
            render={({ field }) => (
              <FormItem className='mt-2 w-full mr-1'>
                <FormLabel htmlFor="status" className="text-sm">Status</FormLabel>
                <Select onValueChange={field.onChange} {...field}>
                  <FormControl>
                      <SelectTrigger className={`${errors.status ? 'border-destructive' : 'border-black'} w-full`}>
                          <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                      <SelectItem value="enable">Enable</SelectItem>
                      <SelectItem value="disable">Disable</SelectItem>
                  </SelectContent>
                </Select>
                 {errors.status && (
                    <p className="text-destructive text-sm">{errors.status.message}</p>
                  )}
                </FormItem>
            )}
          />
        </div>

        {/* Slug */}
        <div className="space-y-2">
          <Label htmlFor="slug" className="text-sm">Slug</Label>
          <Input
            id="slug"
            {...register('slug')}
            readOnly
            value={name
              .toLowerCase()
              .replace(/\s+/g, '-')
              .replace(/[^a-z0-9\-]/g, '')}
            className={`${errors.slug ? 'border-destructive' : 'border-black'}`}
          />
          {errors.slug && (
            <p className="text-destructive text-sm">{errors.slug.message}</p>
          )}
        </div>

        {/* Media */}
        <div className="space-y-2">
          <Label htmlFor="images" className="text-sm">Media</Label>
          <MultiImageUploader<CategoryFormValues>
            name="images"
            form={useFormContext<CategoryFormValues>()}
            error={errors.images?.message}
          />
          {errors.images && (
            <p className="text-destructive -mt-3 text-sm">
              {errors.images.message}
            </p>
          )}
        </div>
      </AdminContainer>

      {/* Search Engine Listing */}
      <SearchEngineListing />
    </div>
  )
}
