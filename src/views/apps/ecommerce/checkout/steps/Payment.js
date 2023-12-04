import { Link, useNavigate } from 'react-router-dom'
import {
  Row,
  Col,
  Form,
  Label,
  Input,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
} from 'reactstrap'
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { client_secret, client_secret_no_auth, payRegUser, payState, payCheckUser, getCartItems } from '../../store'
// import CardReactFormContainer, {} from 'card-react'
import './payment.scss'
import Coupon from './Coupon'
// import { paypalState } from "../../store"
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
let stripePromise = null
// const clientId = 'AQ_UI-FF0BHEv_2An0O4fxXgOBIX5kONsHbWMaRsEARPOCbpQYKhwd6u6naqhzdOb4AMkI_dLa9J-HA-'
// const clientId = 'Acnuc4cXmJB0j5pdqyO2IIsbNQDExcpMgJika86-Q6yJuthTkHtKdKnRyrNtf8EaqRaOBHsOEpDjbL4w'

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      // "pk_live_51JAf66IwURCp9SLVCIPCTFmuj7X648s3GM1FCveWz7CeNJPStTwHCBRL7JpyzzA0gsNtqEjbCZZd8dXRqwks4Zv400vwa5j0nL"
      // "pk_live_51LozkwGemDQKUyErcIljQiRuiasaZ1ozj9aSivLzuDzryZRteneDUglQPkkRvehZoKdPJW9Eyc68AuzRJqRa23PQ00tECuXMwL"
      // 'pk_test_51LozkwGemDQKUyErRC3fbbH1GjJaItIVK610ITlmZ7XGl9jXv1ZchZy8E5RXlibe8T9sLZa5mkKJfeQp0kAqhy2T00p3pqmfIV'
      'pk_test_51JAf66IwURCp9SLVC9lXV1pXPxlLRleD1VAdOOSi0hHlRA3SqoJRs85h6y14gFq28nvnXW8TcEWl06vd68fupcMC000xZTxyDW'
    )
  }
  return stripePromise
}

const CheckoutForm = ({ coupon }) => {
  const stripe = useStripe()
  const elements = useElements()
  const store = useSelector(state => state.ecommerce)
  const [message, setMessage] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const dispatch = useDispatch()
  const token = JSON.parse(localStorage.getItem('userData'))
  const getUser = JSON.parse(localStorage.getItem('userDataPayment'))
  const navigate = useNavigate()
  const handleSubmit = async e => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }
    setIsProcessing(true)

    const { error, setupIntent } = await stripe.confirmCardSetup(store.client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (error) {
      setMessage(error.message)
    } else {
      dispatch(
        payCheckUser({
          ...getUser,
          coupon: Object.keys(store.coupon).length ? coupon : '',
          payment_id: setupIntent.payment_method,
        })
      ).then(res => {
        if (res.meta.requestStatus === 'fulfilled') {
          setTimeout(() => {
            dispatch(getCartItems())
          }, 3000)
          navigate(`/apps/ecommerce/checkout/successPayment`)
        }
      })
    }

    setIsProcessing(false)
  }

  return (
    <form id='payment-form' onClick={handleSubmit}>
      <CardElement id='payment-element' />
      <button disabled={isProcessing || !stripe || !elements} id='submit' style={{ backgroundColor: '#0a3161' }}>
        <span id='button-text'>{isProcessing ? 'Processing ... ' : 'Pay now'}</span>
      </button>
      {message && <div id='payment-message'>{message}</div>}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <img src="https://cdn.shopify.com/s/files/1/0368/2874/1677/files/paypal-credit-card.png?v=1626664818" alt="PayPal Credit Card"  style={{ width: '300px', height: 'auto', paddingTop: '10px' }} />
    </div>
    </form>
  )
}

