// ** Dropdowns Imports
import IntlDropdown from './IntlDropdown'
import CartDropdown from './CartDropdown'
import UserDropdown from './UserDropdown'
import NavbarSearch from './NavbarSearch'
import NotificationDropdown from './NotificationDropdown'

// ** Third Party Components
import { Sun, Moon, Phone } from 'react-feather'

// ** Reactstrap Imports
import { NavItem, NavLink } from 'reactstrap'

const NavbarUser = props => {
  // ** Props
  const { skin, setSkin } = props
  const getUserData = JSON.parse(localStorage.getItem('userData'))

  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === 'dark') {
      return <Sun className='ficon' onClick={() => setSkin('light')} />
    } else {
      return <Moon className='ficon' onClick={() => setSkin('dark')} />
    }
  }

  return (
    <ul className='nav navbar-nav align-items-center ms-auto'>
      {/* <IntlDropdown /> */}
      {/* <NavItem className='d-none d-lg-block'>
        <NavLink className='nav-link-style'>
          <ThemeToggler />
        </NavLink>
      </NavItem> */}
      {/* <NavbarSearch /> */}
      <NavItem className='mt-lg-0 mt-1 bd-highlight d-flex'>
        <p
          className={`nav-link fs-16 1 mb-0 text-light`}
          style={{ display: getUserData?.role === 'user' || !getUserData ? 'block' : 'none' }}
        >
          {/* <Phone style={{ marginTop: '0px', color: 'white' }} /> */}
          {/* <a href='tel:8778780777' style={{ color: 'white', fontSize: '12px' }}>
            (877) 878-0777
          </a> */}
          {/* <br></br>
          <br></br> */}
          {/* <Phone style={{ marginTop: '0px', color: 'white' }} /> */}
          {/* <a href='tel:2129511181' style={{ color: 'white', fontSize: '16px', marginTop: '10px' }}>
            <span style={{ fontSize: '16px' }}>(877)</span> 878-0777
          </a> */}
        </p>
      </NavItem>
      <UserDropdown />
      <CartDropdown />
      {getUserData?.role !== 'tutor' && getUserData?.role !== 'student' ? (
        <div style={{ height: '70px', width: '1px', backgroundColor: 'white' }} className='mx-2' />
      ) : null}
      <a href='tel:2129511181' style={{ color: 'white', fontSize: '16px', marginTop: '10px' }}>
        <span style={{ fontSize: '16px' }}>(877)</span> 878-0777
      </a>
      {/* <NotificationDropdown /> */}
    </ul>
  )
}
export default NavbarUser
