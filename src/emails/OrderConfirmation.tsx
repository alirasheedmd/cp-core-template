import { OrderItem } from "@/db/schema";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Tailwind,
  Text,
} from '@react-email/components'
import * as React from 'react'

interface OrderConfirmationProps {
  fullName: string
  orderId: string
  items: OrderItem[]
  totalAmount: number
  contactEmail?: string
  supportUrl?: string
  shippingCost?: number
}

export default function OrderConfirmation({
  fullName,
  orderId,
  items,
  totalAmount,
  contactEmail,
  shippingCost,
  supportUrl,
}: OrderConfirmationProps) {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body>
          <Container className="flex justify-center font-sans leading-6">
            <Container className="m-auto w-full max-w-[600px] p-5">
              <Container className="mb-5 text-center">
                <Link
                  href="https://www.localhost:3000"
                  className="text-center no-underline"
                >
                  <Img
                    src={'#'}
                    alt="Curious Packet Logo"
                    width={40}
                    height={37}
                    className="max-w-[150px]"
                  />
                </Link>
              </Container>
              <Heading as="h2" className="text-center text-gray-700">
                Thank you for your order, {fullName}!
              </Heading>
              <Text className="text-center text-lg text-gray-600">
                Your order ID is <strong>{orderId}</strong>
              </Text>
              <Text>Here are the details of your order:</Text>
              <table className="mt-5 w-full max-w-[600px] border-collapse">
                <thead>
                  <tr>
                    <td className="w-20 border-gray-500 bg-gray-50 p-2 text-center">
                      Image
                    </td>
                    <td className="w-44 max-w-52 border-gray-500 bg-gray-50 p-2">
                      Item
                    </td>
                    <td className="w-20 border-gray-500 bg-gray-50 p-2 text-center">
                      Quantity
                    </td>
                    <td className="w-20 border-gray-500 bg-gray-50 p-2 text-right">
                      Price
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {items &&
                    items.map((item) => (
                      <tr key={item.productId}>
                        <td className="w-20 border-gray-500 bg-gray-50 p-2 text-center">
                          <Img
                            src={item.image}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="max-h-16 max-w-16"
                          />
                        </td>
                        <td className="w-44 max-w-52 border-gray-500 bg-gray-50 p-2">
                          <Text>{item.name}</Text>
                        </td>
                        <td className="w-20 border-gray-500 bg-gray-50 p-2 text-center">
                          <Text> {item.quantity} </Text>
                        </td>
                        <td className="w-20 border-gray-500 bg-gray-50 p-2 text-right">
                          <Text> SAR {item.price} </Text>
                        </td>
                      </tr>
                    ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td
                      colSpan={3}
                      className="border-gray-500 bg-gray-50 p-2 text-right"
                    >
                      Shipping Cost:
                    </td>
                    <td className="border-gray-500 bg-gray-50 p-2 text-right">
                      <Text>SAR {shippingCost ?? '0'}</Text>
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={3}
                      className="border-gray-500 bg-gray-50 p-2 text-right"
                    >
                      <strong> Total (including shipping): </strong>
                    </td>
                    <td className="border-gray-500 bg-gray-50 p-2 text-right">
                      <strong>SAR {totalAmount ?? '0'}</strong>
                    </td>
                  </tr>
                </tfoot>
              </table>
              <Text className="mt-5">
                If you have any questions or need assistance, please contact us
                at
                <Link href={`mailto:${contactEmail}`} className="text-blue-700">
                  {contactEmail}
                </Link>
                or visit our
                <Link href={`${supportUrl}`} className="text-blue-700">
                  Support Center
                </Link>
                .
              </Text>
              <Text className="mt-5 text-center">
                &copy; {new Date().getFullYear()} Curious Packet LLP. All rights
                reserved.
              </Text>
            </Container>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}