const Payment = ({ paymentToken, stepper, setTokenData, disCount, total, coupon, setCoupon, CouponCheck, TotalApi }) => {
  const dispatch = useDispatch()
  const [stripePromise, setStripePromise] = useState(getStripe())
  const [clientSecret, setClientSecret] = useState('')
  const getUserData = JSON.parse(localStorage.getItem('userData'))
  const userDataPayment = JSON.parse(localStorage.getItem('userDataPayment'))
  const store = useSelector(state => state.ecommerce)
  const data = getUserData ? store.cart : store.cartState
  const [stripeRes, setStripeRes] = useState(false)
  // const [paypalCheck, setPaypal] = useState(false)
  // const [visa, setVisa] = useState(false)
  // const [affirm, setAffirm] = useState(false)

  // let TotalApi = 0
  // data.map(item => {
  //   if (getUserData) TotalApi += Number(item.lesson_count * item.per_day_price)
  //   else TotalApi += Number(item.allSemester.price)
  // })

  const initialOptions = {
    'client-id': 'AQ_UI-FF0BHEv_2An0O4fxXgOBIX5kONsHbWMaRsEARPOCbpQYKhwd6u6naqhzdOb4AMkI_dLa9J-HA-',
    currency: 'USD',
    intent: 'capture',
    'data-client-token':
      'EKwLqxSobnlF54jxYUYDsfeP0GGRGhJhgpMceobRZQeL4zr84_545hz0q44QWK72YLBx7QJoH-vv5opi',
  }

  useEffect(() => {
    // paypal
    //   .Buttons({
    //     style: {
    //       layout: 'vertical',
    //       color: 'blue',
    //       shape: 'rect',
    //       label: 'paypal',
    //     },
    //     // Sets up the transaction when a payment button is clicked
    //     createOrder: (data, actions) => {
    //       setAffirm(false)
    //       setVisa(false)
    //       setPaypal(true)
    //       return actions.order.create({
    //         purchase_units: [
    //           {
    //             amount: {
    //               value: `${disCount ? total : TotalApi}`, // Can also reference a variable or function
    //             },
    //           },
    //         ],
    //       })
    //     },
    //     // Finalize the transaction after payer approval
    //     onApprove: (data, actions) => {
    //       setVisa(false)
    //       setPaypal(false)
    //       setAffirm(true)
    //       return actions.order.capture().then(function (orderData) {
    //         dispatch(paypalState({id: orderData.id, price: TotalApi}))
    //       })
    //     },
    //   })
    //   .render('#paypal-button-container')
    // paypal.Buttons({
    //   style: {
    //     layout:  'vertical',
    //     color:   'blue',
    //     shape:   'rect',
    //     label:   'checkout'
    //   },
    //   // createOrder when clicked
    //   createOrder: (data, actions) => {
    //     console.log(data)
    //     return actions.order.create(
    //     {
    //         purchase_units: [
    //           {
    //           amount: {
    //             value: '1.00'
    //           }
    //         }
    //       ]
    //       })
    //    },
    //   // Capture the Transaction
    //   onApprove: (data, actions) => {
    //     // Show a success message to the buyer
    //     console.log(data)
    //     console.log(actions)
    //   }
    // }).render('#paypal-button-container')
    // paypal.Messages({
    //   placement: 'payment',
    //   style: {
    //     layout: 'flex',
    //     ratio: '20x1'
    //   },
    //   amount: 100
    // }).render('#pp-message')
  }, [])

  const totalPrice = parseInt(disCount ? total : TotalApi)

  useEffect(() => {
    if (userDataPayment && totalPrice > 0 && stepper._currentIndex > 0 && !stripeRes) {
      if (getUserData) dispatch(client_secret({ ...userDataPayment, price: totalPrice, coupon: Object.keys(store.coupon).length ? coupon : '' }))
      else dispatch(client_secret_no_auth({ ...userDataPayment, price: totalPrice, coupon: Object.keys(store.coupon).length ? coupon : '' }))

      setStripeRes(true)
    }
  }, [userDataPayment, stepper?._currentIndex])

  useEffect(() => {
    if (store.client_secret_error && !Object.keys(store.coupon).length)
      dispatch(client_secret_no_auth({ ...userDataPayment, price: totalPrice, coupon: Object.keys(store.coupon).length ? coupon : '' }))
  }, [store.client_secret_error, store.coupon])

  useEffect(() => {
    if (store.client_secret) setClientSecret(store.client_secret)
  }, [store.client_secret])

  return (
    <Form className='list-view product-checkout' id='payment'>
      <div className='payment-type'>
        <Card>
          <CardHeader className='flex-column align-items-start'>
            <CardTitle tag='h4'>Payment options</CardTitle>
            <CardText className='text-muted mt-25'>
              Be sure to click on correct payment option
            </CardText>
          </CardHeader>
          <CardBody className='d-flex flex-column'>
            <div className='d-flex'>
              {/* <Input
            className="me-2"
            type="radio"
            name="pay"
            id="visa"
            onChange={() => {
              setAffirm(false)
              setPaypal(false)
              setVisa(true)
            }}
            checked={visa}/> */}
              <Label for='visa' className='w-100 border p-1 rounded'>
                <Col md='12'>
                  <h3 style={{ paddingBottom: 10, color: '#0A3161' }}>
                    Pay with credit card
                  </h3>
                  {/* <Elements stripe={getStripe()}>
                    <StripeForm
                      Usertoken={paymentToken}
                      stepper={stepper}
                      setTokenData={setTokenData}
                      disCount={disCount}
                      totalPrice={totalPrice}
                      coupon={coupon}
                      setVisa={setVisa}
                      setAffirm={setAffirm}
                      setPaypal={setPaypal}
                    />
                  </Elements> */}
                  {userDataPayment && clientSecret.length && stripePromise ? (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                      <CheckoutForm coupon={coupon} />
                    </Elements>
                  ) : <h3 className='text-danger'>Loading...</h3>}
                  {/*<CardReactFormContainer container='card-wrapper' formInputsNames={{
                    number: 'CCnumber',
                    expiry: 'CCexpiry',
                    cvc: 'CCcvc',
                  }} formatting={true}>
                    <form>
                      <input placeholder='Card number' type='text' name='CCnumber' />
                      <input placeholder='MM/YY' type='text' name='CCexpiry' />
                      <input placeholder='CVC' type='text' name='CCcvc' />
                    </form>
                  </CardReactFormContainer>
                <div id='card-wrapper'></div>*/}
                </Col>
              </Label>
            </div>
            {/* <div className='d-flex my-2'>
              <Input
            className="me-2"
            type="radio"
            name="pay"
            id="paypal"
            onChange={() => {
              setAffirm(false)
               setVisa(false)
              setPaypal(true)
            }}
            checked={paypalCheck}/> */}
            {/* <Label for='paypal' className='w-100 border p-1 rounded'>
                <Col md='6' id='paypal-button-container'>
                  <Elements stripe={getStripe()}>
                <StripeForm
                  Usertoken={paymentToken}
                  stepper={stepper}
                  setTokenData={setTokenData}
                  disCount={disCount}
                />
              </Elements> */}
            {/* <PayPalScriptProvider options={{ "client-id": "test" }}>
            <PayPalButtons style={{ layout: "horizontal" }} />
        </PayPalScriptProvider>
                </Col>
              </Label>
            </div> */}
            {/* <div className='d-flex'>
              <Input
            className="me-2"
            type="radio"
            name="pay"
            id="affirm"
            onChange={() => {
              setVisa(false)
              setPaypal(false)
              setAffirm(true)
            }}

            checked={affirm}/> */}
            {/* <<Label for='affirm' className='w-100 border p-1 rounded'>
                <Col md='6'>
                  Elements stripe={getStripe()}>
                <StripeForm
                  Usertoken={paymentToken}
                  stepper={stepper}
                  setTokenData={setTokenData}
                  disCount={disCount}
                />
              </Elements>
                  <Button
                    type='btn'
                    color='transparent'
                    size='large'
                    className='w-full'
                    onClick={e => CouponCheck(e)}
                  >
                    <img src={require('@src/assets/images/Affirm.jpg').default} alt='my image' />
                  </Button>
                </Col>
              </Label>
            </div> */}
          </CardBody>
        </Card>
      </div>
      <div className='amount-payable checkout-options'>
        <Card>
          <CardHeader>
            {/* <div className="w-100">
              <div class="input-group  text-start border-bottom w-100">
                <Input
                  type="text"
                  class="form-control "
                  onChange={(e) => setCoupon(e.target.value)}
                  style={{ border: "none" }}
                  placeholder="Enter Coupon"
                />
                <Button
                  type="btn"
                  color="transparent"
                  className="text-end"
                  onClick={(e) => CouponCheck(e)}
                  style={{ color: "#0A3161" }}
                >
                  Apply
                </Button>
              </div>
              {!store.coupon && (
                <span className="text-danger">
                  The coupon code entered is not valid for this course.
                </span>
              )}
            </div> */}
            <CardTitle tag='h4' className='mt-1'>
              Price Details
            </CardTitle>
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
                    <span>{item.semester_name || item.allSemester?.name}</span>
                  </Col>
                  <Col md='3' className='text-start d-flex justify-content-end px-0'>
                    <h5 className=''>
                      {/* ${disCount.includes(item.course_id || item.id) ? (Number(item?.allSemester?.price) - Number(store.disCount.data / 2) || Number(item.lesson_count * item.per_day_price) - Number(store.disCount.data / 2)) : Number(item?.allSemester?.price) || Number(item.lesson_count * item.per_day_price)} */}
                      {/* ${item?.allSemester?.semester === "Summer" || item?.semester_name === "Summer" ? ( Number(item?.allSemester?.price) || Number(item?.lesson_count * item?.per_day_price)) : (disCount.includes((item?.course_id || item?.id)) ? (Number(item?.allSemester?.price) - Number(store.disCount?.data / 2) || Number(item?.lesson_count * item?.per_day_price) - Number(store?.disCount?.data / 2)) : Number(item?.allSemester?.price) || Number(item?.lesson_count * item?.per_day_price)) } */}
                      $
                      {disCount.find(el => {
                        return (
                          el.id === (item.course_id || item.id) &&
                          (item.day_id === el.day || item?.allSemester?.day === el.day) &&
                          (item.semester_name || item.allSemester.semester) === el.semester
                        )
                      })
                        ? disCount.find(el => {
                            return (
                              el.id === (item.course_id || item.id) &&
                              (item.day_id === el.day || item?.allSemester?.day === el.day) &&
                              (item.semester_name || item.allSemester.semester) === el.semester
                            )
                          })?.price - Number(store.disCount.data / 2)
                        : Number(item?.allSemester?.price) ||
                          Number(item?.lesson_count * item?.per_day_price)}
                    </h5>
                  </Col>
                </Row>
              )
            })}
            <Row className='w-100 d-flex justify-content-between mx-0'>
              <Col md='6' className='px-0'>
                <h6
                  className='cart-item-title text-danger'
                  style={{
                    display: store.coupon.discount_amount && !store.client_secret_error ? 'block' : 'none',
                  }}
                >
                  Coupon discount
                </h6>
              </Col>

              <Col md='6' className='text-end d-flex justify-content-end px-0'>
                <h5
                  style={{
                    display: store.coupon.discount_amount && !store.client_secret_error ? 'block' : 'none',
                  }}
                  className='text-danger'
                >
                  {/* -${totalWithDisCount} */}
                  {/* -${total} */}
                  -${store.coupon.discount_amount}
                </h5>{' '}
              </Col>
            </Row>

            <hr />
            {disCount && (
              <div className='d-flex justify-content-between text-danger'>
                <div className='details-title d-block'>Discount: (School Academic)</div>
                <div>-${TotalApi - total - (Object.keys(store.coupon).length ? store.coupon.discount_amount : 0)}</div>
                {/* <strong> ${totalWithDisCount ? sum - totalWithDisCount : sum}</strong> */}
              </div>
            )}
            <div className='d-flex justify-content-between'>
              <div className='details-title d-block'>Total:</div>
              <strong>${disCount ? total : TotalApi}</strong>
              {/* <strong> ${totalWithDisCount ? sum - totalWithDisCount : sum}</strong> */}
            </div>
            {/* <Elements stripe={stripePromise}>
              <AffirmMessageElement
                options={{ amount: disCount ? total * 100 : TotalApi * 100, currency: 'USD' }}
              />
            </Elements> */}
          </CardBody>
        </Card>
      </div>
    </Form>
  )
}

export default Payment
