import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import ProductCards from '../../apps/ecommerce/shop/ProductCards'
import { Card, CardBody, CardText, Button, Row, Col } from 'reactstrap'
import { X } from 'react-feather'
// import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { getProducts } from '../../apps/ecommerce/store'
import classNames from 'classnames'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import PillsVertical from '../../components/tabPills/PillsVertical'
import discount from '@src/assets/images/discount.jpg'

export default function TopCourses() {
  const dispatch = useDispatch()
  // ** State
  const [visible, setVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  const baseURl = 'https://admin.smartstartnow.com/'
  const defaultImg =
    'https://img.freepik.com/premium-vector/cartoon-math-chalkboard-background_23-2148154590.jpg?w=2000'

  const store = useSelector(state => state.ecommerce)

  useEffect(() => {
    if (window) {
      window.addEventListener('scroll', () => {
        if (window.pageYOffset >= 300) setVisible(true)
        else setVisible(false)
      })
    }
  }, [])

  useEffect(() => {
    dispatch(getProducts())
    // dispatch(getCartItems())
  }, [dispatch])

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  }

  return (
    <div className='container-xxl text-body p-5'>
      <div className='d-flex justify-content-end'>
        {/* <h1>Top Courses</h1> */}
        <h1 className='text-primary text-end'>
          Interested to see other Courses? Please click{' '}
          <Link
            to='/courses'
            onClick={() => {
              localStorage.removeItem('grade')
              localStorage.removeItem('program')
            }}
            className='fst-italic text-decoration-underline'
          >
            Here.
          </Link>
        </h1>
      </div>

      <Row>
        {store?.data?.data?.length && (
          <Carousel
            responsive={responsive}
            autoPlay
            infinite
            autoPlaySpeed={5000}
            customTransition='all 800ms linear'
          >
            {store?.data?.data?.map((item, index) => {
              return (
                <Col
                  lg='11'
                  md='11'
                  sm='9'
                  key={index}
                  //                 onClick={() => localStorage.setItem('grade', item?.id)}
                  // =======m
                  onClick={() => localStorage.setItem('grade', item?.grade_id)}
                >
                  <Link to='/courses'>
                    <Card className='ecommerce-card ' key={item?.name}>
                      <h1
                        className='text-center text-white py-1 mb-0 bg-danger d-flex justify-content-center align-items-center'
                        style={{ minHeight: '100px' }}
                      >
                        {item?.name}
                      </h1>
                      <div className='item-img text-center  '>
                        <img
                          className='img-fluid mx-auto d-block carouselContainerLazy '
                          src={item.image ? `${baseURl}api/file/${item.image}` : defaultImg}
                          alt={item?.name}
                          style={{ height: 230, width: 350, overflow: 'hidden' }}
                        />
                      </div>

                      <div className='item-options text-center my-2'>
                        {/* <div className="item-wrapper"> */}
                        {/* <div className="item-cost">
                    <h4 className="item-price">${item.price}</h4>
                    {item.hasFreeShipping ? (
                      <CardText className="shipping">
                        <Badge color="light-success">Free Shipping</Badge>
                      </CardText>
                    ) : null}
                  </div> */}
                        {/* </div> */}
                        <div className='d-flex justify-content-center'>
                          <h1 className='text-danger'>Click to Learn More</h1>
                          {/* <Link to={`/course/${item.id}`}>
              <Button
                        color="danger"
                        tag={CartBtnTag}
                        className="btn-cart move-car/t"
                        onClick={() => handleCartBtn(item.id, item.isInCart)}
                        {...(item.isInCart
                          ? {
                              to: "/apps/ecommerce/checkout",
                            }
                          : {})}
                      >
                        <Info className="me-50" size={14} />
                        <span>More Info</span>
                      </Button>
              </Link>
                      */}
                        </div>

                        {/* <Button
                  className="btn-wishlist"
                  color="light"
                  onClick={() => handleWishlistClick(item.id, item.isInWishlist)}
                >
                  <Heart
                    className={classnames("me-50", {
                      "text-danger": item.isInWishlist
                    })}
                    size={14}
                  />
                  <span>Wishlist</span>
                </Button> */}
                      </div>
                    </Card>
                  </Link>
                </Col>
              )
            })}
          </Carousel>
        )}
      </Row>
      <Row>
        {/* <Col md="5" className='offset-7 d-flex justify-content-end '    >
        <a className='text-end' id="disCountImgHover">
          <img className='rounded scale-1'
          src="https://image.shutterstock.com/image-vector/100-coupon-promotion-sale-website-600w-2143351993.jpg" width="120" height="120"/>
          <h4 className='d-block mt-2 text-danger'>Discount for Full Academic Year</h4>
        </a>
      </Col> */}
      </Row>
      <br></br>
      {/* <h3 className='text-primary text-end'>The Best Educational Brand</h3> */}
      <h1 className='mb-2 text-danger mt-3'>Education Highlights</h1>
      <PillsVertical type={1} />
      <div
        className={classNames('position-fixed end-0 mb-3 me-5 pe-3 animated', {
          'mb--100': !visible && isOpen,
          'bottom-0': visible && isOpen
        })}
        style={{ zIndex: 99999 }}
      >
        <div className='w-100 text-end'>
          <X size={42} onClick={() => setIsOpen(false)} />
        </div>
        <div className='rounded border overflow-hidden'>
          <Link to='/courses'>
            <img src={discount} width={300} />
          </Link>
        </div>
      </div>
    </div>
  )
}
