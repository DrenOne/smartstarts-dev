// ** React Imports
import { Link } from 'react-router-dom'

// ** Third Party Components
import classnames from 'classnames'
import { ShoppingCart, Info } from 'react-feather'

// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardText,
  Button,
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  UncontrolledTooltip
} from 'reactstrap'
// import { addToCartState } from "../store"
import toast, { useToasterStore } from 'react-hot-toast'
// import ToastContent from "../../../pages/home/ToastContent"
import { Fragment, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart, addToCartState } from '../store'
import ToastContent from '../../../pages/home/ToastContent'
// ** Third Party Components
// import Swal from "sweetalert2"
// import withReactContent from "sweetalert2-react-content"

const ProductCards = props => {
  // ** Props
  const {
    store,
    // dispatch, addToCart,
    activeView
  } = props

  // const token = JSON.parse(localStorage.getItem("userData"))
  const baseURl = 'https://admin.smartstartnow.com/'
  const { toasts } = useToasterStore()
  const TOAST_LIMIT = 1
  // const MySwal = withReactContent(Swal)
  const [centeredModal, setCenteredModal] = useState('')
  // const [allSemester, setAllSemester] = useState([])
  // const [all, setAll] = useState(false)
  // const [checkSemester, setCheckSemester] = useState([false, false, false])
  const [nimadir, setNimadir] = useState([])
  const [semester, setSemester] = useState('')
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  // const displayAcademicYear = []
  const token = JSON.parse(localStorage.getItem('userData'))
  const dispatch = useDispatch()

  useEffect(() => {
    toasts
      .filter(t => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit?
      .forEach(t => toast.dismiss(t.id)) // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts])

  // ** Handle Move/Add to cart
  const form = document.createElement('div')

  form.innerHTML = `
  <span id="tfHours">0</span> hours<br>
  <input style="width:90%" type="range" name="tfHours" value=0 step=1 min=0 max=25
  onchange="changeHours(this.value)"
  oninput="window.changeHours(this.value)"
  ><br>
  <span id="tfMinutes">0</span> min<br>
  <input style="width:60%" type="range" name="tfMinutes" value=0 step=5 min=0 max=60
  onchange="window.changeMinutes(this.value)"
  oninput="window.changeMinutes(this.value)"
  ><br>
  `
  const handleCartBtn = () => {
      if (token) {
        nimadir.map(el => {
          dispatch(addToCart({ id: el.id, el:el.bundle }))
        })
        setNimadir([])

      } else {
        dispatch(addToCartState({ ...centeredModal, allSemester: nimadir }))
        setNimadir([])
      }
      toast(t => (
        // duration = 1,
        <ToastContent t={t} />
      ))
    }
  

  // const addSemester = (semester, index) => {
  //   const newCheck = checkSemester.map((el, i) => {
  //     if (i === index) {
  //       return !checkSemester[i]
  //     } else {
  //       return el
  //     }
  //   })

  //   setCheckSemester(newCheck)
  //   if (newCheck[index]) {
  //     const data = allSemester.filter(el => {
  //       if (el.id !== semester.id) {
  //         return el
  //       }
  //     })
  //     setAllSemester([...data, semester])
  //   } else {
  //     const data = allSemester.filter(el => {
  //       if (el.id !== semester.id) {
  //         return el
  //       }
  //     })
  //     setAllSemester([...data])
  //   }
  // }
  // useEffect(() => {
  //   if (all) {
  //     setAllSemester(centeredModal.semesters)
  //     setCheckSemester([true, true, true])
  //   } else {
  //     setCheckSemester([false, false, false])
  //     setAllSemester([])
  //   }
  // }, [all])

  const changeSemester = semester1 => {
    if (semester === semester1) setSemester('')
    else setSemester(semester1)
  }

  const chooseDay = semester => {
    if (!nimadir.find(nima => semester === nima.semester)) {
      setNimadir([...nimadir, { semester }])
      changeSemester(semester)
    } else changeSemester(semester)
  }

  const onChange = data1 => {
    nimadir.forEach(nima => {
      if (nima.semester === data1.semester) {
        nima.day = data1.day
        nima.id = centeredModal.days_ids.find(day_id => day_id.day.name === data1.day && day_id.semester.name === data1.semester).id
        nima.price = nima.price = centeredModal?.days_ids?.find(day_id => day_id.semester.name === semester && day_id.day.name).lesson_count * centeredModal?.semesters?.find(semester1 => semester === semester1.name).per_day_price
      }
    })
    changeSemester(data1.semester)
    setNimadir([...nimadir])
  }

  const renderProducts = () => {
    const baseURl = 'https://admin.smartstartnow.com/'

    if (store.data.data.length) {
      
      return store?.data?.data?.map((item, index) => {
        const CartBtnTag = item.isInCart ? Link : 'button'
        const start_date = item?.semesters?.map(el => el.start_date.slice(0,4))
        return (
          <Col xl='4' md='6' sm='12' className='col-12 p-2 ps-0' key={index}>
            <Card className='ecommerce-card rounded overflow-hidden h-100 w-100' key={item.name}>
              <div className='item-img text-center'>
                <Link to={`/course/${item.slug}`}>
                  <img
                    className='img-fluid mx-auto d-block'
                    src={`${baseURl}api/file/${item.image}`}
                    alt={item.name}
                    style={{ height: 230, width: 350, overflow: 'hidden' }}
                  />
                </Link>
              </div>
              <CardBody>
                <h4 className='item-name'>
                  <Link className='text-body  item-name' to={`/course/${item.slug}`}>
                     {item.name}
                  </Link>
                  {/* <span className='d-block ' style={{fontSize:"15px"}}>Term: {start_date[0]} - {start_date[1]}</span> */}
                </h4>
                {/* <CardText
                  className='item-description overflow-hidden'
                  // style={{ maxHeight: '190px' }}
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: item?.short_description?.substring(0, 70)
                    }}
                  />
                  {item?.short_description?.length >= 70 && '...'}
                </CardText> */}
              </CardBody>
              <div className='item-options text-center'>
                <div className='item-wrapper'></div>
                <div className='d-flex flex-xl-row flex-lg-column flex-sm-row flex-column'>
                  <Link to={`/course/${item.slug}`} className='w-100'>
                    <Button
                      color='primary'
                      tag={CartBtnTag}
                      className='btn-cart move-cart w-100 rounded-0'
                      /*eslint-disable */
                      {...(true
                        ? {
                            to: `/course/${item.slug}`
                          }
                        : {})}
                      /*eslint-enable */
                    >
                      <Info className='me-50' size={14} />
                      <span>Learn More</span>
                    </Button>
                  </Link>
                  {/* <Button
                    color='primary'
                    tag={CartBtnTag}
                    className='btn-cart move-cart w-100 rounded-0'
                    onClick={() => {
                      setCenteredModal({ ...item, count: 1 })
                    }}
                   
                    {...(item.isInCart
                      ? {
                          to: '/apps/ecommerce/checkout'
                        }
                      : {})}
                  >
                    <ShoppingCart className='me-50' size={14} />

                    <span>Enroll Now</span>
                  </Button> */}
                </div>
              </div>
            </Card>
          </Col>
        )
      })
    }
  }

  return (
    <div
      style={{ display: 'contents' }}
      className={classnames({
        'grid-view': activeView === 'grid',
        'list-view': activeView === 'list'
      })}
    >
      {renderProducts()}
      <div className='vertically-centered-modal'>
        <Modal
          isOpen={!!centeredModal}
          toggle={() => setCenteredModal('')}
          className='modal-dialog-centered'
        >
          <ModalBody>
            <div className='demo-inline-spacing flex-column'>
              <div className='w-100'>
                <img
                  src={`${baseURl}api/file/${centeredModal?.course_image || centeredModal?.image}`}
                  className='w-100'
                  height='300'
                />
              </div>
              <h2>{centeredModal.name} course</h2>
              {/* {centeredModal?.days_ids?.map((el, i) => {
                if (el.semester.name === 'Spring' || el.semester.name === 'Fall') {
                  displayAcademicYear.push(el.semester.name)
                }
                return (
                  <Fragment key={i}>
                    <h4>{el.semester?.name}</h4>
                    <div className='form-check form-check-primary'>
                      <Label className='form-check-label' for={el.semester?.name}>
                        {el?.day?.name} (
                        <b>
                          $
                          {el.lesson_count *
                            centeredModal.semesters.find(
                              semester => el.semester.name === semester.name
                            ).per_day_price}
                        </b>
                        )
                      </Label>
                  
                      <Input
                        type='checkbox'
                        id={el.semester.name}
                        onChange={() => addSemester(el, i)}
                        checked={checkSemester[i] || all}
                        disabled={all}
                      />
                    </div>
                  </Fragment>
                )
              })}
              <div
                className='form-check form-check-primary'
                style={{
                  display: displayAcademicYear.length > 1 ? 'block' : 'none'
                }}
              >
                {/* <Label className='form-check-label' for='full'>
                  <h4>Full Academic Year</h4>
                </Label>
                <Input
                  id='full'
                  type='checkbox'
                  onChange={() => {
                    setAll(!all)
                    setCheckSemester([true, true, true])
                  }}
                /> 
                />
              </div> */}
              {centeredModal?.semesters?.map((semester, index) => (
                <div className='form-check form-check-primary' key={index}>
                  <Input
                    type='checkbox'
                    id={semester.id.toString()}
                    checked={!!nimadir.find(nima => semester.name === nima.semester)?.day}
                    onChange={() => chooseDay(semester.name)}
                  />
                  <Label className="form-check-label" for={semester.id.toString()}>{semester.name} {nimadir.find(nima => nima.semester === semester.name)?.day && `(${nimadir.find(nima => nima.semester === semester.name)?.day})`}</Label>
                </div>
              ))}
              {/* Radio */}
              <div className='d-flex flex-wrap'>
                {semester && days.map((day, index) => (
                  <div className='form-check form-check-primary me-2 mt-1' key={index}>
                    <Input
                      type='radio'
                      name='day'
                      id={day}
                      value={day}
                      onChange={() => onChange({ semester, day })}
                      checked={!!nimadir.find(nima => nima.day === day && nima.semester === semester)}
                      disabled={semester && !centeredModal?.days_ids?.find(day_id => day_id.day.name === day && day_id.semester.name === semester) && true}
                    />
                    <Label for={day} id={!centeredModal?.days_ids?.find(day_id => day_id.day.name === day && day_id.semester.name === semester) && `${day}kun`}>
                      {day} ({semester && centeredModal?.days_ids?.find(day_id => day_id.day.name === day && day_id.semester.name === semester) ? `$${centeredModal?.days_ids?.find(day_id => day_id.semester.name === semester && day_id.day.name).lesson_count * centeredModal?.semesters?.find(semester1 => semester === semester1.name).per_day_price}` : 'Booked'})
                    </Label>
                    {!centeredModal?.days_ids?.find(day_id => day_id.day.name === day && day_id.semester.name === semester) &&
                      <UncontrolledTooltip placement='top' target={`${day}kun`}>
                        Class is already full
                      </UncontrolledTooltip>
                    }
                  </div>
                ))}
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color='primary'
              onClick={() => {
                // console.log("all", all)
                // console.log("allSemester", allSemester)
                // console.log("allSemester", allSemester)
                handleCartBtn()
                setCenteredModal('')
                // setCheckSemester([false, false, false])
                // setAll(false)
              }}
            >
              Enroll Now
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  )
}

export default ProductCards
