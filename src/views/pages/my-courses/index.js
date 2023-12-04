import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardBody, CardFooter, CardText, Col, Input, Label, Row } from 'reactstrap'
import { assignCourse, clearAssignCourseError, getChildren, getMyCourses } from './store'

// ** Third Party Components
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

// ** Styles
import 'react-loading-skeleton/dist/skeleton.css'
import 'animate.css/animate.css'
import '@styles/base/plugins/extensions/ext-component-sweet-alerts.scss'
// import { getChildList } from '../../apps/ecommerce/store'

const Courses = ({ item, unassigned }) => {
  const dispatch = useDispatch()
  const MySwal = withReactContent(Swal)
  const [chooseChild, setChooseChild] = useState('')
  const baseURl = 'https://admin.smartstartnow.com/'

  // ** Get coursess
  // useEffect(() => {
  //   dispatch(getMyCourses())
  //   dispatch(getChildList({name:"", page:1}))
  // }, [dispatch])

  const { children, assignCourseError } = useSelector(state => state.myCourses)

  useEffect(() => {
    if (assignCourseError) {
      MySwal.fire({
        icon: 'error',
        title: assignCourseError,
        customClass: { confirmButton: 'btn btn-success' },
      })
      setChooseChild('')
      dispatch(clearAssignCourseError())
    }
  }, [assignCourseError])

  const handleConfirmText = (user_id, course_semester_id, order_id) =>
    MySwal.fire({
      title: 'You confirm to assign this child to the this course?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, I agree!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ms-1',
      },
      buttonsStyling: false,
      preConfirm: () => {
        setChooseChild(user_id)
        dispatch(assignCourse({ user_id, course_day_id: course_semester_id, order_id })).then(res => {
          if (Object.keys(res).length) {
            if (res?.meta?.requestStatus === 'fulfilled')
              MySwal.fire({
                icon: 'success',
                title: 'Success!',
                customClass: { confirmButton: 'btn btn-success' },
              })
          }
        })
      },
    })

  return (
    <Col xl='3' md='4' sm='12' className='col-12 p-2'>
      <Card className='ecommerce-card rounded h-100 w-100' key={item.course_name}>
        <div className='item-img text-center'>
          <Link to={`/course/${item.slug}`}>
            <img
              className='img-fluid w-100 mx-auto d-block rounded-top'
              src={`${baseURl}api/file/${item.course_image}`}
              alt={item.course_name}
              style={{ height: 230 }}
            />
          </Link>
        </div>
        <CardBody>
          <h4 className='item-name'>
            <Link className='text-body' to={`/course/${item.slug}`}>
              {item.course_name}
            </Link>
          </h4>
          <CardText className='item-description overflow-hidden' style={{ maxHeight: '190px' }}>
            <span
              dangerouslySetInnerHTML={{
                __html: item?.short_description?.substring(0, 70),
              }}
            />
            {item?.short_description?.length >= 70 && '...'}
          </CardText>
          <h6>Price: ${item.per_day_price * item.lesson_count}</h6>
          {item?.assigned_child_first_name && (
            <h6 className='m-0'>
              <span className='text-success'>Student: </span>
              {item?.assigned_child_first_name} {item?.assigned_child_last_name}
            </h6>
          )}
          <h6 className='m-0'>
            <span className='text-success'>Start date: </span>
            {item?.start_date}
          </h6>
          <h6 className='m-0'>
            <span className='text-danger'>End date: </span>
            {item?.end_date}
          </h6>
        </CardBody>
        {/* comment */}
        {unassigned && (
          <CardFooter>
            <Label className='form-label' for='select-basic'>
              Assign child
            </Label>
            <Input
              type='select'
              value={chooseChild}
              onChange={e => handleConfirmText(e.target.value, item.course_days_id, item.order_id)}
              name='select'
              id='select-basic'
            >
              <option></option>
              {children.map((child, index) => (
                <option
                  key={index}
                  value={child.id}
                  // onClick={}
                >
                  {child.first_name} {child.last_name}
                </option>
              ))}
            </Input>
          </CardFooter>
        )}
      </Card>
    </Col>
  )
}

