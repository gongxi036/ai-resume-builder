import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from '@google/generative-ai'

const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY
// const apiKey = 'AIzaSyC68-88-88-88-88-88-88-88-88-88-88-88-88-88-88-88'

const genAI = new GoogleGenerativeAI(apiKey)

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
})

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
}

const chatSession = model.startChat({
  generationConfig,
  history: []
})

// await chatSession.sendMessage('Hello, world!')
export default chatSession
