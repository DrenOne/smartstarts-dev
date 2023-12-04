// ** Reactstrap Imports
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { getPrograms } from '../../apps/ecommerce/store'

const ListGroupContextual = () => {
  const dispatch = useDispatch()
  const { programs } = useSelector(state => state.ecommerce)

  useEffect(() => {
    dispatch(getPrograms())
  }, [])

  return (
    <ListGroup className='text-center fs-20'>
      {programs?.length &&
        programs?.map((program, index) => (
          <ListGroupItem className='border-bottom-0' key={index}>
            <Link to='/courses' onClick={() => localStorage.setItem('program', program?.id)}>
              {program.name}
            </Link>
          </ListGroupItem>
        ))}
      <ListGroupItem className='bg-danger'>
        <Link
          className='text-white'
          to='/courses'
          onClick={() => {
            localStorage.removeItem('grade')
            localStorage.removeItem('program')
          }}
        >
          Click here to learn more
        </Link>
      </ListGroupItem>
    </ListGroup>
  )
}
export default ListGroupContextual
