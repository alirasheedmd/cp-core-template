import { cn } from '@/lib/utils'
import { IOrder } from '@/types'

interface PrintOrderButtonProps {
  order: IOrder | undefined
  orderId: string
  className?: string
}

export default function PrintOrderButton({
  order,
  orderId,
  className,
}: PrintOrderButtonProps) {
  const handlePrintOrder = () => {
    // Calculate the total
    const total: number | undefined = order?.items?.reduce(
      (sum, item) => sum + (item?.price ?? 0) * item.quantity,
      0,
    )

    const orderContent: string = `
      <html>
        <head>
          <title>Order Details</title>
          <style>
            body {
              font-family: 'Helvetica Neue', Arial, sans-serif;
              font-size: 12pt;
              line-height: 1.5;
              color: #333;
            }
            .container {
              max-width: 700px;
              margin: 0 auto;
            }
            .header {
              margin-bottom: 2rem;
              text-align: center;
            }
            .header h1 {
              font-size: 24pt;
              margin-bottom: 0.5rem;
            }
            .header p {
              margin: 0.25rem 0;
            }
            .status-badge {
              display: inline-block;
              padding: 0.25rem 0.75rem;
              border-radius: 9999px;
              font-weight: 500;
            }
            .status-badge.pending {
              background-color: #fef3c7;
              color: #92400e;
            }
            .status-badge.shipped {
              background-color: #d1fae5;
              color: #065f46;
            }
            .status-badge.delivered {
              background-color: #dbeafe;
              color: #1e40af;
            }
            .order-grid {
              display: flex;
              flex-direction: column;
              gap: 2rem;
            }
            .order-items table {
              width: 100%;
              border-collapse: collapse;
            }
            .order-items th, .order-items td {
              padding: 0.5rem;
              text-align: left;
              border-bottom: 1px solid #e5e7eb;
            }
            .order-items tfoot td {
              font-weight: bold;
              border-top: 2px solid #e5e7eb;
            }
            .shipping-info dl {
              display: grid;
              grid-template-columns: auto 1fr;
              gap: 0.5rem;
            }
            .shipping-info dt {
              font-weight: bold;
            }
            .shipping-info dd {
              margin: 0;
            }
            @media print {
              .print-button {
                display: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Shopiko</h1>
              <h2>Order Details</h2>
              <p>Order #${orderId}</p>
              <p>Date: ${new Date(order?.createdAt ?? '').toLocaleDateString()}</p>
              <span class="status-badge ${order?.status?.toLowerCase()}">${order?.status.toUpperCase().charAt(0)}${order?.status.slice(1).toLowerCase()}</span>
            </div>
            <div class="order-grid">
              <div class="order-items">
                <table>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Qty</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${order?.items
                      ?.map(
                        (item) => `
                      <tr>
                        <td>${item.name}</td>
                        <td>${item.quantity}</td>
                        <td>Rs. ${item?.price?.toLocaleString('en-PK')}</td>
                        <td>Rs. ${(item?.price ?? 0 * item.quantity).toLocaleString('en-PK')}</td>
                      </tr>
                    `,
                      )
                      .join('')}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="4" style="text-align: right;">Total:</td>
                      <td>Rs. ${total?.toLocaleString('en-PK')}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div class="shipping-info">
                <h2>Shipping Information</h2>
                <dl>
                  <dt>Name:</dt><dd>${order?.customerDetails?.fullName}</dd>
                  <dt>Email:</dt><dd>${order?.customerDetails?.email}</dd>
                  <dt>Phone:</dt><dd>${order?.customerDetails?.phoneNumber}</dd>
                  <dt>Address:</dt><dd>
                    ${order?.customerDetails?.address.street}<br/>
                    ${
                      order?.customerDetails?.address.apartment
                        ? order.customerDetails.address.apartment + '<br/>'
                        : ''
                    }
                    ${order?.customerDetails?.address.city}, 
                    ${order?.customerDetails?.address.postalCode}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div style="text-align: center; margin-top: 2rem;">
            <button class="print-button" onclick="window.print()">Print</button>
          </div>
        </body>
      </html>
    `

    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(orderContent)
      printWindow.document.close()
      printWindow.focus()
      printWindow.print()
      printWindow.close()
    }
  }

  return (
    <button
      onClick={handlePrintOrder}
      className={cn(
        'bg-LightGrey hover:text-Orange w-36 rounded-xl py-1.5 font-semibold transition-colors',
        className,
      )}
    >
      Print order page
    </button>
  )
}
