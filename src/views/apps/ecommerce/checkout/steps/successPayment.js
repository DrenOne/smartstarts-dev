import { Fragment, useEffect, useMemo, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Row, Col, Card, Button } from 'reactstrap'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '@components/spinner/Loading-spinner'
import {
  addToCartState,
  changePayment,
  deleteCart,
  getCartItems,
  payCheckUser,
  successPaymentUrl,
} from '../../store'
import themeConfig from '@configs/themeConfig'

const useQuery = () => {
  const { search } = useLocation()

  return useMemo(() => new URLSearchParams(search), [search])
}

let stripePromise = null

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      // 'pk_test_51LozkwGemDQKUyErRC3fbbH1GjJaItIVK610ITlmZ7XGl9jXv1ZchZy8E5RXlibe8T9sLZa5mkKJfeQp0kAqhy2T00p3pqmfIV'
      'pk_test_51JAf66IwURCp9SLVC9lXV1pXPxlLRleD1VAdOOSi0hHlRA3SqoJRs85h6y14gFq28nvnXW8TcEWl06vd68fupcMC000xZTxyDW'
    )
  }
  return stripePromise
}

const SuccessPage = () => {
  const token = JSON.parse(localStorage.getItem('userData'))

  return (
    <div style={{ marginTop: '85px', marginLeft: 80, marginRight: 80 }}>
      <Row className='d-flex justify-content-center'>
        <Col md={{ size: 8, order: 1 }} xs={{ size: 12, order: 1 }}>
          <Card className='overflow-hidden'>
            <Row>
              <Col md='12'>
                <div className=' text-center'>
                  {/* <div className='d-flex justify-content-center'>
                    <img src={illustration} alt='illustration' height={400} />
                  </div> */}
                  <div className='w-100 h-100 mb-5' style={{ backgroundColor: '#0c3161' }}>
                    <img
                      className='img-fluid text-center w-50 h-100 d-none d-md-block mx-auto'
                      src={themeConfig.app.appLogoImage}
                      alt='illustration'
                    />
                  </div>
                  <h1 className='text-primary'>Payment successful!</h1>
                  <p style={{ display: token ? 'none' : 'block' }}>
                    The link has been sent to your email. Please enter your email and create a
                    password
                  </p>
                  <Row className='d-flex justify-content-center mb-5 mt-2'>
                    <Col md='3' className={token ? 'offset-0' : 'offset-3'}>
                      <Link to='/' className='text-white fs-10'>
                        <Button
                          color='primary'
                          className='btn-cart move-cart w-100 rounded-0'
                          to='/apps/ecommerce/checkout'
                        >
                          <span>Home page</span>
                        </Button>
                      </Link>
                    </Col>
                    <Col md='3'>
                      <Link
                        to='/dashboard/mycourse'
                        className='text-white fs-10'
                        style={{ display: token ? 'block' : 'none' }}
                      >
                        <Button
                          color='primary'
                          className='btn-cart move-cart w-100 rounded-0'
                          to='/dashboard/mycourse'
                        >
                          <span>My Dashboard</span>
                        </Button>
                      </Link>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

const SuccessPayment = () => {
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  const query = useQuery()
  const { payment } = useSelector(state => state.ecommerce)
  const token = JSON.parse(localStorage.getItem('userData'))
  const getUser = JSON.parse(localStorage.getItem('userDataPayment'))
  const dispatch = useDispatch()

  // useEffect(() => {
  //   if (!!query.get('payment_intent_client_secret')) {
  //     getStripe().then(async stripe => {
  //       const url = new URL(window.location)
  //       const clientSecret = url.searchParams.get('payment_intent_client_secret')
  //       const { error, paymentIntent } = await stripe.retrievePaymentIntent(clientSecret)

  //       console.log(paymentIntent)
  //       dispatch(
  //         payCheckUser({
  //           ...getUser,
  //           payment_id: paymentIntent.payment_method,
  //         })
  //       )
  //     })
  //   }
  // }, [query.get('payment_intent_client_secret')])

  useEffect(() => {
    if (payment) navigator('/apps/ecommerce/checkout/successPayment')
  }, [payment])

  useEffect(() => {
    dispatch(successPaymentUrl())
    dispatch(getCartItems())
    dispatch(addToCartState())
    dispatch(changePayment())
    dispatch(deleteCart())
    window.localStorage.removeItem('userDataPayment')
  }, [])

  useEffect(() => {
    if (!token) setLoading(false)
    else setLoading(true)
  }, [token])

  return (
    <Fragment>
      {!!!query.get('payment_intent_client_secret') ? (
        <SuccessPage />
      ) : !!query.get('payment_intent_client_secret') && payment ? (
        <SuccessPage />
      ) : (
        <div className='mt-5'>
          <Spinner />
        </div>
      )}
    </Fragment>
  )
}

export default SuccessPayment
