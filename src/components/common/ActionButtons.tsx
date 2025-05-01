import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ActionButtonsProps {
  onCancel: () => void
  onSave: () => void
  isLoading?: boolean
  saveText?: string
  cancelText?: string
  className?: string
  disabled?: boolean
  saveDisabled?: boolean
  cancelDisabled?: boolean
}

export function ActionButtons({
  onCancel,
  onSave,
  isLoading = false,
  saveText = 'Save',
  cancelText = 'Cancel',
  className,
  disabled = false,
  saveDisabled,
  cancelDisabled,
}: ActionButtonsProps) {
  // If the general disabled prop is set, it takes precedence
  const isSaveDisabled = disabled || saveDisabled
  const isCancelDisabled = disabled || cancelDisabled

  return (
    <div
      className={cn('flex w-full items-center justify-end gap-x-3', className)}
    >
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={isLoading || isCancelDisabled}
        className="hover:bg-LightGrey font-normal text-black"
      >
        {cancelText}
      </Button>
      <Button
        type="submit"
        variant="outline"
        onClick={onSave}
        disabled={isLoading || isSaveDisabled}
        className="hover:bg-LightGrey font-normal text-black"
      >
        {isLoading ? 'Saving...' : saveText}
      </Button>
    </div>
  )
}
