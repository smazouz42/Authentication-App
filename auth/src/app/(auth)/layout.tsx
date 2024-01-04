import React from 'react'
interface AuthLayoutProps {
    children: React.ReactNode
}
function AuthLayout({children}: AuthLayoutProps) {
  return (
    <div className='bg-slate-200 p-10 rounder-md'>
        {children}
    </div>
  )
}

export default AuthLayout