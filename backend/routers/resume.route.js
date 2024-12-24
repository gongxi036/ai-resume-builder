import express from 'express'
import { getAllResumes, getResumeDetail, createResume, updateResume, deleteResume } from '../controllers/resume.controller.js'

const router = express.Router()


router.get('/all', getAllResumes)
router.get('/detail', getResumeDetail)
router.post('/create', createResume)
router.put('/:resumeId', updateResume)
router.delete('/:resumeId', deleteResume)


export default router
