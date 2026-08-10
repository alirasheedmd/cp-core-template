import Profile from '@/components/web/customer/Profile'
import React, { Suspense } from 'react'

const ProfilePage = () => {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Profile />
    </Suspense>
  )
}

export default ProfilePage
