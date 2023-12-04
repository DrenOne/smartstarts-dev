// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Custom Components
import NavbarUser from './NavbarUser'
import NavbarBasic from './NavbarBasic'
import { Collapse, Navbar, NavbarToggler, NavItem, NavLink } from 'reactstrap'
import themeConfig from '@configs/themeConfig'
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'react-feather'
import { handleMenuHidden } from '@store/layout'
import { useDispatch } from 'react-redux'

const ThemeNavbar = props => {
  // ** Props
  const { skin, setSkin, setMenuVisibility } = props
  const dispatch = useDispatch()
  const location = useLocation()

  // ** States
  const [isOpen, setIsOpen] = useState(false)
  const [url, setUrl] = useState(false)
  const [user] = useState(JSON.parse(localStorage.getItem('userData')))
  useEffect(() => {}, [user])

  useEffect(() => {
    if (
      location.pathname === '/' ||
      location.pathname === '/about' ||
      location.pathname === '/homeschooling' ||
      location.pathname === '/courses' ||
      location.pathname === '/FAQ' ||
      location.pathname === '/contact' ||
      location.pathname === '/apps/ecommerce/checkout'
    )
      setUrl(false)
    else setUrl(true)
  }, [location.pathname])

  return user?.role === 'student' || user?.role === 'tutor' ? (
    <Fragment>
      {/* <div className='bookmark-wrapper d-flex align-items-center'>
        <NavbarBookmarks setMenuVisibility={setMenuVisibility} />
      </div> */}
      <NavbarUser skin={skin} setSkin={setSkin} />
    </Fragment>
  ) : (
    <Fragment>
      <Navbar className='w-100'>
        {url ? (
          <ul className='navbar-nav d-xl-none'>
            <NavItem className='mobile-menu me-auto'>
              <NavLink
                className='nav-menu-main menu-toggle hidden-xs is-active'
                onClick={() => {
                  dispatch(handleMenuHidden(false))
                  setMenuVisibility(true)
                }}
              >
                <Menu className='ficon' style={{ display: url ? 'block' : 'none' }} />
              </NavLink>
            </NavItem>
          </ul>
        ) : (
          <Link to='/' className='navbar-brand'>
            <span className='brand-logo'>
              <img src={themeConfig.app.appLogoImage} className='h-60' alt='logo' width={120} />
            </span>
          </Link>
        )}
        {/* <Link to='/' className='navbar-brand d-xl-block d-none'>
                    <span className='brand-logo'>
                        <img src={themeConfig.app.appLogoImage} alt='logo' width={120} />
                    </span>
                </Link> */}
        <NavbarToggler
          onClick={() => setIsOpen(!isOpen)}
          id='mobileNavbarToggle'
          className={'ms-auto me-2 border-0'}
        >
          {user && (
            <h6 className='text-white d-flex align-items-center mb-0 border-0'>
              {user.first_name}
            </h6>
          )}
        </NavbarToggler>
        <Collapse navbar isOpen={isOpen} className='flex-column flex-lg-row'>
          <NavbarBasic skin={skin} setSkin={setSkin} setIsOpen={setIsOpen} />
          <NavbarUser skin={skin} setSkin={setSkin} />
        </Collapse>
        {/* <div
          className='d-md-flex align-items-center justify-between w-100  '
          // style={{ backgroundColor: "#0A3161" }}
        > */}
        {/* <div className='col-md-8'> */}
        {/* </div> */}
        {/* <div className='col-md-4 '> */}
        {/* </div> */}
        {/* </div> */}
      </Navbar>
    </Fragment>
  )
}

export default ThemeNavbar
