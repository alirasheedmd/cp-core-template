import AdminContainer from '@/components/admin/shared/AdminContainer'
import { Textarea } from '@/components/ui/textarea'

interface Props {
  reasonForRefund: string
  setReasonForRefund: (value: string) => void
}

export default function RefundReason({
  reasonForRefund,
  setReasonForRefund,
}: Props) {
  return (
    <AdminContainer className="space-y-4">
      <p>Reason for refund</p>
      <Textarea
        placeholder="Enter reason for refund"
        value={reasonForRefund}
        onChange={(e) => setReasonForRefund(e.target.value)}
      />
      <p className="text-sm">Only you and other staff can see this reason</p>
    </AdminContainer>
  )
}
