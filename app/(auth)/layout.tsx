import React from 'react'

const AuthLayout = ({
 children
}: {children:React.ReactNode}) => {
  return (
    <div className="flex flex-col gap-y-4">
     <nav className="p-1 bg-red-400 gap-3 w-full">
Navbar
     </nav>
     
     {children}
    </div>
  )
}

export default AuthLayout