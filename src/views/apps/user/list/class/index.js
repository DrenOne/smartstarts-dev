import { useState } from "react"
import { Col } from "reactstrap"
import TutorTabs from "../../view/class/TutorTabs"

const TutorClassIndex = () => {
    const [active, setActive] = useState('1')

    const toggleTab = tab => {
      if (active !== tab) {
        setActive(tab)
      }
    }
  return (
    <Col xl='12' lg='12' xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
        <TutorTabs active={active} toggleTab={toggleTab} />
    </Col>
  )
}

export default TutorClassIndex
