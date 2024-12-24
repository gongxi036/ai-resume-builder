import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import dummy from '@/data/dummy'

import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import FormSection from '../components/FormSection'
import ResumePreview from '../components/ResumePreview'
import { useQuery } from '@tanstack/react-query'
import { useUser } from '@clerk/clerk-react'

const EditPage = () => {
  const { resumeId } = useParams()
  const [resumeInfo,setResumeInfo]= useState();
  const { user } = useUser()
  
  const { data: resume, isLoading, refetch } = useQuery({
    queryKey: ['resume-detail'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/resumes/detail?' + new URLSearchParams({
            id: resumeId
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

  useEffect(() => {
    if (resume) {
      setResumeInfo({...resume, themeColor: resume.themeColor || '#ff6666'})
    }
  }, [resume])


  // console.log(resume)
  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
        {/* Form Section */}
        <FormSection />

        {/* Resume Previre */}
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  )
}

export default EditPage
