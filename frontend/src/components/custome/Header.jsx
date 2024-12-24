import { useUser, UserButton } from '@clerk/clerk-react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const Header = () => {
  const { user, isSignedIn } = useUser()
  return (
    <div className="flex justify-between items-center shadow-md p-3 px-5">
      <img src="/logo.svg" alt="logo" width={100} height={100} />

      {isSignedIn ? (
        <div className="flex items-center gap-2">
          <Link to="/dashboard">
            <Button variant="outline">Dashboard</Button>
          </Link>
          <UserButton user={user} />
        </div>
      ) : (
        <Link to="/auth/sign-in">
          <Button>Get Start</Button>
        </Link>
      )}
    </div>
  )
}

export default Header
