import { useContext } from 'react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import PersonalDetailPreview from './preview/PersonalDetailPreview'
import SummaryPreview from './preview/SummaryPreview'
import ExperiencePreview from './preview/ExperiencePreview'
import EducationalPreview from './preview/EducationalPreview'
import SkillsPreview from './preview/SkillsPreview'

const ResumePreview = () => {
  const { resumeInfo } = useContext(ResumeInfoContext)
  return (
    <div className="shadow-lg h-full p-14 border-t-[20px]"
    style={{
      borderColor: resumeInfo?.themeColor
    }}  
    >
      <PersonalDetailPreview resumeInfo={resumeInfo} />

      <SummaryPreview resumeInfo={resumeInfo} />

      <ExperiencePreview resumeInfo={resumeInfo} />

      <EducationalPreview resumeInfo={resumeInfo} />

      <SkillsPreview resumeInfo={resumeInfo} />
    </div>
  )
}

export default ResumePreview
