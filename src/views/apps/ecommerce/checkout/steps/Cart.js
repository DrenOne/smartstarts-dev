import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { checkout, deleteCourseCartItem, delToCartState
  // payRegUser,  payState
 } from "../../store"
// import axios from "axios"
import { X, Heart, Star } from "react-feather"
import {
  Card,
  CardBody,
  CardText,
  Button,
  Badge,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Spinner
} from "reactstrap"
import { useSelector } from "react-redux"
import classnames from "classnames"

// ** Third Party Components
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

// ** Styles
import "@styles/react/libs/input-number/input-number.scss"
import 'animate.css/animate.css'
import '@styles/base/plugins/extensions/ext-component-sweet-alerts.scss'
// import { spinnerTextAlignment } from "../../../../components/spinners/SpinnerSourceCode"
// import SpinnerTextAlignment from "../../../../components/spinners/SpinnerTextAlignment"
// import SpinnerTextAlignment from './SpinnerTextAlignment'
// import { spinnerTextAlignment} from './SpinnerSourceCode'
const Cart = (props) => {
  // ** Props
  const {
    products,
    dispatch,
    addToWishlist,
    deleteWishlistItem,
    getCartItems,
    // paymentToken,
    disCount,
    total,
    stepper,
    TotalApi,
  } = props

  const getUserData = JSON.parse(localStorage.getItem("userData"))
  // const [totalWithDisCount, setTotalWithDisCount] = useState(0)
  const baseURl = "https://admin.smartstartnow.com/"
  const store = useSelector((state) => state.ecommerce)
  // const [sum, setSum] = useState(0)
  const navigate = useNavigate()
  const data = getUserData ? store.cart : store.cartState

  const MySwal = withReactContent(Swal)

  const handleWishlistClick = (id, val) => {
    if (val) {
      dispatch(deleteWishlistItem(id))
    } else {
      dispatch(addToWishlist(id))
    }
    dispatch(getCartItems())
  }

  useEffect(() => {
    if (getUserData?.accessToken) dispatch(checkout(false))
    else dispatch(checkout(true))
  }, [])

  const del = (item) => {
    return MySwal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then(result => {
      if (result.value) {
        if (getUserData) {
          dispatch(deleteCourseCartItem(item.course_days_id))
          dispatch(getCartItems())
        } else {
          const newData = store.cartState.filter((el) => {
              if (el.allSemester.id !== item.allSemester.id) {
                return el
              }
          })
          dispatch(delToCartState(newData))

        }
        MySwal.fire({
          icon: 'success',
          title: 'Deleted!',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
      }
    })
  }

  let TotatApi = 0
  data.map((item) => {
    // TotatApi += Number(item.allSemester?.price || item.price)
    if (getUserData) TotatApi += Number(item.lesson_count * item.per_day_price)
    else TotatApi += Number(item.allSemester.price)
  })

  // useEffect(() => {
    // setSum(disCount ? Number(TotatApi) - (Number(store.disCount.data) * disCount.length / 2) : TotatApi)
    // setTotalWithDisCount(
    //   sum * Number(store.coupon.discount_amount / 100)
    // )
  // }, [store.coupon, TotatApi, disCount])

  const renderCart = () => {
    return data.map((item, index) => {
      return (
        <Card key={index} className="ecommerce-card">
          <div className="item-img">
            <Link to={`/course/${item.slug}`}>
              <img
                className=" rounded "
                src={`${baseURl}api/file/${item?.course_image || item?.image}`}
                alt={item?.name}
                width="62"
              />
            </Link>
          </div>
          <CardBody>
            <div className="item-name">
              <h6 className="mb-0">
                <Link to={`/course/${item.id}`}>
                  {item?.course_name || item.name}
                </Link>
              </h6>
              <span className="item-company">
                By
                <a
                  className="ms-25"
                  href="/"
                  onClick={(e) => e.preventDefault()}
                >
                  SmartStart
                </a>
              </span>
              <p>
                Semester:
                <span className="fw-bolder text-primary ">
                  <span> {item?.allSemester?.name || item.semester_name}</span>
                </span>
              </p>

              {/* <div className="item-rating">
                <ul className="unstyled-list list-inline">
                  {new Array(5).fill().map((listItem, index) => {
                    return (
                      <li key={index} className="ratings-list-item me-25">
                        <Star
                          className={classnames({
                            "filled-star": index + 1 <= item.rating,
                            "unfilled-star": index + 1 > item.rating
                          })}
                        />
                      </li>
                    )
                  })}
                </ul>
              </div> */}
            </div>
            <span className="text-success mb-1">In Stock</span>
            <div className="item-quantity"></div>
          </CardBody>
          <div className="item-options text-center">
            <div className="item-wrapper">
              <div className="item-cost">
                <h4 className="item-price">
                ${disCount.find(el => {
                        return el.id === (item.course_id || item.id) && (item.day_id === el.day || item?.allSemester?.day === el.day ) && (item.semester_name || item.allSemester.semester) === el.semester
                      }) ? disCount.find(el => {
                        return el.id === (item.course_id || item.id) && (item.day_id === el.day || item?.allSemester?.day === el.day ) && (item.semester_name || item.allSemester.semester) === el.semester
                      })?.price - Number(store.disCount.data / 2) : ( Number(item?.allSemester?.price) || Number(item?.lesson_count * item?.per_day_price))}

                  {/* ${item?.allSemester?.semester === "Summer" || item?.semester_name === "Summer" ? ( Number(item?.allSemester?.price) || Number(item?.lesson_count * item?.per_day_price)) : (disCount.includes((item?.course_id || item?.id)) ? (Number(item?.allSemester?.price) - Number(store.disCount?.data / 2) || Number(item?.lesson_count * item?.per_day_price) - Number(store?.disCount?.data / 2)) : Number(item?.allSemester?.price) || Number(item?.lesson_count * item?.per_day_price)) } */}

                  {/* ${disCount.includes(item.course_id || item.id) ? (Number(item?.allSemester?.price) - Number(store.disCount.data / 2) || Number(item.lesson_count * item.per_day_price) - Number(store.disCount.data / 2)) : Number(item?.allSemester?.price) || Number(item.lesson_count * item.per_day_price)} */}

                </h4>
                {item.hasFreeShipping ? (
                  <CardText className="shipping">
                    <Badge color="light-success" pill>
                      Free Shipping
                    </Badge>
                  </CardText>
                ) : null}
              </div>
            </div>
            <Button
              className="mt-1 remove-wishlist"
              color="light"
              onClick={() => del(item)}
            >
              <X size={14} className="me-25" />
              <span>Remove</span>
            </Button>
            <Button
              className="btn-cart"
              color="primary"
              onClick={() => handleWishlistClick(item.id, item.isInWishlist)}
            >
              <Heart
                size={14}
                className={classnames("me-25", {
                  "fill-current": item.isInWishlist
                })}
              />
              <span className="text-truncate">Wishlist</span>
            </Button>
          </div>
        </Card>
      )
    })
    // : store.cartState.map((item) => {
    //   return (
    //     <Card key={item.name} className="ecommerce-card">
    //       <div className="item-img">
    //         <Link to={`/course/${item.slug}`}>
    //           <img
    //             className="img-fluid"
    //             src={`${baseURl}api/file/${item.image}`}
    //             alt={item.name}
    //           />
    //         </Link>
    //       </div>
    //       <CardBody>
    //         <div className="item-name">
    //           <h6 className="mb-0">
    //             <Link to={`/course/${item.id}`}>
    //               {item.name}
    //             </Link>
    //           </h6>
    //           <span className="item-company">
    //             By
    //             <a
    //               className="ms-25"
    //               href="/"
    //               onClick={(e) => e.preventDefault()}
    //             >
    //               SmartStart
    //             </a>
    //           </span>
    //           <div className="item-rating">
    //             <ul className="unstyled-list list-inline">
    //               {new Array(5).fill().map((listItem, index) => {
    //                 return (
    //                   <li key={index} className="ratings-list-item me-25">
    //                     <Star
    //                       className={classnames({
    //                         "filled-star": index + 1 <= item.rating,
    //                         "unfilled-star": index + 1 > item.rating
    //                       })}
    //                     />
    //                   </li>
    //                 )
    //               })}
    //             </ul>
    //           </div>
    //         </div>
    //         <span className="text-success mb-1">In Stock</span>
    //         <div className="item-quantity">
    //           {/* <span className='quantity-title me-50'>Qty</span>
    //       <InputNumber
    //         min={1}
    //         max={10}
    //         upHandler={<Plus />}
    //         className='cart-input'
    //         defaultValue={item.qty}
    //         downHandler={<Minus />}
    //       /> */}
    //         </div>
    //         {/* <div className='delivery-date text-muted'>Delivery by, {formatDate(item.shippingDate)}</div> */}
    //         {/* <span className='text-success'>
    //       {item.discountPercentage}% off {item.offers} offers Available
    //     </span> */}
    //       </CardBody>
    //       <div className="item-options text-center">
    //         <div className="item-wrapper">
    //           <div className="item-cost">
    //             <h4 className="item-price">${item.sale_price}</h4>
    //             {item.hasFreeShipping ? (
    //               <CardText className="shipping">
    //                 <Badge color="light-success" pill>
    //                   Free Shipping
    //                 </Badge>
    //               </CardText>
    //             ) : null}
    //           </div>
    //         </div>
    //         <Button
    //           className="mt-1 remove-wishlist"
    //           color="light"
    //           onClick={() => del(item.id)}
    //         >
    //           <X size={14} className="me-25" />
    //           <span>Remove</span>
    //         </Button>
    //         <Button
    //           className="btn-cart"
    //           color="primary"
    //           onClick={() => handleWishlistClick(item.id, item.isInWishlist)}
    //         >
    //           <Heart
    //             size={14}
    //             className={classnames("me-25", {
    //               "fill-current": item.isInWishlist
    //             })}
    //           />
    //           <span className="text-truncate">Wishlist</span>
    //         </Button>
    //       </div>
    //     </Card>
    //   )
    // })
  }
  // const buyCourses = async () => {
  //   if (getUserData) {
  //     const AllData = {
  //       first_name: store.userRegData.first_name,
  //       last_name:store.userRegData.last_name,
  //       phone:store.userRegData.phone,
  //       token:props.tokenData,
  //       discount_code:store.coupon.code,
  //       address:store.userRegData.checkoutAddress,
  //       city:store.userRegData.checkoutCity,
  //       state:store.userRegData.checkoutState,
  //       zip_code:store.userRegData.checkoutZipcode,
  //       price:disCount ? total : TotatApi
  //     }
  //     dispatch(payRegUser(AllData))

  //   } else {
  //     const courses = store.cartState.map((el) => {
  //       return el.allSemester.id
  //     })

  //     const AllData = {
  //       first_name: store.userRegData.first_name,
  //       last_name:store.userRegData.last_name,
  //       phone:store.userRegData.phone,
  //       email:store.userRegData.email,
  //       course_day_ids: courses,
  //       token:props.tokenData,
  //       discount_code:store.coupon.code,
  //       address:store.userRegData.checkoutAddress,
  //       city:store.userRegData.checkoutCity,
  //       state:store.userRegData.checkoutState,
  //       zip_code:store.userRegData.checkoutZipcode,
  //       price:disCount ? total : TotatApi
  //     }

  //     dispatch(payState(AllData))
  //     dispatch(delToCartState([]))
  //   }
  // }
  useEffect(() => {
    if (store.payment === 'error') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      })
    } else if (store.payment) EnrolEnrol
  }, [store.payment])

  return (
    <div className="list-view product-checkout">
      <div className="checkout-items">
      {store.isLoading ? (
          <Row className='px-1 h-100 align-items-center'>
              <div className='text-center'>
                <Spinner color="primary" />
              </div>
          </Row>
        ) : (products?.length || store.cartState?.length) ? (
          renderCart()
        ) : (
          <h4>Your cart is empty</h4>
        )}
      </div>
      <div className="checkout-options">
        <Card>
          <CardHeader>
            <CardTitle tag="h4">Price Details</CardTitle>
          </CardHeader>
          <CardBody>
            {data.map((item, index) => {
              return (
                <Row
                  key={index}
                  className="w-100 d-flex justify-content-between mx-0"
                >
                  <Col md="6" className="px-0">
                    <h6 className="cart-item-title">
                      <Link
                        className="text-body"
                        to={`/course/${item?.slug}`}
                      >
                        {item?.name || item?.course_name}
                      </Link>
                    </h6>
                  </Col>
                  <Col md="3" className="">
                    <span>{item.semester_name || item.allSemester?.name}</span>
                  </Col>
                  <Col
                    md="3"
                    className="text-start d-flex justify-content-end px-0"
                  >
                    <h5 className="">
                    ${disCount.find(el => {
                        return el.id === (item.course_id || item.id) && (item.day_id === el.day || item?.allSemester?.day === el.day ) && (item.semester_name || item.allSemester.semester) === el.semester
                      }) ? disCount.find(el => {
                        return el.id === (item.course_id || item.id) && (item.day_id === el.day || item?.allSemester?.day === el.day ) && (item.semester_name || item.allSemester.semester) === el.semester
                      })?.price - Number(store.disCount.data / 2) : ( Number(item?.allSemester?.price) || Number(item?.lesson_count * item?.per_day_price))}

                    {/* ${item?.allSemester?.semester === "Summer" || item?.semester_name === "Summer" ? ( Number(item?.allSemester?.price) || Number(item?.lesson_count * item?.per_day_price)) : (disCount.includes((item?.course_id || item?.id)) ? (Number(item?.allSemester?.price) - Number(store.disCount?.data / 2) || Number(item?.lesson_count * item?.per_day_price) - Number(store?.disCount?.data / 2)) : Number(item?.allSemester?.price) || Number(item?.lesson_count * item?.per_day_price)) } */}

                    {/* ${disCount.includes(item.course_id || item.id) ? (Number(item?.allSemester?.price) - Number(store.disCount.data / 2) || Number(item.lesson_count * item.per_day_price) - Number(store.disCount.data / 2)) : Number(item?.allSemester?.price) || Number(item.lesson_count * item.per_day_price)} */}
                    </h5>
                  </Col>
                </Row>
              )
            })}
           <Row className="w-100 d-flex justify-content-between mx-0">
              <Col md="6" className="px-0">
                <h6
                  className="cart-item-title text-danger"
                  style={{
                    display: store.coupon.discount_amount && !store.client_secret_error ? "block" : "none"
                  }}
                >
                  Coupon discount
                </h6>
              </Col>

              <Col md="6" className="text-end d-flex justify-content-end px-0">
                <h5
                  style={{
                    display: store.coupon.discount_amount && !store.client_secret_error ? "block" : "none"
                  }}
                  className="text-danger"
                >
                  {/* -${totalWithDisCount} */}
                  {/* -${total} */}
                  -${store.coupon.discount_amount}
                </h5>{" "}
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
            <div className="d-flex justify-content-between">
              <div className="details-title d-block">Total:</div>
               {/* <strong>${totalWithDisCount ? sum - totalWithDisCount : sum}</strong> */}
               <strong>${ disCount ? total : TotatApi }</strong>
            </div>
            <Button
              block
              type="submit"
              color="primary"
              disabled={!data.length}
              onClick={() => stepper.next()}
              className="btn-next delivery-address mt-2"
            >
              Proceed
            </Button>
          </CardBody>
        </Card>
        {/* <Button
          block
          color="primary"
          // onClick={() => buyCourses()}
          classnames="btn-next place-order"
        >
          Pay
        </Button> */}
        {/* <Link to="/login">
                <Button
                  block
                  color='primary'
                  disabled={!products.length}
                  onClick={() => buyCourses()}
                  classnames='btn-next place-order'
                >
                  Place Order
                </Button>
              </Link> */}
      </div>
    </div>
  )
}

export default Cart
