import { SignIn } from "@clerk/clerk-react"
const SignInPage = () => {
  return (
    <div className="flex justify-center my-20 items-center">
      <SignIn />
      {/* Add your own sign-in form or buttons here */}
    </div>
  )
}

export default SignInPage
