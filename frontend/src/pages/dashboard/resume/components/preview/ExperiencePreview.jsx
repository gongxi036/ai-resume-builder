
const ExperiencePreview = ({ resumeInfo }) => {
  return (
    <div className="my-6">
      <h2 className="text-center font-bold text-sm mb-2"
      style={{ color: resumeInfo?.themeColor }}
      >
        Personal Experience
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />

      {resumeInfo?.experience.map((experience, index) => (
        <div className="my-5" key={index}>
          <h2 className="text-sm font-bold"
          style={{ color: resumeInfo?.themeColor }}
          >{experience.title}</h2>
          <h2 className="text-xs flex justify-between">
            {experience.companyName},
            {experience.city},
            {experience.state}
            <span>{experience.startDate} To {experience.currentlyWorking ? 'Present' : experience.endDate }</span>
          </h2>

          <div className="text-xs my-2" dangerouslySetInnerHTML={{ __html: experience.workSummery}}></div>
        </div>
      ))}
    </div>
  )
}

export default ExperiencePreview
