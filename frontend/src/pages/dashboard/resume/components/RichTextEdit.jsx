import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import chatSession from '@/lib/AImodel'
import { Brain, Loader2 } from 'lucide-react'
import { useState } from 'react'
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from 'react-simple-wysiwyg'

const PROMPT='position titile: {positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experince level and No JSON array) , give me result in HTML tags'
const RichTextEdit = ({ onRichTextEditChange, defaultValue, positionTitle }) => {
  const [value, setValue] = useState(defaultValue)

  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const GenerateSummaryFromAI = async () => {
    if (!positionTitle) {
      toast('Please enter position title')
      return
    }
    setIsLoading(true)

    const prompt = PROMPT.replace('{positionTitle}', positionTitle)
    const result = await chatSession.sendMessage(prompt)
    const summary = JSON.parse(result.response.text()).bulletPoints
    console.log(summary)
    // console.log(summary.replace('[','').replace(']',''))
    const value = summary.reduce((acc, curr) => {
      return acc + `<div>${curr}</div>`
    })
    setValue(value)
    onRichTextEditChange(value)

    setIsLoading(false)
  }

  return (
    <div>
      {/* AI summary */}
      <div className="flex justify-between my-2">
        <label className="text-sm font-medium">AI Summary</label>
        <Button
          variant="outline"
          size="sm"
          className="flex gap-2 border-primary text-primary"
          onClick={GenerateSummaryFromAI}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Brain className="w-4 h-4" />
              <span>Generate from AI</span>
            </>
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={e => {
            setValue(e.target.value)
            onRichTextEditChange(e.target.value)
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  )
}

export default RichTextEdit
