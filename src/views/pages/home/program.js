import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, Col } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import {  getProgram } from '../../apps/ecommerce/store'
import Carousel from 'react-multi-carousel'

export default function Program() {
  const dispatch = useDispatch()
  const baseURl = 'https://admin.smartstartnow.com/'
  // const defaultImg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTuqauuQdqRi3DueozGBXXNI2dokaMpoE5Tw&usqp=CAU"
  const store = useSelector(state => state.ecommerce)

  useEffect(() => {
    dispatch(
      getProgram({
        q: '',
        sortBy: 'featured',
        perPage: 9,
        page: 1
      })
    )
   
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
      <h1 className='text-end text-primary'>Our Education</h1>

      <div className='row'>
        <Carousel
          responsive={responsive}
          autoPlay
          infinite
          autoPlaySpeed={5000}
          customTransition="all 800ms linear"
        >
          {store.dataProgram.map((item, index) => {
            return (
              <Col
                lg='11'
                md='11'
                sm='9'
                key={index}
                onClick={() => localStorage.setItem('program', item?.id)}
              >
                   <h1
                      className='text-center text-white py-1 mb-0 bg-danger d-flex justify-content-center align-items-center'
                      style={{minHeight:"100px"}}
                    >
                      {item?.name}
                    </h1>
                <Link to={`/courses`}>
                  <Card className='ecommerce-card ' key={item.name}>
                    {/* <h1
              className="text-center text-white py-1 mb-0"
              style={{ background: "#0A3161" }}
            >
            {item.name}
            </h1> */}
                    <div className='item-img text-center '>
                      <img
                        className='w-100   card-img-top rounded-0 '
                        src={`${baseURl}api/file/${item.image}`}
                        alt={item.name}
                        height={300}
                      />
                    </div>
                    {/* <div>
                      <h1 className='text-center my-2'>{item.name}</h1>
                    </div> */}
                  </Card>
                </Link>
              </Col>
            )
          })}
        </Carousel>
      </div>
    </div>
  )
}
