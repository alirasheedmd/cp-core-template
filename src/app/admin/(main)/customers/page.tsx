import { Suspense } from "react"
import CustomerServerComponent from "./CustomerServerComponent"

const AdminCustomerPage = () => {
  return (
    <Suspense fallback={<div>Loading customers...</div>}>
          <CustomerServerComponent />
    </Suspense>
  )
}

export default AdminCustomerPage