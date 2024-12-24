import { useState } from 'react'
import { Loader2, PlusSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useUser } from '@clerk/clerk-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const AddResume = () => {
  const { user } = useUser()
  const [openDialog, setOpenDialog] = useState(false)
  const [resumeTitle, setResumeTitle] = useState('')

  const queryClient = useQueryClient()

  const { mutate: createResume, data, isPending } = useMutation({
    mutationFn: async ({ title, username, useremail}) => {
      try {
        const res = await fetch('/api/resumes/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title,
            username,
            useremail
          }),
        })

        const data = await res.json()

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        return data
      } catch (error) {
        console.error(`Error in createResume: ${error.message}`)
      }
    },
    onSuccess: () => {
      setResumeTitle('')
      setOpenDialog(false)
      // 刷新 resume list
      queryClient.invalidateQueries({ queryKey: ['resumes']})
    },
    onError: (error) => {
      console.error(`Error in createResume: ${error.message}`)
    },
  })

  const onCreate = () => {
    createResume({
      title: resumeTitle,
      username: user.username,
      useremail: user.primaryEmailAddress.emailAddress,
    })
  }
  return (
    <div>
      <div
        className="p-14 py-24 
          border flex items-center justify-center 
          bg-secondary rounded-lg h-[280px]
          hover:scale-105 transition-all hover:shadow-md
          cursor:pointer border-dashed
        "
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare />
      </div>

      <Dialog open={openDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              Add a title for your new resume
            </DialogDescription>
          </DialogHeader>
          <div>
            <Input placeholder="Ex.Full Stack resume" value={resumeTitle} onChange={(e) => setResumeTitle(e.target.value)}></Input>
          </div>
          <DialogFooter>
            <Button onClick={() => setOpenDialog(false)} variant="ghost">Cancel</Button>
            <Button disabled={ !resumeTitle || isPending} onClick={() => onCreate() }>
              { isPending ? (
                <Loader2 className='animate-spin' />
              ): 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddResume
