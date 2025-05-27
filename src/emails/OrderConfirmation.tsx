import { OrderItem } from "@/db/schema";
import { Body, Column, Container, Head, Heading, Html, Img, Link, Row, Section, Tailwind, Text } from "@react-email/components";
import * as React from "react";

interface OrderConfirmationProps {
    fullName: string
    orderId: string
    items: OrderItem[]
    totalAmount: number
    contactEmail?: string
    supportUrl?: string
    shippingCost?: number
}

export default function OrderConfirmation({ fullName, orderId, items, totalAmount, contactEmail, shippingCost, supportUrl }: OrderConfirmationProps) {
  return (
      <Html>
            <Head/>
            <Tailwind>
                <Body>
                <Container className=" font-sans leading-6 flex justify-center">
                    <Container className="max-w-[600px] w-full p-5 m-auto">
                        <Container className="text-center mb-5">
                            <Link href="https://www.localhost:3000" className="no-underline text-center">
                                <Img src={'#'} alt="Curious Packet Logo" width={40} height={37} className="max-w-[150px]" />
                            </Link>
                        </Container>
                        <Heading as="h2" className="text-center text-gray-700">
                            Thank you for your order, {fullName}!
                        </Heading>
                        <Text className="text-center text-gray-600 text-lg">Your order ID is <strong>{orderId}</strong> </Text>
                        <Text>Here are the details of your order:</Text>
                        <Section className="w-full max-w-[600px] border-collapse mt-5">
                            <Row className="border-DarkGrey">
                                <Column className="p-2 border-gray-300 bg-gray-50 text-center w-20"> Image </Column>
                                <Column className="p-2 border-gray-300 bg-gray-50 w-44 max-w-52 "> Item </Column>
                                <Column className="p-2 border-gray-300 bg-gray-50 text-center w-20"> Quantity </Column>
                                <Column className="p-2 border-gray-300 bg-gray-50 text-right w-20"> Price </Column>
                            </Row>
                            {items &&
                                items.map((item) => (
                                    <Row key={item.productId} className="border-DarkGrey">
                                        <Column className="p-2 border-gray-300 bg-gray-50 text-center w-20">
                                            <Img src={item.image} alt={item.name} className="max-w-16 max-h-16" />
                                        </Column>
                                        <Column className="p-2 border-gray-300 bg-gray-50 w-44 max-w-52 ">
                                            <Text>{item.name}</Text>
                                        </Column>
                                        <Column className="p-2 border-gray-300 bg-gray-50 text-center w-20">
                                            <Text>    {item.quantity} </Text>
                                        </Column>
                                        <Column className="p-2 border-gray-300 bg-gray-50 text-right w-20">
                                            <Text> SAR {item.price} </Text>
                                        </Column>                                
                                    </Row>
                                ) )
                            }
                            <Row className="border-DarkGrey">
                                <Column className="col-span-3 p-2 border-gray-300 text-right">
                                    Shipping Cost:
                                </Column>
                                <Column className="p-2 border-gray-300 text-right">
                                   <Text>SAR {shippingCost ?? '0'}</Text>
                                </Column>
                            </Row>
                            <Row className="border-DarkGrey">
                                <Column className="col-span-3 p-2 border-gray-300 text-right">
                                    <strong> Total (including shipping): </strong>
                                </Column>
                                <Column className="p-2 border-gray-300 text-right">
                                   <strong>SAR {totalAmount ?? '0'}</strong>
                                </Column>
                            </Row>  
                        </Section>
                        <Text className="mt-5">
                            If you have any questions or need assistance, please contact us at
                            <Link href={`mailto:${contactEmail}`} className="text-blue-700">{contactEmail}</Link>
                            or visit our
                            <Link href={`${supportUrl}`} className="text-blue-700">Support Center</Link>.
                        </Text>
                        <Text className="mt-5 text-center">
                            &copy; {new Date().getFullYear()} Curious Packet LLP. All rights reserved.
                        </Text>
                    </Container>
                </Container>
            </Body>
        </Tailwind>
    </Html>
  );
}