import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import Header from '@/components/custome/Header'
import { Button } from '@/components/ui/button'
import ResumePreview from '../dashboard/resume/components/ResumePreview'
import { useQuery } from '@tanstack/react-query'
import { RWebShare } from 'react-web-share'

export default function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState()
  const { resumeId } = useParams()

  const { data: resume, isLoading } = useQuery({ queryKey: ['resume-detail']})

  useEffect(() => {
    console.log(resume)
    if (resume) {
      setResumeInfo({...resume, themeColor: resume.themeColor || '#ff6666'})
    }
  }, [])

  const handleDownload = () => {
    window.print()
  }
  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header />

        <div className="my-10 mx-10 md:mx-20 lg:mx-36">
          <h2 className="text-center text-2xl font-bold">Congrats! Your resume is ready !</h2>
          <p className="text-center text-gray-400"> Now you are reday to download your resume and you can share unique resume url with your friends and family </p>

          <div className="flex justify-between px-44 my-10">
            <Button onClick={handleDownload}>Download</Button>
            <RWebShare
              data={{
                text: 'Hello Everyone. This is my resume please open url to see it',
                url: `${import.meta.env.VITE_BASE_URL}/my-resume/${resumeId}`,
                title: `${resumeInfo?.firstName} ${resumeInfo?.lastName} resume`
              }}
            >
              <Button>Share</Button>
            </RWebShare>
          </div>
        </div>
      </div>

      <div className="my-10 mx-10 md:mx-20 lg:mx-36">
        <div id="print-area">
          <ResumePreview />
        </div>
      </div>
    </ResumeInfoContext.Provider>
  )
}
