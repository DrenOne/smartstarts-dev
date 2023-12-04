import React from 'react'
import { Card, CardBody, CardFooter, Col, Row } from 'reactstrap'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'
import { Autoplay, Pagination, Grid } from 'swiper'

import '@styles/react/libs/swiper/swiper.scss'

const Carousel = () => {
  return (
    <Swiper
      pagination={{ clickable: true }}
      loop={true}
      spaceBetween={30}
      // autoplay={{ delay: 2000, disableOnInteraction: false }}
      modules={[Pagination, Autoplay, Grid]}
    >
      {[...new Array(3)].map((_, index) => (
        <SwiperSlide key={index}>
          <Row className='mb-3'>
            {[
              {
                body: 'Alex James',
                footerH4: 'Course: Math Grade 3',
                footerP: 'Feedback: Amazing Teachers, great work'
              },
              {
                body: 'Jamie Smith',
                footerH4: 'Course: Math Grade 3',
                footerP: 'Feedback: Amazing Teachers, great work'
              }
            ].map((item, index) => (
              <Col md='6' key={index}>
                <Card>
                  <CardBody>{item.body}</CardBody>
                  <CardFooter className='dark-layout'>
                    <h4 className='text-dark'>
                      {item.footerH4}
                    </h4>
                    <p>{item.footerP}</p>
                  </CardFooter>
                </Card>
              </Col>
            ))}
          </Row>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Carousel