const index = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    purchasedUnassignedCourses,
    notPurchasedCourses,
    purchasedAssignedCourses,
    isLoading,
    success,
  } = useSelector(state => state.myCourses)
  const userData = localStorage.getItem('userData')
  console.log(purchasedUnassignedCourses)

  // order_id
  useEffect(() => {
    if (!userData) navigate('/')
  }, [userData])

  // ** Get coursess
  useEffect(() => {
    dispatch(getMyCourses())
    dispatch(getChildren())
  }, [])

  useEffect(() => {
    if (success) {
      dispatch(getMyCourses())
      dispatch(getChildren())
    }
  }, [success])

  return (
    <Col md='12' className='mt-lg-2 p-1'>
      {isLoading ? (
        <Row>
          {[...new Array(4)].map((_, index) => (
            <Col xl='3' md='4' sm='12' className='col-12 p-2 ' key={index}>
              <Card className='ecommerce-card rounded overflow-hidden h-100 w-100'>
                <Skeleton width='100%' height={230} />
                <CardBody>
                  <h4>
                    <Skeleton />
                  </h4>
                  <CardText>
                    <Skeleton count={2} />
                  </CardText>
                </CardBody>
                {/* <div className='item-options text-center'>
                <div className='d-flex flex-xl-row flex-lg-column flex-sm-row flex-column'>
                  <Button className='w-100 p-0 border-0'>
                    <Skeleton width='100%' height='35px' className='rounded-0' />
                  </Button>
                  <Button className='w-100 p-0 border-0'>
                    <Skeleton width='100%' height='35px' className='rounded-0' />
                  </Button>
                </div>
              </div> */}
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div className=' d-fex justify-content-center'>
          <h2>Courses not purchased</h2>
          <Row className=''>
            {notPurchasedCourses?.data?.length ? (
              notPurchasedCourses?.data?.map((item, index) => <Courses item={item} key={index} />)
            ) : (
              <div className='d-flex justify-content-center mt-2'>
                <p>No Results</p>
              </div>
            )}
          </Row>
          <hr />
          <h2>Assigned courses</h2>
          <Row className=''>
            {purchasedAssignedCourses?.data?.length ? (
              purchasedAssignedCourses?.data?.map((item, index) => (
                <Courses item={item} key={index} />
              ))
            ) : (
              <div className=''>
                <p>No Results</p>
              </div>
            )}
          </Row>
          <hr />
          <h2>Unassigned courses</h2>
          <Row className='d-fex justify-content-center'>
            {purchasedUnassignedCourses?.data?.length ? (
              purchasedUnassignedCourses?.data?.map((item, index) => (
                <Courses item={item} key={index} unassigned />
              ))
            ) : (
              <div className='d-flex justify-content-center mt-2'>
                <p>No Results</p>
              </div>
            )}
          </Row>
        </div>
      )}
    </Col>
  )
}

export default index

// <div className='item-options text-center'>
//                 <div className='item-wrapper'></div>
//                 <div className='d-flex flex-xl-row flex-lg-column flex-sm-row flex-column'>
//                   <Link to={`/course/${item.id}`} className='w-100'>
//                     <Button
//                       color='light'
//                       tag={CartBtnTag}
//                       className='btn-cart move-cart w-100 rounded-0'
//                       /*eslint-disable */
//                       {...(true ? { to: `/course/${item.id}` } : {})}
//                       /*eslint-enable */
//                     >
//                       <Info className='me-50' size={14} />
//                       <span>Learn More</span>
//                     </Button>
//                   </Link>
//                   <Button
//                     color='primary'
//                     tag={CartBtnTag}
//                     className='btn-cart move-cart w-100 rounded-0'
//                     onClick={() => {
//                       setCenteredModal({ ...item, count: 1 })
//                     }}
//                     /*eslint-disable */
//                     {...(item.isInCart
//                       ? {
//                           to: '/apps/ecommerce/checkout',
//                         }
//                       : {})}
//                     /*eslint-enable */
//                   >
//                     <ShoppingCart className='me-50' size={14} />

//                     <span> Now</span>
//                   </Button>
//                 </div>
//               </div>
