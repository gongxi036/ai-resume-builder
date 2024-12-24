import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useToast } from '@/hooks/use-toast'
import { useMutation } from '@tanstack/react-query'
import { Brain, Loader2 } from 'lucide-react'
import { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import chatSession from '@/lib/AImodel'
const prompt="Job Title: {jobTitle} , Depends on job title give me list of  summery for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format"

const Summary = ({ enabledNext}) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const [summary, setSummary] = useState('')
  const { resumeId } = useParams()

  useEffect(() => {
    // console.log(resumeInfo)
    resumeInfo && setSummary(resumeInfo.summary)
  }, [])

  useEffect(() => {
    // console.log(summary)
    setResumeInfo({ ...resumeInfo, summary })
  }, [summary])

  const { toast } = useToast()

  const handleInput = e => {
    setSummary(e.target.value)
    // setResumeInfo({ ...resumeInfo, summary: e.target.value })
  }
  
  // update resume 
  const { mutate: updateResume, isLoading: isUpdating } = useMutation({
    mutationFn: async (formDate) => {
      try {
        const res = await fetch(`/api/resumes/${resumeId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formDate)
        })
      } catch (error) {
        throw new Error(error)
      }
    },
    onSuccess: () => {
      enabledNext(true)
      toast({
        description: "Successfully updated!",
        variant: "default"
      })
    },
    onError: (error) => {
      toast({
        description: error.message,
        variant: "destructive"
      })
    }
  })

  const [isLoading, setIsLoading] = useState(false)
  const [aiGeneratedSummeryList,setAiGenerateSummeryList]=useState();
  // generate summary from AI
  const generateSummaryFromAI = async () => {
    setIsLoading(true)
    const PROMPT = prompt.replace('{jobTitle}', resumeInfo.jobTitle)
    // console.log(PROMPT)
    const result = await chatSession.sendMessage(PROMPT)
    console.log(JSON.parse(result.response.text()))
    setAiGenerateSummeryList(JSON.parse(result.response.text()).summaries)
    setIsLoading(false)
  }

  // save summary
  const onSave = e => {
    e.preventDefault()
    updateResume({
      summary
    })
  }

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add Summary for your job title</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>Add Summary</label>
            <Button variant="outline" type="button" size="sm" onClick={()=> generateSummaryFromAI()}
            className="border-primary text-primary flex gap-2">
              <Brain />
              Generate from AI
            </Button>
          </div>

          <Textarea
            className="mt-5" required
            value={summary}
            onChange={handleInput}
          />

          <div className="flex justify-end mt-2">
            <Button disabled={isLoading || isUpdating} type="submit">
              {isLoading || isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save'}
            </Button>
          </div>
        </form>
      </div>

      {aiGeneratedSummeryList && <div className="py-5">
        <h2 className="font-bold text-lg">Suggestions</h2>
        {aiGeneratedSummeryList?.map((item, index) => (
          <div key={index} onClick={()=> setSummary(item?.summary)} className="p-5 shadow-lg my-4 rounded-lg cursor-pointer">
            <h2 className="font-bold py-1 text-primary">Level: {item?.experience_level}</h2>
            <p>{item?.summary}</p>
          </div>
        ))}
        </div>}
    </div>
  )
}

export default Summary
