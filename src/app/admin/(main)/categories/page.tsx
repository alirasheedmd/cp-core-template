import React, { Suspense } from 'react'
import CategoryServerComponent from './CategoryServerComponent'

const AdminCategoryPage = () => {
    return (
        <Suspense fallback={<div>Loading Categories...</div>}>
            <CategoryServerComponent />
        </Suspense>
  )
}

export default AdminCategoryPage