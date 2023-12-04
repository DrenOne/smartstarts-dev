// ** Icons Imports
import { Search } from 'react-feather'

// ** Reactstrap Imports
import { Row, Col, InputGroup, Input, InputGroupText } from 'reactstrap'

const ProductsSearchbar = props => {
  // ** Props
  const { name, setName } = props

  return (
    <div id='ecommerce-searchbar' className='ecommerce-searchbar pe-2'>
      <Row className='mt-md-1 mt-5 pt-1 pt-md-0'>
        <Col sm='12'>
          <InputGroup className='input-group-merge'>
            <Input
              className='search-product'
              placeholder='Search Courses'
              onChange={e => setName(e.target.value)}
              value={name}
            />
            <InputGroupText>
              <Search className='text-muted' size={14} />
            </InputGroupText>
          </InputGroup>
        </Col>
      </Row>
    </div>
  )
}

export default ProductsSearchbar
