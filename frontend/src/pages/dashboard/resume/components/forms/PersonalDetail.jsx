import { useContext, useState } from 'react'
import { Input } from '@/components/ui/input'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useToast } from "@/hooks/use-toast"


const PersonalDetail = ({ enabledNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const [formData, setFormDate] = useState()
  const {resumeId} = useParams()

  const { toast } = useToast()

  const { mutate: updateResume, isPending } = useMutation({
    mutationFn: async (formDate) => {
      try {
        const res = await fetch(`/api/resumes/${resumeId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formDate)
        })
        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.error || 'Something went wrong')
        }
        return data
      } catch (error) {
        throw new Error(error)
      }
    },
    onSuccess: () => {
      enabledNext(true)
      toast({
        description: "Successfully updated!",
      })
    }
  })

  const handleInputChange = e => {
    enabledNext(false)
    const { name, value } = e.target
    setFormDate(prevState => ({...prevState, [name]: value }))
    setResumeInfo(prevState => ({ ...prevState, [name]: value }))
  }

  const onSave = e => {
    e.preventDefault()
    if (!formData) return
    updateResume(formData)
  }

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Detail</h2>
      <p>Get Started with the basic infomationn</p>

      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label className="text-sm">First Name</label>
            <Input name="firstName" required defaultValue={resumeInfo?.firstName} onChange={handleInputChange}></Input>
          </div>
          <div>
            <label className="text-sm">Last Name</label>
            <Input name="lastName" required defaultValue={resumeInfo?.lastName} onChange={handleInputChange}></Input>
          </div>
          <div className="col-span-2">
            <label className="text-sm">Job Title</label>
            <Input name="jobTitle" required defaultValue={resumeInfo?.jobTitle} onChange={handleInputChange}></Input>
          </div>
          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <Input name="address" required defaultValue={resumeInfo?.address} onChange={handleInputChange}></Input>
          </div>
          <div>
            <label className="text-sm">Phone</label>
            <Input name="phone" required defaultValue={resumeInfo?.phone} onChange={handleInputChange}></Input>
          </div>
          <div>
            <label className="text-sm">Email</label>
            <Input name="email" required defaultValue={resumeInfo?.email} onChange={handleInputChange}></Input>
          </div>
        </div>
        <div className="flex justify-end mt-3">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  )
}

export default PersonalDetail
