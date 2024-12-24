import Resume from "../models/resume.model.js"


// 创建一个新的简历
export const createResume = async (req, res) => {
  try {
    // TODO: 参数的校验
    const resume = new Resume(req.body)
    await resume.save()

    res.status(201).json(resume)
  } catch (error) {
    console.error(`Error in createResume: ${error.message}`)
    res.status(500).json({ message: "Interval server error" })
  }
}

// 获取该用户的所有简历
export const getAllResumes = async (req, res) => {
  try {
    const { useremail } = req.query
    // TODO: 根据 用户来查找 resume
    const resumes = await Resume.find({ useremail })
      .sort({ createdAt: -1 })
    if (resumes.length == 0) {
      return res.status(200).json([])
    }

    res.status(200).json(resumes.map(({ _id, title, jobTitle, createdAt, themeColor, email, updatedAt}) => ({
      _id, title, jobTitle, createdAt, themeColor, email, updatedAt
    })))
  } catch (error) {
    console.error(`Error in getAllResumes: ${error.message}`)
  }
} 

// 获取简历详情
export const getResumeDetail = async (req, res) => {
  const resumeId = req.query.id
  const resume = await Resume.findById(resumeId)
  console.log(resume)
  if (!resume) return res.status(404).json({ error: 'Not Found resume'})
  res.status(200).json(resume)
}

// 更新简历
export const updateResume = async (req, res) => {
  try {
    const { resumeId } = req.params
    const {
      themeColor,
      firstName,
      lastName,
      jobTitle,
      address,
      phone,
      email,
      summary,
      experience,
      education,
      skills
    } = req.body

    const resume = await Resume.findById(resumeId)

    if (!resume) return res.status(404).json({ error: 'Not Found resume' })
    
    resume.themeColor = themeColor || resume.themeColor
    resume.firstName = firstName || resume.firstName
    resume.lastName = lastName || resume.lastName
    resume.jobTitle = jobTitle || resume.jobTitle
    resume.address = address || resume.address
    resume.email = email || resume.email
    resume.phone = phone || resume.phone
    resume.summary = summary || resume.summary
    resume.experience = experience || resume.experience
    resume.education = education || resume.education
    resume.skills = skills || resume.skills

    await resume.save()

    res.status(200).json(resume)
    
  } catch (error) {
    console.error(`Error in updateResume: ${error.message}`)
    res.status(500).json({ message: "Interval server error" })
  }
}

// 删除简历
export const deleteResume = async (req, res) => {
  try {
    const { resumeId } = req.params
    await Resume.findByIdAndDelete(resumeId)
    res.status(200).json({ message: 'Resume deleted successfully'})
  } catch (error) {
    console.error(`Error in deleteResume: ${error.message}`)
    res.status(500).json({ message: "Interval server error" })
  }
}
