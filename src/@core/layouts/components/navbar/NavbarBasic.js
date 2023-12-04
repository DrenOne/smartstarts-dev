// ** Reactstrap Imports
import { Nav, NavItem } from 'reactstrap'
import { Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { refreshCart } from '../../../../views/apps/ecommerce/store'
import { useDispatch } from 'react-redux'

const NavbarBasic = ({ setIsOpen }) => {
  const location = useLocation()
  const course = JSON.parse(localStorage.getItem('course'))
  const dispatch = useDispatch()

  useEffect(() => {
    if (course) {
      dispatch(refreshCart(course))
    }
  })

  const links = [
    {
      name: 'Home',
      url: '/',
      props: {
        onClick: () => setIsOpen(false)
      }
    },
    {
      name: 'About Us',
      url: '/about',
      props: {
        onClick: () => setIsOpen(false)
      }
    },
    {
      name: 'Homeschooling',
      url: '/homeschooling',
      props: {
        onClick: () => setIsOpen(false)
      }
    },
    {
      name: 'Courses',
      url: '/courses',
      props: {
        onClick: () => {
          localStorage.removeItem('grade')
          localStorage.removeItem('program')
          setIsOpen(false)
        }
      }
    },
    {
      name: 'FAQs',
      url: '/FAQ',
      props: {
        onClick: () => setIsOpen(false)
      }
    },
    {
      name: 'Contact Us',
      url: '/contact',
      props: {
        onClick: () => setIsOpen(false)
      }
    }
  ]

  return (
    <Nav navbar className='bd-highlight flex-column flex-lg-row ms-lg-auto '>
      {links.map((link, index) => (
        <NavItem {...link?.props} key={index} className='mt-lg-0 mt-1 me-xl-2 me-0  '>
          <Link
            to={link.url}
            className={`nav-link me-3 fs-16 fs-md-15 ${
              link.url === location.pathname && 'fw-bold text-shadow-navbar'
            }`}
          >
            {link.name}
          </Link>
        </NavItem>
      ))}
      {/* <NavItem className='mt-lg-0 mt-1'>
        <a href='tel:2129511181' className='nav-link fs-16 fs-md-15' style={{ color: 'white' }}>
          (212) 951-1181
        </a>
      </NavItem> */}
      {/* <NavItem   className='mt-lg-0 mt-1 me-xl-2 me-0 bd-highlight fw-bold '>
          <p   className={`nav-link me-3 fs-16 1 mb-0 text-light`}>
          (877) 878-0777
          </p>
        </NavItem> */}
    </Nav>
  )
}
export default NavbarBasic
