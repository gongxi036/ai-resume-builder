import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useContext, useEffect, useState } from 'react'
import RichTextEdit from '../RichTextEdit'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import useApiMutation from '@/hooks/useApiMutation'
import { LoaderCircle } from 'lucide-react'
import { useParams } from 'react-router-dom'

const formField = {
  title: '',
  companyName: '',
  city: '',
  state: '',
  startDate: '',
  endDate: '',
  workSummery: '',
}
const Experience = () => {
  const { resumeId } = useParams()
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const { mutate: updateResume, isLoading: isUpdating } = useApiMutation(`/api/resumes/${resumeId}`, {
    method: 'PUT',
    contentType: 'application/json'
  })
  // const [experienceList, setExperienceList] = useState([formField])
  const [experienceList, setExperienceList] = useState(() => {
    return resumeInfo?.experience || [formField]
  })

  const handleChange = (index, event) => {
    const newExperienceList = [...experienceList]
    const { name, value } = event.target
    newExperienceList[index][name] = value
    setExperienceList(newExperienceList)
  }

  const AddNewExperience = () => {
    setExperienceList([...experienceList, formField])
  }

  const RemoveExperience = () => {
    setExperienceList(experienceList.slice(0, -1))
  }

  // rich text editor
  const handleRichTextEditor = (value, name, index) => {
    const newExperienceList = [...experienceList]
    newExperienceList[index][name] = value
    setExperienceList(newExperienceList)
  }

  const onSave = () => {
    console.log(experienceList)
    updateResume({
      experience: experienceList
    })
  }

  useEffect(() => {
    // console.log(experienceList)
    setResumeInfo({ ...resumeInfo, experience: experienceList })
  }, [experienceList])

  return (
    <div>
      <div className="p-5 shadow-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Professional Experience</h2>
        <p>Add Your previous Job Experience</p>
        <div>
          {experienceList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div>
                  <label className="text-xs">Position Title</label>
                  <Input
                    name="title"
                    onChange={event => handleChange(index, event)}
                    defaultValue={item.title}
                  />
                </div>
                <div>
                  <label className="text-xs">Company Name</label>
                  <Input
                    name="companyName"
                    onChange={event => handleChange(index, event)}
                    defaultValue={item.companyName}
                  />
                </div>
                <div>
                  <label className="text-xs">City</label>
                  <Input
                    name="city"
                    onChange={event => handleChange(index, event)}
                    defaultValue={item.city}
                  />
                </div>
                <div>
                  <label className="text-xs">State</label>
                  <Input
                    name="state"
                    onChange={event => handleChange(index, event)}
                    defaultValue={item.state}
                  />
                </div>
                <div>
                  <label className="text-xs">Start Date</label>
                  <Input
                    type="date"
                    name="startDate"
                    onChange={event => handleChange(index, event)}
                    defaultValue={item.startDate}
                  />
                </div>
                <div>
                  <label className="text-xs">End Date</label>
                  <Input
                    type="date"
                    name="endDate"
                    onChange={event => handleChange(index, event)}
                    defaultValue={item.endDate}
                  />
                </div>
                <div className="col-span-2">
                  <RichTextEdit
                    defaultValue={item?.workSummery}
                    positionTitle={item?.title}
                    onRichTextEditChange={value =>
                      handleRichTextEditor(value, 'workSummery', index)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* footer */}
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="text-primary"
              onClick={AddNewExperience}
            >
              + Add More
            </Button>
            <Button
              variant="outline"
              className="text-primary"
              onClick={RemoveExperience}
            >
              - Remove
            </Button>
          </div>
          <Button disabled={isUpdating} onClick={()=>onSave()}>
            {isUpdating ? <LoaderCircle className='animate-spin' /> : 'Save'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Experience
