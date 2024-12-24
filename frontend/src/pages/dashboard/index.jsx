import AddResume from "./components/AddResume"
import ResumeCardItem from "./components/ResumeCardItem"
import { useQuery } from "@tanstack/react-query"
import { useUser } from "@clerk/clerk-react"



const Dashboard = () => {

  const { user } = useUser()

  const { data: resumes, isLoading } = useQuery({
    queryKey: ['resumes'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/resumes/all?' + new URLSearchParams({
            useremail: user.primaryEmailAddress.emailAddress
          }))

          const data = await res.json()
          if (!res.ok) {
            throw new Error(data.error || 'Something went wrong')
          }
          return data
      } catch (error) {
        throw new Error(error)
      }
    }
  })
  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">My Resume</h2>
      <p>Start Creating AI resume to your next Job role</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10">
        <AddResume />
        
        { isLoading ? <p>Loading</p> : (
          resumes.map((resume) => (
            <ResumeCardItem key={resume._id} resume={resume} />
          ))
        )}
      </div>
    </div>
  )
}

export default Dashboard
