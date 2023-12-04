import { Fragment } from 'react'
import { Info } from 'react-feather'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody } from 'reactstrap'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { ProductSkeleton } from '../shop/Products'

const RecomendedCourses = () => {
  const { data, productDetail, isLoading } = useSelector(state => state.ecommerce)
  const baseURl = 'https://admin.smartstartnow.com/'
  const CartBtnTag = data.isInCart ? Link : 'button'
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { min: 1200, max: 4000 },
      items: 4,
      partialVisibilityGutter: 40,
    },
    desktop: {
      breakpoint: { max: 1199, min: 992 },
      items: 3,
      partialVisibilityGutter: 30,
    },
    tablet: {
      breakpoint: { max: 991, min: 576 },
      items: 2,
      partialVisibilityGutter: 20,
    },
    mobile: {
      breakpoint: { max: 575, min: 0 },
      items: 1,
      partialVisibilityGutter: 10,
    },
  }

  return isLoading ? (
    <ProductSkeleton />
  ) : data?.data?.length ? (
    <Fragment>
      <h3 className='my-2'>Recommended Courses</h3>
      <Carousel responsive={responsive} showDots={false} arrows={false} infinite={true}>
        {data?.data
          ?.filter(rC => rC.id !== productDetail.id)
          .map((recommendedCourse, index) => (
            <Card className='ecommerce-card rounded overflow-hidden h-100 w-80' key={index}>
              <div className='item-img text-center' onClick={() => window.scrollTo(0, 0)}>
                <Link to={`/course/${recommendedCourse.slug}`}>
                  <img
                    className='img-fluid mx-auto d-block'
                    src={`${baseURl}api/file/${recommendedCourse.image}`}
                    alt={recommendedCourse.name}
                    style={{ height: 230, width: 350, overflow: 'hidden' }}
                  />
                </Link>
              </div>
              <CardBody>
                <h5 onClick={() => window.scrollTo(0, 0)}>
                  <Link className='text-body item-name' to={`/course/${recommendedCourse.slug}`}>
                    {recommendedCourse.name} (
                    {recommendedCourse.semesters?.map(el => el.start_date.slice(0, 4))[0]} -{' '}
                    {recommendedCourse.semesters?.map(el => el.start_date.slice(0, 4))[1]})
                  </Link>
                  {/* <span className='d-block' style={{fontSize:"15px"}}>Term: </span> */}
                </h5>
              </CardBody>
              <div className='item-options text-center'>
                <div className='item-wrapper'></div>
                <div className='d-flex flex-xl-row flex-lg-column flex-sm-row flex-column'>
                  <Link
                    to={`/course/${recommendedCourse.slug}`}
                    className='w-100'
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <Button
                      color='primary'
                      tag={CartBtnTag}
                      className='btn-cart move-cart w-100 rounded-0'
                      /*eslint-disable */
                      {...(true
                        ? {
                            to: `/course/${recommendedCourse.slug}`,
                          }
                        : {})}
                      /*eslint-enable */
                    >
                      <Info className='me-50' size={14} />
                      <span>Learn More</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
      </Carousel>
    </Fragment>
  ) : null
}

export default RecomendedCourses
