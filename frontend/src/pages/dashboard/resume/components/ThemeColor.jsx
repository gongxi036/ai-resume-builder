import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import useApiMutation from '@/hooks/useApiMutation'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { LayoutGrid } from 'lucide-react'
import { useContext, useState} from 'react'
import { useParams } from 'react-router-dom'

export default function ThemeColor() {
  const colors=[
    "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
    "#33FFA1", "#FF7133", "#71FF33", "#7133FF", "#FF3371",
    "#33FF71", "#3371FF", "#A1FF33", "#33A1FF", "#FF5733",
    "#5733FF", "#33FF5A", "#5A33FF", "#FF335A", "#335AFF"
  ]

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const [selectedColor, setSelectedColor] = useState()
  const { resumeId } = useParams()

  const { 
    mutate: updateResume, 
    isLoading: isUpdating 
  } = useApiMutation(`/api/resumes/${resumeId}`, {  
    method: 'PUT',
    contentType: 'application/json'
  })

  const onColorSelect = (color) => {
    setSelectedColor(color)
    setResumeInfo({...resumeInfo, themeColor: color})

    // TODO: Update the resume theme color in the database
    updateResume({ themeColor: color })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="flex gap-2">
          <LayoutGrid /> Theme
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-white p-4 rounded-md">
        <h2 className="mb-2 text-sm font-bold">Select Theme Color</h2>
        <div className="grid grid-cols-5 gap-3">
          {colors.map((color, index) => (
            <div
             key={index}
             className={
              `h-5 w-5 rounded-full cursor-pointer hover:border-black border
              ${selectedColor === color && 'border-black'}`
             }
             onClick={() => onColorSelect(color)}
             style={{ backgroundColor: color }}
            ></div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
