import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormContext } from 'react-hook-form'
import { CategoryFormValues } from './CategoryInfo'
import AdminContainer from '@/components/admin/shared/AdminContainer'

export default function SearchEngineListing() {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<CategoryFormValues>()

  const pageTitle = watch('metaKeyword') || ''
  const pageTitleLength = 70
  const currentPageTitleLength = pageTitle.length

  const metaKeyword = watch('metaKeyword') || ''
  const metaKeywordLength = 70
  const currentMetaKeywordLength = metaKeyword.length

  const metaDescription = watch('metaDescription') || ''
  const metaDescriptionLength = 160
  const currentMetaDescriptionLength = metaDescription.length

  const urlHandle = watch('urlHandle') || ''

  return (
    <AdminContainer>
      <h2 className="mb-4 text-sm font-semibold">Search Engine Listing</h2>

      <p className="text-xs">
        Add a title and description to see how this product might appear in a
        search engine listing
      </p>

      <hr className="mt-5" />

      <div className="mt-6 max-h-[1000px] space-y-5 overflow-hidden px-1 opacity-100 duration-300">
        {/* Page Title */}
        <div className="space-y-2">
          <Label htmlFor="pageTitle" className="text-sm">
            Page Title
          </Label>
          <Input
            id="pageTitle"
            maxLength={pageTitleLength}
            {...register('pageTitle')}
            className={`${errors.pageTitle ? 'border-destructive' : 'border-black'}`}
          />
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-700">
              {currentPageTitleLength} out of {pageTitleLength} characters used
            </p>
            {errors.pageTitle && (
              <p className="text-destructive text-sm">
                {errors.pageTitle?.message as string}
              </p>
            )}
          </div>
        </div>

        {/* Meta Keyword */}
        <div className="space-y-2">
          <Label htmlFor="metaKeyword" className="text-sm">
            Meta Keyword
          </Label>
          <Input
            id="metaKeyword"
            maxLength={metaKeywordLength}
            {...register('metaKeyword')}
            className={`${errors.metaKeyword ? 'border-destructive' : 'border-black'}`}
          />
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-700">
              {currentMetaKeywordLength} out of {metaKeywordLength} characters
              used
            </p>
            {errors.metaKeyword && (
              <p className="text-destructive text-sm">
                {errors.metaKeyword?.message as string}
              </p>
            )}
          </div>
        </div>

        {/* Meta Description */}
        <div className="space-y-2">
          <Label htmlFor="metaDescription" className="text-sm">
            Meta Description
          </Label>
          <Input
            id="metaDescription"
            maxLength={metaDescriptionLength}
            {...register('metaDescription')}
            className={`${errors.metaDescription ? 'border-destructive' : 'border-black'}`}
          />
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-700">
              {currentMetaDescriptionLength} out of {metaDescriptionLength}
              characters used
            </p>
            {errors.metaDescription && (
              <p className="text-destructive text-sm">
                {errors.metaDescription?.message as string}
              </p>
            )}
          </div>
        </div>

        {/* URL Handle */}
        <div className="space-y-2">
          <Label htmlFor="urlHandle" className="text-sm">
            URL Handle
          </Label>
          <Input
            id="urlHandle"
            {...register('urlHandle')}
            className={`${errors.urlHandle ? 'border-destructive' : 'border-black'}`}
          />
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-700">
              https://www.curiouspacket.com/category/{urlHandle}
            </p>
            {errors.urlHandle && (
              <p className="text-destructive text-sm">
                {errors.urlHandle?.message as string}
              </p>
            )}
          </div>
        </div>
      </div>
    </AdminContainer>
  )
}
