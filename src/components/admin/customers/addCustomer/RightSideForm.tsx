'use client'
import { Controller, useFormContext } from 'react-hook-form'
import { ProductFormValues } from './ProductInfo'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DatePicker } from '@/components/common/DatePicker'
import ProductOrganization from './ProductOrganization'
import RecommendedProduct from './RecommendedProduct'
import AdminContainer from '../../shared/AdminContainer'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { IProduct } from '@/types'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'


export default function RightSideForm() {
  const {
    formState: { errors },
    // setValue,
    control,
    // watch,
  } = useFormContext<ProductFormValues>()

  return (
    <div className="space-y-4">
      <AdminContainer>
      
              <div className="space-y-2">
          
          {errors.tags && (
            <p className="text-red-500 text-sm">Invalid tags</p>
          )}
        </div>      
              
          </AdminContainer>
    </div>
  )
}
