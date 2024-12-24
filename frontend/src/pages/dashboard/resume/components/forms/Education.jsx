import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import useApiMutation from '@/hooks/useApiMutation'
import { LoaderCircle } from 'lucide-react'
import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Education = () => {
  const [educationList, setEducationList] = useState([{
    universityName: '',
    degree: '',
    major: '',
    startDate: '',
    endDate: '',
    description: '',
  }])
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const { resumeId } = useParams()

  // first entry set education list
  useEffect(() => {
    resumeInfo && (setEducationList(resumeInfo?.education))
  }, [])

  const handleChange = (e, index) => {
    const { name, value } = e.target
    const newEducationList = [...educationList]
    newEducationList[index][name] = value
    setEducationList(newEducationList)
  }

  const AddNewEducation = () => {
    setEducationList([...educationList, {
      universityName: '',
      degree: '',
      major: '',
      startDate: '',
      endDate: '',
      description: '',
    }])
  }

  const RemoveEducation = () => {
    setEducationList(educationList => educationList.slice(0, -1))
  }

  const {
    mutate: updateResume,
    isLoading: isUpdating
  } = useApiMutation(`/api/resumes/${resumeId}`, {
    method: 'PUT',
    contentType: 'application/json'
  })

  const onSave  = () => {
    updateResume({ education: educationList })
  }

  useEffect(() => {
    setResumeInfo(prev => ({ ...prev, education: educationList }))
  }, [educationList])

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold tex-lg">Education</h2>
      <p>Add education details</p>

      <div>
        {educationList.map((item, index) => (
          <div key={index}>
            <div className="grid grid-col-2 gap-3 p-3 border my-5 rounded-lg">
              <div className="col-span-2">
                <label>University Name</label>
                <Input 
                  name="universityName"
                  onChange={e => handleChange(e, index)}
                  value={item.universityName}
                />
              </div>
              <div>
                <label>Degree</label>
                <Input 
                  name="degree"
                  onChange={e => handleChange(e, index)}
                  value={item.degree}
                />
              </div>
              <div>
                <label>Major</label>
                <Input 
                  name="major"
                  onChange={e => handleChange(e, index)}
                  value={item.major}
                />
              </div>
              <div>
                <label>Start Date</label>
                <Input 
                  type="date"
                  name="startDate"
                  onChange={e => handleChange(e, index)}
                  value={item.startDate}
                />
              </div>
              <div>
                <label>End Date</label>
                <Input 
                  type="date"
                  name="endDate"
                  onChange={e => handleChange(e, index)}
                  value={item.endDate}
                />
              </div>
              <div className="col-span-2">
                <label>Description</label>
                <Textarea 
                  name="description"
                  onChange={e => handleChange(e, index)}
                  value={item.description}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* footer button */}
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" onClick={AddNewEducation} className="text-primary">+ Add New</Button>
          <Button variant="outline" onClick={RemoveEducation} className="text-primary">- Remove</Button>
        </div>
        <Button disabled={isUpdating} onClick={()=>onSave()}>
            {isUpdating ? <LoaderCircle className='animate-spin' /> : 'Save'}
          </Button>
      </div>
    </div>
  )
}

export default Education
