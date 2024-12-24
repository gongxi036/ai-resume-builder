import React, { useState } from 'react'
import { Loader2Icon, MoreVertical, Notebook } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/hooks/use-toast'

const ResumeCardItem = ({ resume }) => {
  const { toast } = useToast()

  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [openAlert, setOpenAlert] = useState(false)

  const { mutate: deletResume, isPending } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(`/api/resumes/${resume._id}`, {
          method: 'DELETE',
        })
        const data = await res.json()
        if (!res.ok) {
          throw new Error(data.error || 'Something went wrong')
        }
        return data
      } catch (error) {
        throw new error()
      }
    },
    onSuccess: () => {
      toast({
        description: 'Successfully delete!',
      })
      setOpenAlert(false)
      queryClient.invalidateQueries({ queryKey: ['resumes'] })
    },
  })

  return (
    <div>
      <Link to={`/dashboard/resume/${resume._id}`}>
        <div
          className="p-14 bg-gradient-to-b from-pink-100 via-purple-200
          to-blue-200
          h-[280px] border-t-4 
          rounded-t-lg"
          style={{
            borderColor: resume?.themeColor || '#ff6666',
          }}
        >
          {/* <Notebook /> */}
          <div className="flex items-center justify-center h-[180px]">
            <img src="/cv.png" width={80} height={80} alt="" />
          </div>
        </div>
      </Link>

      <div
        className="border p-3 flex justify-between text-white rounded-b-lg shadow-lg"
        style={{
          background: resume?.themeColor || '#ff6666',
        }}
      >
        <h2 className="text-sm">{resume.title}</h2>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-4 w-4 cursor-pointer" />
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => navigate(`/dashboard/resume/${resume._id}`)}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate(`/my-resume/${resume._id}`)}
            >
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate(`/my-resume/${resume._id}`)}
            >
              Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAlert(true)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={openAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot undone. This will permanently delete your
                account and remove your data from out servers
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={()=>setOpenAlert(false)}>Cancel</AlertDialogCancel>
              <AlertDialogAction disabled={isPending} onClick={() => deletResume()}>
                {isPending ? <Loader2Icon className="animate-spin" /> : 'Delete'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}

export default ResumeCardItem
