import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from 'lucide-react'
import PersonalDetail from './forms/PersonalDetail'
import Summary from './forms/Summary'
import Experience from './forms/Experience'
import Education from './forms/Education'
import Skills from './forms/Skills'
import ThemeColor from './ThemeColor'

const FormSection = () => {
  const { resumeId } = useParams()
  const [activeFormIndex, setActiveFormIndex] = useState(1)
  const [enadleNext, setEnableNext] = useState(true)

  return (
    <div>
      <div className="flex justify-between items-center">

        <div className="flex items-center gap-5">
          <Link to="/dashboard">
            <Button><Home /></Button>
          </Link>
          <ThemeColor />
        </div>

        <div className="flex items-center gap-2">
          {activeFormIndex>1 && <Button size='sm' onClick={() => setActiveFormIndex(activeFormIndex-1)}><ArrowLeft /></Button>}
          {activeFormIndex<6 && <Button size='sm' disabled={!enadleNext} onClick={() => setActiveFormIndex(activeFormIndex+1)}>
            Next
            <ArrowRight />
          </Button>}
          
        </div>
      </div>

      {/* Personal Detail */}
      { activeFormIndex === 1 && <PersonalDetail enabledNext={(v)=>setEnableNext(v)} />}

      {/* Summary */}
      { activeFormIndex === 2 && <Summary enabledNext={(v)=>setEnableNext(v)} />}

      {/* Experience */}
      { activeFormIndex === 3 && <Experience enabledNext={(v)=>setEnableNext(v)} />}

      {/* Educational Detail */}
      { activeFormIndex === 4 && <Education enabledNext={(v)=>setEnableNext(v)} />}

      {/* Skills */}
      { activeFormIndex === 5 && <Skills enabledNext={(v)=>setEnableNext(v)} />}

      {/* my-resume */}
      { activeFormIndex === 6 && <Navigate to={`/my-resume/${resumeId}`} />}
    </div>
  )
}

export default FormSection
