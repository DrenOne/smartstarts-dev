import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useForm, Controller, useWatch } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'

// ** Reactstrap Imports
import {
  Form,
  Input,
  Card,
  Label,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Button,
  Row,
  Col,
} from 'reactstrap'
import { allUserRegData, changeCoupon, getCoupon } from '../../store'
import Coupon from './Coupon'

const Address = props => {
  const initialState = {
    name: '',
    street_address: '',
    city: '',
    state: '',
    zip_code: '',
    googleMapLink: '',
    checkoutApt: '',
  }

  // const dispatch = useDispatch()
  const [state, setState] = useState(initialState)
  const [allData, setAllData] = useState({})
  const getUserData = JSON.parse(localStorage.getItem('userData'))
  const getUserDataPayment = JSON.parse(localStorage.getItem('userDataPayment'))
  const store = useSelector(state => state.ecommerce)
  const google = window.google
  const dispatch = useDispatch()
  const [checkEmail, setCheckEmail] = useState(false)
  const [apt, setApt] = useState('')
  // const [checkEmailText, setcheckEmailText] = useState(false)
  // const [totalWithDisCount, setTotalWithDisCount] = useState(0)
  // const [sum, setSum] = useState(0)
  const data = getUserData ? store.cart : store.cartState

  // let TotalApi = 0

  // data.map(item => {
  //   if (getUserData) TotalApi += Number(item.lesson_count * item.per_day_price)
  //   else TotalApi += Number(item.allSemester.price)
  // TotalApi += Number(item?.allSemester?.lesson_count * item?.semesters?.find(semester => item?.allSemester?.semester?.name === semester?.name)?.per_day_price || item.lesson_count * item.per_day_price)
  // })

  // ** Props
  const { stepper, disCount, total, setTotal, coupon, setCoupon, CouponCheck, TotalApi } = props

  const defaultValues = {
    first_name: getUserData ? getUserData.first_name : '',
    checkoutCity: '',
    checkoutState: '',
    phone: '',
    // checkoutApt: "",
    last_name: getUserData ? getUserData.last_name : '',
    checkoutZipcode: '',
    checkoutAddress: '',
    email: getUserData ? getUserData.email : '',
  }
  // ** Vars
  const {
    control,
    setError,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues })

  useEffect(() => {
    const input = document.getElementById('checkoutAddress')
    const autocomplete = new google.maps.places.Autocomplete(input, {})
    autocomplete.addListener('place_changed', () => {
      const addressObject = autocomplete.getPlace()

      const address = addressObject.address_components
      setState({
        name: input.value,
        street_address: `${address[0]?.long_name} ${address[1]?.long_name} ` || '',
        city: address[4]?.long_name || '',
        state: address[5]?.short_name || '',
        zip_code: address[7]?.short_name || '',
      })
    })
  }, [])

  useEffect(() => {
    dispatch(changeCoupon())
  }, [])

  const onSubmit = async data => {
    if (Object.values(data).every(field => field.length > 0)) {
      const courses = store?.cartState?.map(el => {
        return el.allSemester.id
      })

      if (getUserData) {
        stepper.next()
      } else {
        await axios
          .post('https://admin.smartstartnow.com/api/check-email', {
            email: data.email,
            course_semester_ids: courses,
          })
          .then(res => {
            if (res.status === 200) {
              setCheckEmail(false)
              stepper.next()
            }
          })
          .catch(() => setCheckEmail(true))
      }
      setAllData(data)
      dispatch(allUserRegData({ ...data, courses, checkoutApt: apt }))
      const dataUser = { ...data, courses, checkoutApt: apt, price: total }

      localStorage.setItem('userDataPayment', JSON.stringify(dataUser))
    } else {
      setAllData(data)
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual',
          })
        }
      }
    }
  }

  useEffect(() => {
    setValue('checkoutCity', state.city, { shouldDirty: true })
    setValue('checkoutZipcode', state.zip_code, { shouldDirty: true })
    setValue('checkoutState', state.state, { shouldDirty: true })
    setValue('checkoutAddress', state.street_address, { shouldDirty: true })
    // setValue("checkoutApt", apt, { shouldDirty: true })
  }, [state, allData, apt])

  const second = useWatch({
    control,
    name: 'email',
  })

  useEffect(() => {
    // disCountda 2ta narsa kevoti
    setTotal(
      disCount ? Number(TotalApi) - (Number(store.disCount.data) * disCount.length) / 2 : TotalApi
    )
    // setTotal(
    //   total * Number(store.coupon.discount_amount / 100)
    // )
  }, [store.coupon, TotalApi, disCount, store.disCount])

  useEffect(() => {
    if (store.coupon.discount_amount) {
      const total1 = disCount
        ? Number(TotalApi) -
          (Number(store.disCount.data) * disCount.length) / 2 -
          (store.coupon.discount_amount ?? 0)
        : Number(TotalApi) - (store.coupon.discount_amount ?? 0)
      setTotal(total1)
    }
  }, [store.coupon, disCount, TotalApi])

  useEffect(() => {
    if (getUserDataPayment) {
      setValue('checkoutCity', getUserDataPayment.checkoutCity, { shouldDirty: true })
      setValue('checkoutZipcode', getUserDataPayment.checkoutZipcode, { shouldDirty: true })
      setValue('checkoutState', getUserDataPayment.checkoutState, { shouldDirty: true })
      setValue('checkoutAddress', getUserDataPayment.checkoutAddress, { shouldDirty: true })
      setValue('first_name', getUserDataPayment.first_name, { shouldDirty: true })
      setValue('phone', getUserDataPayment.phone, { shouldDirty: true })
      // setValue("checkoutApt", getUserDataPayment.checkoutApt, { shouldDirty: true })
      setValue('last_name', getUserDataPayment.last_name, { shouldDirty: true })
      setValue('checkoutZipcode', getUserDataPayment.checkoutZipcode, { shouldDirty: true })
      setValue('email', getUserDataPayment.email, { shouldDirty: true })
      setApt(getUserDataPayment.checkoutApt)
    }
  }, [])

  const onChangeEmailInput = async () => {
    await axios
      .post('https://admin.smartstartnow.com/api/check-email', {
        email: second,
        // course_semester_ids: courses
      })
      .then(res => {
        if (res.status === 200) {
          setCheckEmail(false)
        }
      })
      .catch(() => setCheckEmail(true))
  }

  useEffect(() => {
    if (second.includes('@') && second.includes('.')) {
      onChangeEmailInput()
    }
    if (!second) {
      setCheckEmail(false)
    }
  }, [second])

  return (
    <Form className='list-view product-checkout' onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader className='flex-column align-items-start'>
          <CardTitle tag='h4'>Add your information</CardTitle>
          <CardText className='text-muted mt-25'>
            Please enter all the information required
          </CardText>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md='6' sm='12'>
              <div className='mb-2'>
                <Label className='form-label' for='first_name'>
                  First Name:
                </Label>
                <Controller
                  control={control}
                  name='first_name'
                  render={({ field }) => (
                    <Input
                      id='first_name'
                      placeholder='John'
                      invalid={errors.first_name && true}
                      {...field}
                    />
                  )}
                />
              </div>
            </Col>
            <Col md='6' sm='12'>
              <div className='mb-2'>
                <Label className='form-label' for='last_name'>
                  Last Name:
                </Label>
                <Controller
                  control={control}
                  name='last_name'
                  render={({ field }) => (
                    <Input
                      type='text'
                      id='last_name'
                      placeholder='Doe'
                      invalid={errors.last_name && true}
                      {...field}
                    />
                  )}
                />
              </div>
            </Col>
            <Col md='6' sm='12'>
              <div className='mb-2'>
                <Label className='form-label' for='phone'>
                  Phone Number:
                </Label>
                <Controller
                  control={control}
                  name='phone'
                  render={({ field }) => (
                    <Input
                      type='number'
                      id='phone'
                      placeholder='123456789'
                      invalid={errors.phone && true}
                      {...field}
                    />
                  )}
                />
              </div>
            </Col>
            <Col md='6' sm='12'>
              <div className=''>
                <Label className='form-label' for='email'>
                  Email:
                </Label>
                <Controller
                  control={control}
                  name='email'
                  render={({ field }) => (
                    <Input
                      type='email'
                      id='email'
                      placeholder='example@gmail.com'
                      invalid={errors.email && true}
                      disabled={getUserData}
                      {...field}
                    />
                  )}
                />
                <span
                  className={`${checkEmail && !getUserData ? 'd-block' : 'd-none'} text-danger`}
                >
                  This Email Already sign in
                </span>
              </div>
            </Col>
            <Col md='9' sm='12'>
              <div className='mb-2'>
                <Label className='form-label' for='checkoutAddress'>
                  Address:
                </Label>
                <Controller
                  control={control}
                  name='checkoutAddress'
                  render={({ field }) => (
                    <Input
                      id='checkoutAddress'
                      placeholder='Your Address'
                      invalid={errors.last_name && true}
                      {...field}
                    />
                  )}
                />
              </div>
            </Col>
            <Col md='3' sm='12'>
              <div className='mb-2'>
                <Label className='form-label' for='checkoutApt'>
                  Apt/House:
                </Label>
                {/* <Controller
                  control={control}
                  name="checkoutApt"
                  render={({field}) => ( */}
                <Input
                  id='checkoutApt'
                  placeholder='Apt(optional)'
                  // invalid={errors.checkoutApt && true}
                  onChange={e => setApt(e.target.value)}
                  value={apt}
                  // {...field}
                />
                {/* )}
                /> */}
              </div>
            </Col>
            <Col md='6' sm='12'>
              <div className='mb-2'>
                <Label className='form-label' for='checkoutCity'>
                  Town/City:
                </Label>
                <Controller
                  control={control}
                  name='checkoutCity'
                  render={({ field }) => (
                    <Input
                      id='checkoutCity'
                      placeholder='Los Angeles'
                      invalid={errors.checkoutCity && true}
                      {...field}
                    />
                  )}
                />
              </div>
            </Col>
            <Col md='3' sm='12'>
              <div className='mb-2'>
                <Label className='form-label' for='checkoutState'>
                  State:
                </Label>
                <Controller
                  control={control}
                  name='checkoutState'
                  render={({ field }) => (
                    <Input
                      type='text'
                      id='checkoutState'
                      placeholder='NY'
                      invalid={errors.checkoutState && true}
                      {...field}
                    />
                  )}
                />
              </div>
            </Col>
            <Col md='3' sm='12'>
              <div className='mb-2'>
                <Label className='form-label' for='checkoutZipcode'>
                  Zip code:
                </Label>
                <Controller
                  control={control}
                  name='checkoutZipcode'
                  render={({ field }) => (
                    <Input
                      type='number'
                      id='checkoutZipcode'
                      placeholder='201301'
                      invalid={errors.checkoutZipcode && true}
                      {...field}
                    />
                  )}
                />
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <div className='customer-card'>
        <Card>
          <CardHeader>
            <CardTitle tag='h4' className='mt-1'>
              Price Details
            </CardTitle>
            {/* <div className='w-100'>
              <span className='text-danger'>Have Discount Coupon? Enter it here</span>
              <div className='input-group  text-start border-bottom w-100'>
                <Input
                  type='text'
                  className='form-control'
                  value={coupon}
                  onChange={e => setCoupon(e.target.value)}
                  style={{ border: 'none' }}
                  placeholder='Enter coupon'
                />
                <Button
                  type='btn'
                  color='transparent'
                  className='text-end'
                  onClick={e => CouponCheck(e)}
                  style={{ color: '#0A3161' }}
                >
                  Apply
                </Button>
              </div>
              {!store.coupon && (
                <span className='text-danger'>
                  The coupon code entered is not valid for this course.
                </span>
              )}
            </div> */}
            <Coupon coupon={coupon} setCoupon={setCoupon} store={store} CouponCheck={CouponCheck} />
          </CardHeader>
          <CardBody>
            {data.map((item, index) => {
              return (
                <Row key={index} className='w-100 d-flex justify-content-between mx-0'>
                  <Col md='6' className='px-0'>
                    <h6 className='cart-item-title'>
                      <Link className='text-body' to={`/course/${item?.slug}`}>
                        {item?.name || item?.course_name}
                      </Link>
                    </h6>
                  </Col>
                  <Col md='3' className=''>
                    <span>{item.semester_name || item?.allSemester?.name}</span>
                  </Col>
                  <Col md='3' className='text-start d-flex justify-content-end px-0'>
                    <h5 className=''>
                      $
                      {disCount.find(el => {
                        return (
                          el.id === (item.course_id || item.id) &&
                          (item.day_id === el.day || item?.allSemester?.day === el.day) &&
                          (item.semester_name || item?.allSemester?.semester) === el.semester
                        )
                      })
                        ? disCount.find(el => {
                            return (
                              el.id === (item.course_id || item.id) &&
                              (item.day_id === el.day || item?.allSemester?.day === el.day) &&
                              (item.semester_name || item?.allSemester?.semester) === el.semester
                            )
                          })?.price - Number(store.disCount.data / 2)
                        : Number(item?.allSemester?.price) ||
                          Number(item?.lesson_count * item?.per_day_price)}
                      {/* ${item?.allSemester?.semester === "Summer" || item?.semester_name === "Summer" ? ( Number(item?.allSemester?.price) || Number(item?.lesson_count * item?.per_day_price)) : (disCount.includes((item?.course_id || item?.id)) ? (Number(item?.allSemester?.price) - Number(store.disCount?.data / 2) || Number(item?.lesson_count * item?.per_day_price) - Number(store?.disCount?.data / 2)) : Number(item?.allSemester?.price) || Number(item?.lesson_count * item?.per_day_price)) } */}
                      {/* ${disCount.includes(item.course_id || item.id) ? (Number(item?.allSemester?.price) - Number(store.disCount.data / 2) || Number(item.lesson_count * item.per_day_price) - Number(store.disCount.data / 2)) : Number(item?.allSemester?.price) || Number(item.lesson_count * item.per_day_price)} */}
                    </h5>{' '}
                  </Col>
                </Row>
              )
            })}
            <Row className='w-100 d-flex justify-content-between mx-0'>
              <Col md='6' className='px-0'>
                <h6
                  className='cart-item-title text-danger'
                  style={{
                    display: store?.coupon?.discount_amount && !store?.client_secret_error ? 'block' : 'none',
                  }}
                >
                  Coupon discount:
                </h6>
              </Col>

              <Col md='6' className='text-end d-flex justify-content-end px-0'>
                <h5
                  style={{
                    display: store?.coupon?.discount_amount && !store?.client_secret_error ? 'block' : 'none',
                  }}
                  className='text-danger'
                >
                  {/* -${totalWithDisCount} */}
                  {/* -${total} */}
                  -${store?.coupon?.discount_amount}
                </h5>{' '}
              </Col>
            </Row>
            <hr />
            {disCount && (
              <div className='d-flex justify-content-between text-danger'>
                <div className='details-title d-block'>Discount: (School Academic)</div>
                <div>
                  -$
                  {TotalApi -
                    total -
                    (Object.keys(store.coupon).length ? store?.coupon?.discount_amount : 0)}
                </div>
                {/* <strong> ${totalWithDisCount ? sum - totalWithDisCount : sum}</strong> */}
              </div>
            )}
            <div className='d-flex justify-content-between'>
              <div className='details-title d-block'>Total:</div>
              {/* <strong> ${totalWithDisCount ? sum - totalWithDisCount : sum}</strong> */}
              {/* <strong>${ disCount ? (Number(TotalApi) - ((Number(store.disCount.data) * disCount.length) / 2)) - (store.coupon.discount_amount ?? 0) : TotalApi }</strong> */}
              {/* <strong>${ disCount ? total : TotalApi }</strong> */}
              <strong>${disCount ? total : TotalApi}</strong>
            </div>
            <Button
              block
              type='submit'
              color='primary'
              disabled={!data.length}
              // onClick={() => onSubmit()}
              className='btn-next delivery-address mt-2'
            >
              Proceed
            </Button>
          </CardBody>
        </Card>
      </div>
    </Form>
  )
}

export default Address
