import { AuthStatus } from '@/components/web/AuthStatus'
import { AddToCart } from '@/components/web/AddToCart'
import { CheckoutButton } from '@/components/web/CheckoutButton'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full flex flex-col items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold mb-10">E-Commerce Website</h1>
        
        <div className="w-full max-w-md">
          <AuthStatus />
        </div>
        
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Protected Actions</h2>
          
          {/* Example of components using authentication */}
          <div className="flex space-x-4">
            <AddToCart productId="123" />
            <CheckoutButton />
          </div>
        </div>
      </div>
    </main>
  );
}
