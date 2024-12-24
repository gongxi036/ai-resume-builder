import { createBrowserRouter } from "react-router-dom"

import SignInPage from "@/pages/auth/sign-in"
import Home from "@/pages/home"
import App from "@/App"
import Dashboard from "@/pages/dashboard"
import ResumePage from "@/pages/dashboard/resume/edit"
import ViewResume from "@/pages/resume-view"

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    element: <App />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/dashboard/resume/:resumeId',
        element: <ResumePage />
      }
    ]
  },
  {
    path: '/auth/sign-in',
    element: <SignInPage />
  },
  {
    path: '/my-resume/:resumeId',
    element: <ViewResume />
  }
])

export default router
