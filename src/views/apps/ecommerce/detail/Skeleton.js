import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Card, Col, Row } from 'reactstrap'

const index = () => {
  return (
    <Card>
      <Skeleton height={350} className='line-height-none' />
      <Row className='p-3'>
        <Col md='5'>
          <Skeleton height={200} />
        </Col>
        <Col md='7'>
          <h2>
            <Skeleton className='w-50' />
          </h2>
          <Skeleton count={7} className='w-75' />
        </Col>
      </Row>
    </Card>
  )
}

export default index
