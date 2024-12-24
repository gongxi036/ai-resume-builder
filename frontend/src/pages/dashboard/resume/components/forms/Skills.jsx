import { useContext, useState, useEffect } from 'react'

import '@smastrom/react-rating/style.css'
import { Rating } from '@smastrom/react-rating'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import useApiMutation from '@/hooks/useApiMutation'
import { useParams } from 'react-router-dom'
const Skills = () => {
  const [skillsList, setSkillsList] = useState([])
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const { resumeId } = useParams()

  useEffect(() => {
    setSkillsList(resumeInfo.skills || [])
  }, [])

  const handleChange = (index, field, value) => {
    const updatedSkills = [...skillsList]
    updatedSkills[index][field] = value
    setSkillsList(updatedSkills)
  }

  const AddNewSkills = () => {
    setSkillsList([...skillsList, { name: '', rating: 0 }])
  }

  const RemoveSkills = () => {
    setSkillsList(skillsList => skillsList.slice(0, -1))
  }

  const { 
    mutate: updateResume, 
    isLoading: isUpdating 
  } = useApiMutation(`/api/resumes/${resumeId}`, {  
    method: 'PUT',
    contentType: 'application/json'
  })

  const onSave = () => {
    updateResume({ skills: skillsList })
  }

  useEffect(() => {
    setResumeInfo(prev => ({ ...prev, skills: skillsList }))
  }, [skillsList])

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="text-lg font-bold">Skills</h2>
      <p>Add Your top professional key skills</p>

      <div>
        {skillsList.map((item, index) => (
          <div key={index} className="flex justify-between mb-2 border rounded-l p-3">
            <div>
              <label className="text-xs">Name</label>
              <Input
                className="w-full"
                value={item.name}
                onChange={e => handleChange(index, 'name', e.target.value)}
              />
            </div>
            <Rating
              style={{ maxWidth: 120 }}
              value={item.rating}
              onChange={value => handleChange(index, 'rating', value)}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="text-primary"
              onClick={AddNewSkills}
            >
              + Add More
            </Button>
            <Button
              variant="outline"
              className="text-primary"
              onClick={RemoveSkills}
            >
              - Remove
            </Button>
          </div>
          <Button disabled={isUpdating} onClick={()=>onSave()}>
            {isUpdating ? <LoaderCircle className='animate-spin' /> : 'Save'}
          </Button>
        </div>
    </div>
  )
}

export default Skills
