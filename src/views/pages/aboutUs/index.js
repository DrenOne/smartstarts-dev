import { Row } from 'reactstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import img from '@src/assets/images/slider/home_schooling.jpeg'
import sliderImage2 from '@src/assets/images/slider/slider1.jpeg'
import LeftPart from './leftPart'
import RigthPart from './rigthPart'
import AboutFooter from './aboutFooter'
import { Fragment, useEffect, useState } from 'react'
import { X } from 'react-feather'
import discount from '@src/assets/images/discount.jpg'

export default function index() {
  const location = useLocation()
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  const userDate = JSON.parse(localStorage.getItem('userData'))

  useEffect(() => {
    window.scrollTo(0, 940)
    if (window) {
      window.addEventListener('scroll', () => {
        if (window.pageYOffset >= 300) setVisible(true)
        else setVisible(false)
      })
    }
  }, [])

  useEffect(() => {
    if (userDate?.role === 'student' || userDate?.role === 'tutor') navigate('/schedule')
  }, [userDate])

  return (
    <Fragment>
      <img
        src={sliderImage2}
        width='100%'
        // style={{ height: 'calc(100vh - 115px)', objectFit: 'cover', objectPosition: '50% 18%' }}
        className='img-fluid object-fit mt-5 pt-1 pt-md-0 mt-md-0'
      />
      <div className='container-sm'>
        <Row className='m-2'>
          <LeftPart />
          <RigthPart />
        </Row>
      </div>
      {location.pathname === '/about' ? <AboutFooter /> : null}
      <div
        className={classNames('position-fixed end-0 mb-3 me-5 pe-3 animated', {
          'mb--100': !visible && isOpen,
          'bottom-0': visible && isOpen,
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
    </Fragment>
  )
}
