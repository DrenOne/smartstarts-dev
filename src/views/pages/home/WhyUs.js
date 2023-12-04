import { Container, Row } from 'reactstrap'

const WhyUs = () => {
  return (
    <div className='text-primary container-xxl' style={{fontFamily: 'Arial'}}>
      <h2 className='text-center pb-2 text-bold text-primary' style={{fontSize: 54, fontWeight: 'bold'}}>Why US?</h2>
      {[
        '✓ Our programs provide systematic and rigorous training for SAT and ISEE. "Improve students’ test scores on Regents Exams and various state assessments"',
        '✓ Improve students’ school performance and significantly elevates students’ Report Card grades',
        '✓ Boost academic achievements in Mathematics, English, Social Studies, Science and more',
        '✓ Build students’ academic confidence at elementary, middle, and high school levels',
        '✓ Build fundamental reading and writing skills'
      ].map((text, index) => (
        <h4 className='text-primary fs-20' key={index}>{text}</h4>
      ))}

      
    </div>
  )
}

export default WhyUs
