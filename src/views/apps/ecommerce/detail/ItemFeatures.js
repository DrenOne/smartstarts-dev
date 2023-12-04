// ** Icon Imports
import { Award, Clock, Eye, PenTool, Users } from 'react-feather'
// ** Reactstrap Imports
import { Row, Col, CardText } from 'reactstrap'

const ItemFeatures = () => {
  return (
    <div className='item-features'>
      <Row className='text-center'>
        <Col className='mb-4 mb-md-0' md='4' xs='12'>
          <div className='w-75 mx-auto'>
            <Clock />
            <h4 className='mt-2 mb-1'>Sessions</h4>
            <CardText>2-hour sessions per week, 36 sessions total</CardText>
          </div>
        </Col>
        <Col className='mb-4 mb-md-0' md='4' xs='12'>
          <div className='w-75 mx-auto'>
            <Award />
            <h4 className='mt-2 mb-1'>Skills</h4>
            <CardText>Experienced, licensed teachers</CardText>
          </div>
        </Col>
        <Col className='mb-4 mb-md-0' md='4' xs='12'>
          <div className='w-75 mx-auto'>
            <Eye />
            <h4 className='mt-2 mb-1'>Teaching plan</h4>
            <CardText>Carefully crafted lesson planning</CardText>
          </div>
        </Col>
        <Col className='mb-4 mt-4 mb-md-0' md='4' xs='12'>
          <div className='w-75 mx-auto'>
            <Users />
            <h4 className='mt-2 mb-1'>Groups</h4>
            <CardText>Small group instruction</CardText>
          </div>
        </Col>
        <Col className='mb-4 mt-4 mb-md-0' md='4' xs='12'>
          <div className='w-75 mx-auto'>
            <PenTool />
            <h4 className='mt-2 mb-1'>Assessment</h4>
            <CardText>Assessment of the individual students needs</CardText>
          </div>
        </Col>
        <Col className='mb-4 mt-4 mb-md-0' md='4' xs='12'>
          <div className='w-75 mx-auto'>
            <Clock />
            <h4 className='mt-2 mb-1'>Sessions</h4>
            <CardText>Rigorous and dynamic sessions</CardText>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default ItemFeatures
