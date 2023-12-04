import { Col } from 'reactstrap'
import ListGroupContextual from '../../components/listGroup/ListGroupContextual'
import VerticalForm from '../../forms/form-layouts/VerticalForm'

export default function rigthPart() {
  return (
      <Col lg='4' className="ps-sm-4 col-12">
        <h1 className="text-primary texitalic fs-27">Our Programs Include</h1>
        <ListGroupContextual/>
        <VerticalForm/>
      </Col>
  )
}
