// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// ** Shop Components
import Sidebar from './Sidebar'
import Products from './Products'
import { Col } from 'reactstrap'
// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'
// import left from '@src/assets/images/decore-left.png'
// import right from '@src/assets/images/decore-right.png'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import {
  addToCart,
  getProducts,
  getCartItems,
  addToWishlist,
  // deleteCartItem,
  deleteWishlistItem,
} from '../store'

// ** Styles
import '@styles/react/apps/app-ecommerce.scss'
import Carousel from './Carousel'

const Shop = () => {
  const navigate = useNavigate()
  // ** States
  const [activeView, setActiveView] = useState('grid')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [grade_id, setGradeV] = useState(localStorage.getItem('grade') ?? '')
  const [program_id, setProgramV] = useState(localStorage.getItem('program') ?? '')
  const [subject_id, setSubjectV] = useState('')
  const [name, setName] = useState('')
  const [year, setYear] = useState('')
  const [order, setOrder] = useState('')
  const userDate = JSON.parse(localStorage.getItem('userData'))

  useEffect(() => {
    if (userDate?.role === 'student' || userDate?.role === 'tutor') navigate('/schedule')
  }, [userDate])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // ** Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.ecommerce)

  // ** Get products
  useEffect(() => {
    dispatch(
      getProducts({
        name,
        grade_id,
        program_id,
        subject_id,
        year,
        order,
      })
    )
  }, [grade_id, program_id, subject_id, name, year, order])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Fragment>
      <div className=''>
        <div
          className='d-none justify-content-between'
          style={{
            background:
              'radial-gradient(circle, rgba(255,255,255,255) 0%, rgba(255,255,255,1) 100%)',
          }}
        >
          <Col md='2'>{/* <img src={left} width='200px' /> */}</Col>
          <Col md='8' className=' text-center py-5'>
            {/* <div className='d-flex justify-content-center mb-3'>
              <div
                color='primary'
                className='bg-primary rounded-circle pt-1'
                style={{ width: '50px', height: '50px' }}
              >
                <Award color='white' />
              </div>
            </div> */}
            {/* <h1 className='text-primary'>Choose from ample variety of available courses</h1>
            <p className='text-primary'>
              You can purchase multiple courses to get a group discount.
              <span className='d-block'>
                {' '}
                Looking to refer a someone you know? please click here
              </span>
            </p> */}
          </Col>
          <Col md='2' className=' text-end'>
            {/* <img src={right} width='200px' /> */}
          </Col>
        </div>
        <div className='container-xxl p-5 pb-0 pt-2'>
          <Products
            store={store}
            dispatch={dispatch}
            addToCart={addToCart}
            activeView={activeView}
            getProducts={getProducts}
            sidebarOpen={sidebarOpen}
            getCartItems={getCartItems}
            setActiveView={setActiveView}
            addToWishlist={addToWishlist}
            setSidebarOpen={setSidebarOpen}
            // deleteCartItem={deleteCartItem}
            deleteWishlistItem={deleteWishlistItem}
            name={name}
            setName={setName}
            grade_id={grade_id}
            program_id={program_id}
            subject_id={subject_id}
          />
          <Sidebar
            sidebarOpen={sidebarOpen}
            grade_id={grade_id}
            setGradeV={setGradeV}
            program_id={program_id}
            setProgramV={setProgramV}
            subject_id={subject_id}
            setSubjectV={setSubjectV}
            year={year}
            setYear={setYear}
            sort={order}
            setSort={setOrder}
          />
          <div style={{ clear: 'both' }} />
          <div className='mt-5 pt-sm-5'>
            <Carousel />
          </div>
        </div>
      </div>
    </Fragment>
  )
}
export default Shop
