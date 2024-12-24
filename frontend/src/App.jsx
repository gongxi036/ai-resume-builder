import { useUser } from '@clerk/clerk-react'
import { Outlet, Navigate } from 'react-router-dom'
import './app.css'
import Header from '@/components/custome/Header'
import { Toaster } from "@/components/ui/toaster"

function App() {
  const { user, isLoaded, isSignedIn } = useUser()

  // 如果没有授权登录 跳转登录页
  if (!isSignedIn && isLoaded) {
    return <Navigate to="/auth/sign-in" />
  }
  return (
    <>
      <Header />
      <Outlet />
      <Toaster />
    </>
  )
}

export default App
