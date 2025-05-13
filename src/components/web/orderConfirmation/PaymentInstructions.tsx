interface BankDetails {
  bankName: string
  accountName: string
  accountNumber: string
  iban: string
  swift: string
  note: string
}

interface PaymentInstructionsProps {
  bankDetails: BankDetails
}

export default function PaymentInstructions({
  bankDetails,
}: PaymentInstructionsProps) {
  return (
    <div className="space-y-2 rounded-md border bg-white p-4">
      <div className="mb-1 text-base font-semibold">
        Your order is confirmed
      </div>
      <div>
        Please make a bank transfer to the following account for the EXACT order
        amount:
      </div>
      <div className="space-y-1.5">
        <p className="font-normal">
          <span className="mr-1 font-semibold">Bank Name:</span>
          {bankDetails.bankName}
        </p>
        <p className="font-normal">
          <span className="mr-1 font-semibold">Account Name:</span>
          {bankDetails.accountName}
        </p>
        <p className="font-normal">
          <span className="mr-1 font-semibold">Account Number:</span>
          {bankDetails.accountNumber}
        </p>
        <p className="font-normal">
          <span className="mr-1 font-semibold">IBAN:</span> {bankDetails.iban}
        </p>
        <p className="font-normal">
          <span className="mr-1 font-semibold">SWIFT Code:</span>
          {bankDetails.swift}
        </p>
        <p className="font-normal">
          <span className="mr-1 font-semibold">Note:</span> {bankDetails.note}
        </p>
      </div>
    </div>
  )
}
