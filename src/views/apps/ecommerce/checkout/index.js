// ** React Imports
import { useEffect, useRef, useState } from 'react'

// ** Custom Components
import Wizard from '@components/wizard'
import BreadCrumbs from '@components/breadcrumbs'

// ** Steps
import Cart from './steps/Cart'
import Address from './steps/Address'
import Payment from './steps/Payment'

// ** Third Party Components
import { ShoppingCart, Home, CreditCard } from 'react-feather'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getCartItems, deleteWishlistItem, addToWishlist, getCoupon } from '../store'

// ** Styles
import '@styles/base/pages/app-ecommerce.scss'

const Checkout = () => {
  // ** Ref & State
  const ref = useRef(null)
  const [stepper, setStepper] = useState(null)
  const dispatch = useDispatch()
  const store = useSelector(state => state.ecommerce)
  const [tokenData, setTokenData] = useState('')
  const [disCount, setDisCount] = useState([])
  const [paymentToken, setPaymentToken] = useState('')
  const [coupon, setCoupon] = useState('')
  const token = JSON.parse(localStorage.getItem('userData'))
  const data = token ? store.cart : store.cartState
  const [total, setTotal] = useState(0)
  let [price, setPrice] = useState(0)

  // ** Store Vars
  const findDuplicates = data2 => {
    const output = []
    Object.values(
      data2.reduce((res, obj) => {
        if (obj?.allSemester?.semester) {
          // for nologin
          const key = obj?.allSemester?.semester !== 'Summer' && obj.id && !obj.allSemester?.bundle

          res[key] = [
            ...(res[key] || []),
            {
              id: obj.id,
              day: obj?.allSemester.day,
              semester: obj.allSemester.semester,
              price: obj.allSemester.price,
              course_name: obj?.name,
            },
          ]
          return res
        } else if (obj.semester_name) {
          // for login
          const key =
            obj.semester_name !== 'Summer' && (obj.course_id || obj.id) && obj.bundle === false
          res[key] = [
            ...(res[key] || []),
            {
              id: obj.course_id,
              day: obj?.day_id,
              semester: obj.semester_name,
              price: Number(obj?.lesson_count * obj?.per_day_price),
              course_name: obj?.course_name,
            },
          ]
          return res
        }
      }, {})
    ).forEach(res => {
      if (res.length > 1) {
        output.push(...res)
      }
    })
    // const lookup = output.reduce((a, e) => {
    //   console.log('a', a, e)
    //   a[e.day] = ++a[e.day] || 0
    //   console.log(a)
    //   return a
    // }, {})
    let lookup = []
    output.map(course => {
      if (
        output.find(
          item =>
            item.id === course.id && item.day === course.day && item.semester !== course.semester
        )
      )
        lookup.push(course)
    })
    return lookup
  }

  useEffect(() => {
    dispatch(getCartItems())
  }, [])

  useEffect(() => {
    setDisCount(findDuplicates(data))
  }, [store.cart, store.cartState])

  useEffect(() => {
    if (disCount.length) {
      disCount.map(item => (price += item.price))
      setPrice(price)
    }
  }, [disCount])

  let TotalApi = 0
  data.map(item => {
    if (token) TotalApi += Number(item.lesson_count * item.per_day_price)
    else TotalApi += Number(item.allSemester.price)
  })

  const CouponCheck = e => {
    e.preventDefault()
    dispatch(getCoupon(coupon))
    // setcheckEmailText(true)
  }

  const steps = [
    {
      id: 'Address',
      title: 'Address',
      subtitle: 'Enter Your Address',
      icon: <Home size={18} />,
      content: (
        <Address
          stepper={stepper}
          setPaymentToken={setPaymentToken}
          price={price}
          disCount={disCount}
          total={total}
          setTotal={setTotal}
          coupon={coupon}
          setCoupon={setCoupon}
          CouponCheck={CouponCheck}
          TotalApi={TotalApi}
        />
      ),
    },
    {
      id: 'cart',
      title: 'Cart',
      subtitle: 'Your Cart Items',
      icon: <ShoppingCart size={18} />,
      content: (
        <Cart
          tokenData={tokenData}
          stepper={stepper}
          dispatch={dispatch}
          products={store.cart}
          getCartItems={getCartItems}
          addToWishlist={addToWishlist}
          deleteWishlistItem={deleteWishlistItem}
          paymentToken={paymentToken}
          disCount={disCount}
          total={total}
          TotalApi={TotalApi}
        />
      ),
    },
    {
      id: 'payment',
      title: 'Payment',
      subtitle: 'Select Payment Method',
      icon: <CreditCard size={18} />,
      content: (
        <Payment
          stepper={stepper}
          setTokenData={setTokenData}
          paymentToken={paymentToken}
          disCount={disCount}
          total={total}
          coupon={coupon}
          setCoupon={setCoupon}
          CouponCheck={CouponCheck}
          TotalApi={TotalApi}
        />
      ),
    },
  ]

  return (
    <div className='container-xxl p-5'>
      {/* <BreadCrumbs title='Checkout' data={[{ title: 'eCommerce' }, { title: 'Checkout' }]} /> */}
      <Wizard
        ref={ref}
        steps={steps}
        className='checkout-tab-steps'
        instance={el => setStepper(el)}
        options={{ linear: false }}
      />
      {/* <Wizard instance={el => setStepper(el)} ref={ref} steps={steps} /> */}
    </div>
  )
}

export default Checkout
