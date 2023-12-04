import { Fragment } from 'react'
import { useLocation } from 'react-router-dom'
import { Col } from 'reactstrap'

export default function LeftPart() {
  const location = useLocation()

  return (
    <Col lg='8' className='col-12' style={{ fontFamily: 'Arial' }}>
      <h1 className='text-primary' style={{ fontWeight: 800, fontSize: '47px' }}>
        Smart Start USA
      </h1>
      {location.pathname === '/about' ? (
        <Fragment>
          <h3 className='text-danger'>is The Best Educational Brand!</h3>
          <p className='fs-5 mt-3'>
            Smart Start USA is an innovative after-school program designed for elementary, middle,
            and high school students. We offer interactive online courses that prepare students to
            excel in major academic areas and successfully conquer national academic contests,
            Regents Examinations, SAT, ISEE, and other essential assessments.
          </p>
          <p className='fs-5 mt-2'>
            Our classes are led by a team of highly qualified licensed teachers with an extensive
            academic background and mastery of virtual education. Smart Start USA inspires students
            to become future leaders, lifelong learners, and critical thinkers responsible for their
            own choices in life. Our curriculum is academically diverse, rigorous, and helps our
            students stay motivated while achieving their individual academic goals. In addition, we
            provide various educational resources such as testing materials, educational software,
            etc., to meet the unique needs of our learners. Therefore, all our students achieve
            remarkable test scores and shoot to the top of their classes.
          </p>
          <p className='fs-5 mt-2'>
            Join us today and make Your Smart Start on the road to success!
          </p>
          <div>
            <h1 className='text-danger' style={{ marginTop: '80px' }}>
              Our Mission
            </h1>
            <p className='fs-5 mt-2'>
              Is to provide all students with various opportunities to develop their academic skills
              and conquer all obstacles they encounter on their academic roads. We inspire our
              students to become future leaders and make a difference in our rapidly evolving world.
            </p>
          </div>
          <div>
            <h1 className='text-danger'>Our Values</h1>
            <p className='fs-5 mt-2'>
              Learning is the key to success. We strongly believe that by cultivating both cognitive
              and emotional intelligence, we can create the next generation of independent thinkers,
              lifelong learners, and responsible leaders.
            </p>
          </div>
          <div>
            <h1 className='text-danger'> Our Vision</h1>
            <p className='fs-5 mt-2'>
              We envision a world where education is accessible to everyone. We are confident that
              all children can succeed academically if they get into the hands of professional and
              passionate teachers.
            </p>
          </div>
        </Fragment>
      ) : (
        <div>
        <h3 className='text-danger my-2'>Home Schooling educational option for all!</h3>
          <h5 className='mt-2'>
            Many American parents have chosen to opt their children out of public school system in
            favor of educating their youngsters in the comfort of their homes. A recent study by the
            National Home Education Research Institute has revealed that about one million children
            are being homeschooled in the United States today, and this number is expected to
            increase in the future.
          </h5>
          <h5 className='mt-2'>
            While many factors influence parents' decision-making, most caregivers who educate their
            children at home share several significant concerns. Parents need clarifications on
            choosing the best homeschool curriculum, picking the proper standards to measure their
            child's progress over time, and locating practical instructional tools needed to meet
            the growing needs of a child educated at home.
          </h5>
          <h5 className='mt-2'>
            Choosing the best homeschool curriculum is essential to new and prospective
            homeschooling parents. Parents should evaluate the content, ponder the teaching strategy
            approach, and select the material delivery to choose the proper academic method.
          </h5>
          <h5 className='mt-2'>Smart Start USA is an ideal place for homeschoolers because:</h5>
          <ul>
            <li>We provide instructions in four core academic areas.</li>
            <li>
              Our programs are developed based on age-appropriate standards and allow parents to see
              what students should know and be able to accomplish on a specific grade level.
            </li>
            <li>
              Our programs stress the importance of a child's healthy emotional development by
              encouraging students' social interactions.
            </li>
            <li>
              Our programs enable homeschoolers successfully pass state tests and Regents
              examinations in major subject areas.
            </li>
          </ul>
          <h4 className='mt-3 font-weight-bold'>SELECT YOUR CLASS AND REGISTER TODAY!</h4>
          <h5 className='mt-2'>
            Smart Start USA begins registration for the upcoming school year of 2023-2024. Please
            don't hesitate to contact our program advisors to discuss your child's strengths and
            weaknesses. We will tailor a personalized schedule to address your child's educational
            goals.
          </h5>
        </div>
      )}
    </Col>
  )
}
