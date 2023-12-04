import { Link, useNavigate } from 'react-router-dom'

import {
  ShoppingCart,
  Share2,
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  Check,
  X,
} from 'react-feather'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Button,
  CardText,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown,
  Label,
  Input,
  UncontrolledTooltip,
} from 'reactstrap'
import { addToCart, addToCartState, getProducts, getRelatedCourse } from '../store'
import { useEffect, useState } from 'react'
import toast, { useToasterStore } from 'react-hot-toast'
import Select from 'react-select'
import ToastContent from '../../../pages/home/ToastContent'
import { useSelector } from 'react-redux'
import RecomendedCourses from './RecomendedCourses'

const Product = props => {
  // ** Props
  const store = useSelector(state => state.ecommerce)
  const { data, dispatch, slug } = props
  const { relatedCourse, relatedLoading, isLoading } = store
  const baseURl = 'https://admin.smartstartnow.com/'
  const token = JSON.parse(localStorage.getItem('userData'))
  const navigate = useNavigate()
  const { toasts } = useToasterStore()
  const TOAST_LIMIT = 1
  const [total, setTotal] = useState(0)
  const [all, setAll] = useState([])
  const [academicYear, setAcademicYear] = useState([])
  const [nimadir, setNimadir] = useState([])
  const [semester, setSemester] = useState('')
  const [checkFullSemester, setCheckFullSemester] = useState(false)
  const [FullSemester, setFullSemester] = useState(false)
  const [bundleSum, setBundleSum] = useState(0)

  // const [checkboxINput, setChechboxInput] = useState(false)
  const [bundle, setBundle] = useState([])
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  useEffect(() => {
    toasts
      .filter(t => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit?
      .forEach(t => toast.dismiss(t.id)) // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts])

  useEffect(() => {
    dispatch(getProducts({ grade_id: data.grade_id }))
    dispatch(getRelatedCourse(data.id))
  }, [data.grade_id])

  const handleCartBtn = () => {
    if (token) {
      nimadir.map(el => {
        dispatch(addToCart({ id: el.id, bundle: el.bundle }))
      })
    } else {
      dispatch(addToCartState({ ...data, allSemester: nimadir }))
    }
    toast(t => (
      // duration = 1,
      <ToastContent t={t} />
    ))
  }
  const CartBtnTag = data.isInCart ? Link : 'button'

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
  //     setAllSemester(data.days_ids)
  //     setCheckSemester([true, true, true])
  //   } else {
  //     setCheckSemester([false, false, false])
  //     setAllSemester([])
  //   }
  // }, [all])

  // useEffect(() => {
  //   let x = 0
  //   allSemester.map(el => {
  //     // x += Number(el.price)
  //     x += el.lesson_count * data.semesters.find(semester => el.semester.name === semester.name).per_day_price
  //     if (allSemester.length === data.semesters.length) setAll(true)
  //   })
  //   setTotal(x)
  //   // dispatch(getDisCount())
  // }, [allSemester])

  useEffect(() => {
    let x = 0

    nimadir.map(item => {
      if (item.price) x += Number(item?.price)
      // TotatApi += Number(item?.allSemester?.lesson_count * item?.semesters?.find(semester => item?.allSemester?.semester?.name === semester?.name)?.per_day_price || item.lesson_count * item.per_day_price)
    })
    setTotal(x)
  }, [nimadir])

  const changeSemester = semester1 => {
    if (semester === semester1) setSemester('')
    else setSemester(semester1)
  }

  const chooseDay = (e, semester) => {
    setCheckFullSemester(false)
    if (e.target.checked) {
      if (
        !nimadir.find(nima => {
          semester === nima.semester
        })
      ) {
        setNimadir([...nimadir, { semester }])
        changeSemester(semester)
      } else changeSemester(semester)
    } else {
      const newNimadir = nimadir.filter(el => {
        if (el.semester !== semester) {
          return el
        }
      })
      const newAll = all.filter(el => {
        if (el.semester !== semester) {
          return el
        }
      })
      setNimadir(newNimadir)
      setAll(newAll)
    }
  }

  const onChange = data1 => {
    if (!data1.semester) {
      setNimadir([])
      const x = data.days_ids.filter(el => {
        if (el.day.name === data1.day && el.semester.name !== 'Summer') {
          return el
        }
      })
      const y = x.map(el => {
        const c =
          el.lesson_count *
          data?.semesters?.find(semester1 => el.semester.name === semester1.name)?.per_day_price

        const p = {
          semester: el.semester.name,
          day: data1.day,
          id: el.id,
          price: c,
        }
        return p
      })
      setNimadir([...y])
      setAll([...y])
      changeSemester(data1.semester)
    } else {
      if (data1.bundle?.length > 1) {
        let day2 = ''
        let id2 = 0
        let price2 = 0
        bundle.map((el, index) => {
          if (data1.semester === el.semester.name) {
            day2 += `${el.day.name} ` + `${bundle.length - 1 !== index ? ',' : ''}`
            id2 = el.id
            price2 +=
              el?.lesson_count *
              data?.semesters?.find(sem => sem.name === data1.semester)?.per_day_price
          }
        })
        const bundleNimadir = {
          semester: data1.semester,
          day: day2,
          id: id2,
          price: price2,
          bundle: true,
        }
        changeSemester(data1.semester)
        const nimadirdub = nimadir.filter(el => el.day)
        nimadir[0].day ? setNimadir([...nimadirdub, bundleNimadir]) : setNimadir([bundleNimadir])
      } else {
        nimadir.forEach(nima => {
          if (nima.semester === data1.semester) {
            nima.day = data1.day
            nima.id = data.days_ids.find(
              day_id => day_id.day.name === data1.day && day_id.semester.name === data1.semester
            )?.id
            nima.price = nima.price =
              data?.days_ids?.find(
                day_id => day_id.semester.name === semester && day_id.day.name === data1.day
              )?.lesson_count *
              data?.semesters?.find(semester1 => semester === semester1.name)?.per_day_price
          }
        })
        changeSemester(data1.semester)
        nimadir.map(el => {
          if (
            el.semester === 'Fall' ||
            (el.semester === 'Spring' && all.find(all => el.day === all.day))
          ) {
            const x = all.filter(elAll => {
              return elAll.semester !== el.semester && elAll.day === el.day
            })
            setAll([...x, el])
          }
        })
        setNimadir([...nimadir])
      }
    }
  }

  useEffect(() => {
    let days = []
    setAcademicYear([])
    setBundle([])
    //  const data = store.productDetail?.semester?.filter(semester => {
    //   return  store.productDetail?.days_ids?.filter(day => {
    //      if (semester.name === day.semester.name && semester.name !== "Summer") {
    //       const x =  {day:day.day.name, semester: semester.name,
    //         id: day.id,
    //         price: day.lesson_count * semester.per_day_price,}
    //       return x
    //      }

    //     })
    //   })
    store.productDetail.semesters.map(
      semester =>
        !semester.bundle &&
        store.productDetail.days_ids.map(day => {
          if (semester.name === day.semester.name && semester.name !== 'Summer')
            days = [
              ...days,
              {
                day: day.day.name,
                semester: semester.name,
                id: day.id,
                price: day.lesson_count * semester.per_day_price,
              },
            ]
        })
    )
    const output = []
    Object.values(
      days.reduce((res, obj) => {
        const key = obj?.semester !== 'Summer' && obj.day
        res[key] = [
          ...(res[key] || []),
          { id: obj.id, day: obj?.day, semester: obj.semester, price: obj.price },
        ]
        return res
      }, {})
    ).forEach(res => {
      if (res.length > 1) {
        const x = {
          day: res[0].day,
          semester: [res[0].semester, res[1] && res[1].semester],
          id: [res[0].id, res[1] && res[1].id],
          price: res[0].price + res[1].price - Number(store?.disCount?.data),
        }
        output.push(x)
      }
    })

    // days.map(days=>{
    //  const z = output.filter(out => {
    //      if (days.day === output.day && days.semester === "Spring" || days.semester === "Fall" && days.id !== out.id) {
    //       const x = {
    //         day: days.day,
    //           semester: [days.semester, out.semester],
    //           id: [days.id, out.id],
    //           price: days.price + out.price - Number(store?.disCount?.data),
    //       }
    //       return x
    //      }
    //   })
    // })
    setAcademicYear(output)
    // return output.filter(e => lookup[e.day])
    // days.map(day => {
    //    setAcademicYear([])
    //     days.map(day1 => {
    //       if (
    //         day.day === day1.day &&
    //         day.id !== day1.id &&
    //         day.semester !== day1.semester &&
    //         !academicYear.find(academic => academic.day === day1.day)

    //       ) {

    //         academicYear.push({
    //           day: day.day,
    //           semester: [day.semester, day1.semester],
    //           id: [day.id, day1.id],
    //           price: day.price + day1.price - Number(store?.disCount?.data),
    //         })
    //       }
    //     })

    // }
    // )

    // setAcademicYear(academicYear)
    data.semesters.filter(el => {
      if (el.bundle) {
        const y = data.days_ids.filter(day => {
          if (day.semester.name === el.name) {
            return day
          }
        })
        const x = bundle.filter(bundle => {
          bundle?.id !== y
        })
        setBundle([...x, ...y])
      }
      let x = 0
      bundle.map(el => {
        x +=
          el.lesson_count *
          data.semesters.find(semester => semester.name === el.semester.name).per_day_price
      })
      setBundleSum(x)
    })
  }, [data.id, nimadir])

  return (
    <Row className='my-2'>
      <Col className='d-flex align-items-center justify-content-center mb-2 mb-md-0' md='5' xs='12'>
        <div className='d-flex align-items-center justify-content-center'>
          <img
            className='img-fluid product-img'
            heigh='200px'
            src={`${baseURl}api/file/${data.image}`}
            alt={data.name}
          />
        </div>
      </Col>
      <Col md='7' xs='12'>
        <h2>{data.name}</h2>
        <CardText tag='span' className='item-company mb-1 d-flex align-items-end'>
          By:
          <a
            className='company-name h4 mb-0  text-danger'
            href='/'
            onClick={e => e.preventDefault()}
          >
            SmartStartUSA
          </a>
          {/* </h4> */}
        </CardText>
        <div className='ecommerce-details-price'>
          {/* <h4 className="item-price d-block">
            Price: ${data.sale_price}
          </h4> */}
          {[
            '2-hour sessions once per week, 36 sessions total.',
            'Experienced, licensed teachers',
            'Carefully crafted lesson planning',
            'Small group instruction',
            'Assessment of the individual students needs',
            'Rigorous and dynamic sessions',
          ].map((text, index) => (
            <div className='d-flex align-items-center mb-1' key={index}>
              <div>
                <Check color='#ff0000' strokeWidth={5} size={20} />
              </div>
              <h6 className='mb-0' style={{ marginLeft: '5px' }}>
                {text}
              </h6>
            </div>
          ))}
          {relatedCourse.length && !relatedLoading && !isLoading ? (
            <Row className='mb-1'>
              <Col md='6'>
                <Label className='form-label fs-16' for='select-basic'>
                  Choose Academic Year
                </Label>
                <Select
                  options={[
                    {
                      label: `${data.term} - ${Number(data.term) + 1}`,
                      value: slug,
                      term: Number(data.term),
                    },
                    ...relatedCourse,
                  ].sort((a, b) => a.term - b.term)}
                  defaultValue={{
                    label: `${data.term} - ${Number(data.term) + 1}`,
                    value: slug,
                  }}
                  isSearchable={false}
                  onChange={e => navigate(`/course/${e.value}`)}
                />
              </Col>
            </Row>
          ) : null}
          <div className='mb-1'>
            <Label className='form-label fs-16' for='select-basic'>
              Choose semester
            </Label>

            <div className='demo-inline-spacing'>
              {/* {checkFullSemester &&  */}
              <div
                className='form-check form-check-primary'
                style={{
                  display: academicYear.length ? 'block' : 'none',
                }}
              >
                <Input
                  type='checkbox'
                  id='all'
                  onChange={() => {
                    setAll([])
                    setNimadir([])
                    setSemester('')
                    setCheckFullSemester(!checkFullSemester)
                    setFullSemester(false)
                    if (all.length === 2) {
                      setCheckFullSemester(false)
                    }
                  }}
                  checked={all.length === 2}
                  // checked={nimadir.length >=2 && nimadir[0].day && nimadir[1].day && nimadir[0].day === nimadir[1].day}
                />
                <Label
                  className='form-check-label text-primary'
                  for='all'
                  style={{
                    fontWeight: 900,
                    fontSize: '1.3rem',
                  }}
                >
                  Full Academic Year
                </Label>
              </div>
              {[...data?.semesters]
                .sort((a, b) => a?.semester_id - b?.semester_id)
                ?.map((semester, index) => (
                  <div className='form-check form-check-primary' key={index}>
                    <Input
                      style={{ marginTop: '4px' }}
                      type='checkbox'
                      id={semester.id.toString()}
                      onChange={e => {
                        chooseDay(e, semester.name)
                      }}
                      checked={!!nimadir.find(nima => semester.name === nima.semester)?.day}
                    />
                    <Label
                      className='form-check-label text-primary'
                      style={{ fontWeight: 900, fontSize: '1.3rem' }}
                      for={semester.id.toString()}
                    >
                      <div style={{ position: 'relative' }}>
                        <p
                          style={{
                            color: 'rgb(129,21,36)',
                            fontSize: '9px',
                            position: 'absolute',
                            top: '-10px',
                            right: '0px',
                          }}
                          className='m-0 p-0'
                        >
                          {semester?.start_date?.slice(0, 4)}
                        </p>
                        {semester.name}
                        {nimadir.find(nima => nima.semester === semester.name)?.day
                          ? nimadir.find(nima => nima.semester === semester.name)?.day &&
                            `(${nimadir.find(nima => nima.semester === semester.name)?.day})`
                          : bundle.find(el => el.semester.name === semester.name) && (
                              <span>(Bundle Course)</span>
                            )}
                      </div>
                    </Label>
                  </div>
                ))}
              {/* } */}
            </div>

            {/* Radio */}
            {bundle.find(el => semester === el.semester.name) ? (
              <div className='d-flex flex-wrap'>
                {semester && (
                  // days.map((day, index) => (
                  <div className='form-check form-check-primary me-2 mt-1' key='bundle'>
                    <Input
                      type='radio'
                      name='day'
                      id='bundleCourse'
                      // value={day1}
                      onChange={() => onChange({ semester, bundle })}
                      // checked={
                      //   !!nimadir.find(nima => nima.day === day && nima.semester === semester )
                      // }
                    />

                    <Label
                      for='bundleCourse'
                      style={{ color: 'green', fontWeight: 900 }}
                      id='bundleCourse'
                    >
                      {bundle &&
                        bundle.map((el, index) => {
                          if (el?.day.name && el.semester.name === semester) {
                            const z = bundle.length - 1 !== index ? ', ' : ''
                            return el?.day.name + z
                          }
                        })}{' '}
                      ( ${bundleSum})
                    </Label>
                    {/* {!data.days_ids.find(
                      day_id => day_id.day.name === day && day_id.semester.name === semester
                    ) && (
                      <UncontrolledTooltip placement='top' target={`${day}kun`}>
                        Class is already full
                      </UncontrolledTooltip>
                    )} */}
                  </div>
                )}
              </div>
            ) : (
              <div className='d-flex flex-wrap'>
                {semester &&
                  days.map((day, index) => (
                    <div className='form-check form-check-primary me-2 mt-1' key={index}>
                      <Input
                        type='radio'
                        name='day'
                        id={day}
                        value={day}
                        onChange={() => onChange({ semester, day })}
                        checked={
                          !!nimadir.find(nima => nima.day === day && nima.semester === semester)
                        }
                        disabled={
                          semester &&
                          !data.days_ids.find(
                            day_id => day_id.day.name === day && day_id.semester.name === semester
                          ) &&
                          true
                        }
                      />

                      <Label
                        for={day}
                        style={
                          semester &&
                          !data.days_ids.find(
                            day_id => day_id.day.name === day && day_id.semester.name === semester
                          ) &&
                          true
                            ? { color: 'red' }
                            : { color: 'green', fontWeight: 900 }
                        }
                        id={
                          !data.days_ids.find(
                            day_id => day_id.day.name === day && day_id.semester.name === semester
                          ) && `${day}kun`
                        }
                      >
                        {day} (
                        {semester &&
                        data.days_ids.find(
                          day_id => day_id.day.name === day && day_id.semester.name === semester
                        )
                          ? `$${
                              data.days_ids.find(
                                day_id =>
                                  day_id.semester.name === semester && day_id.day.name === day
                              )?.lesson_count *
                              data?.semesters?.find(semester1 => semester === semester1.name)
                                ?.per_day_price
                            }`
                          : 'Booked'}
                        )
                      </Label>
                      {!data.days_ids.find(
                        day_id => day_id.day.name === day && day_id.semester.name === semester
                      ) && (
                        <UncontrolledTooltip placement='top' target={`${day}kun`}>
                          Class is already full
                        </UncontrolledTooltip>
                      )}
                    </div>
                  ))}
              </div>
            )}
            <div className='d-flex flex-wrap'>
              {academicYear &&
                checkFullSemester &&
                days.map((day, index) => {
                  // const totalSum = academicYear.filter(
                  //     day_id => day_id.day === day
                  //   )
                  return (
                    <div className='form-check form-check-primary me-2 mt-1' key={index}>
                      <Input
                        type='radio'
                        name='day'
                        id={day}
                        value={day}
                        onChange={() => (
                          onChange({ semester, day }),
                          setCheckFullSemester(false),
                          setFullSemester(true)
                        )}
                        // checked={
                        //   academicYear.find(daySemester => daySemester.day === day)
                        // }
                        disabled={
                          !academicYear.find(daySemester => daySemester.day === day) && true
                        }
                      />

                      <Label
                        for={day}
                        style={
                          academicYear &&
                          !academicYear.find(daySemester => daySemester.day === day) &&
                          true
                            ? { color: 'red' }
                            : { color: 'green', fontWeight: 900 }
                        }
                        id={
                          !data.days_ids.find(
                            day_id => day_id.day.name === day && day_id.semester.name === semester
                          ) && `${day}kun`
                        }
                      >
                        {day}(
                        {academicYear.find(day_id => day_id.day === day)?.price
                          ? `$${academicYear.find(day_id => day_id.day === day)?.price}`
                          : 'Booked'}
                        )
                      </Label>
                      {/* {!data.days_ids.find(
                        day_id => day_id.day.name === day && day_id.semester.name === semester
                      ) && (
                        <UncontrolledTooltip placement='top' target={`${day}kun`}>
                          Class is already full
                        </UncontrolledTooltip>
                      )} */}
                    </div>
                  )
                })}
            </div>
          </div>
          <div className='d-flex'>
            <div style={{ display: all.length >= 2 ? 'block' : 'none' }}>
              <del>${total} </del>
              {/* <p className='text-danger'>Discount -{Math.floor((Number(store.disCount?.data) * 100) / total)}%</p> */}
            </div>
            <span
              className='text-danger ms-2 '
              style={{ display: all.length === 2 ? 'block' : 'none' }}
            >
              Congratulations you have earned $ {Number(store.disCount?.data)} off
            </span>
          </div>

          {/* <h4 className='item-price me-1 d-block mt-1'>{all.length > 1 ? `$ ${total - 100}` : `$ ${total}` || "Please select available semester and day"}</h4> */}
          <h4 className='item-price me-1 d-block mt-1 text-danger'>
            {all.length > 1
              ? `$ ${total - 100}`
              : total === 0
              ? 'Please select available semester and day'
              : `$ ${total}`}
          </h4>
        </div>
        <div className='d-flex flex-column flex-sm-row pt-1'>
          <Button
            tag={CartBtnTag}
            className='btn-cart me-0 me-sm-1 mb-1 mb-sm-0'
            color='primary'
            disabled={!nimadir[0]?.day}
            onClick={() => handleCartBtn(data.id, data.isInCart)}
            /*eslint-disable */
            {...(data.isInCart
              ? {
                  to: '/apps/ecommerce/checkout',
                }
              : {})}
            /*eslint-enable */
          >
            <ShoppingCart className='me-50' size={14} />
            {data.isInCart ? 'View in cart' : 'Enroll Now'}
          </Button>
          <UncontrolledButtonDropdown className='dropdown-icon-wrapper btn-share'>
            <DropdownToggle className='btn-icon hide-arrow' color='secondary' caret outline>
              <Share2 size={14} />
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem tag='a' href='/' onClick={e => e.preventDefault()}>
                <Facebook size={14} />
              </DropdownItem>
              <DropdownItem tag='a' href='/' onClick={e => e.preventDefault()}>
                <Twitter size={14} />
              </DropdownItem>
              <DropdownItem tag='a' href='/' onClick={e => e.preventDefault()}>
                <Youtube size={14} />
              </DropdownItem>
              <DropdownItem tag='a' href='/' onClick={e => e.preventDefault()}>
                <Instagram size={14} />
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
        </div>
      </Col>
      <CardText className='mt-5' style={{ position: 'relative' }}>
        {/* {data.related.length > 0 && <RelatedCourse data={data} baseURl={baseURl} />} */}
        <Row>
          <div
            className='post__content'
            dangerouslySetInnerHTML={{
              __html: data.description.slice(0, data.description.indexOf('<ul>')),
            }}
          ></div>
        </Row>

        <Row>
          <Col md='8'>
            <div
              className='post__content'
              dangerouslySetInnerHTML={{
                __html: data.description.slice(
                  data.description.indexOf('<ul>'),
                  data.description.length
                ),
              }}
            ></div>
          </Col>
          <Col md='4'>
            {data.additional_image && (
              <img
                style={{ position: 'relative', objectFit: 'contain' }}
                className='d-flex align-items-start reletive'
                // height='300px'
                width='300px'
                src={`${baseURl}api/file/${data.additional_image}`}
                alt={data.additional_image}
              />
            )}
          </Col>
          <Col className='col-12'>
            <RecomendedCourses />
          </Col>
        </Row>
      </CardText>
    </Row>
  )
}

export default Product
