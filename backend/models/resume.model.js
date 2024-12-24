import mongoose from 'mongoose'

const experienceSchema = new mongoose.Schema({
  title: String,
  companyName: String,
  city: String,
  state: String,
  startDate: String,
  endDate: String,
  workSummery: String
})

const educationSchema = new mongoose.Schema({
  universityName: String,
  degree: String,
  major: String,
  startDate: String,
  endDate: String,
  description: String,
})

const skillsSchma = new mongoose.Schema({
  name: String,
  rating: Number
})

const resumeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  useremail: {
    type: String,
    required: true
  },
  themeColor: {
    type: String,
    default: ''
  },
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  jobTitle: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  summary: {
    type: String,
    default: ''
  },
  experience: {
    type: [experienceSchema],
    default: []
  },
  education: {
    type: [educationSchema],
    default: []
  },
  skills: {
    type: [skillsSchma],
    default: []
  }
}, { timestamps: true })

const Resume = mongoose.model('Resume', resumeSchema)

export default Resume
