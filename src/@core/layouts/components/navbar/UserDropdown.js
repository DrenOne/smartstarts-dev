// ** React Imports
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { isUserLoggedIn } from '@utils'

// ** Store & Actions
import { useDispatch } from 'react-redux'
import { handleLogout } from '@store/authentication'
import { delToCartState, getCartItems } from '@src/views/apps/ecommerce/store'

// ** Third Party Components
import { Book, Power } from 'react-feather'

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Button
} from 'reactstrap'
import { getCoupon, getDisCount } from '../../../../views/apps/ecommerce/store'
import { delCalendarEvents } from '../../../../views/apps/calendar/store'

// ** Default Avatar Image
// import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg'

const UserDropdown = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // ** State
  const [userData, setUserData] = useState(null)
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userData')))

  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem('userData')))
    }
  }, [])

  useEffect(() => {
    dispatch(getDisCount())
    dispatch(getCartItems())
  }, [user])

  //** Vars
  // const userAvatar = (userData && userData.avatar) || defaultAvatar

  return user ? (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item me-25'>
      <DropdownToggle
        href='/'
        tag='a'
        className='nav-link dropdown-user-link'
        onClick={e => e.preventDefault()}
      >
        <div className='user-nav d-sm-flex '>
          <span className='user-name fw-bold text-truncate'>
            {userData && `${userData['first_name']}`}
          </span>
          {(user.role === 'student' || user.role === 'tutor') && (
            <span className='user-status text-'>{(userData && userData.role) || 'student'}</span>
          )}
        </div>
        {/* <Avatar img={userAvatar} imgHeight='40' imgWidth='40' status='online' /> */}
      </DropdownToggle>
      <DropdownMenu end>
        {/* <DropdownItem tag={Link} to='/pages/profile'>
          <User size={14} className='me-75' />
          <span className='align-middle'>Profile</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/apps/email'>
          <Mail size={14} className='me-75' />
          <span className='align-middle'>Inbox</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/apps/todo'>
          <CheckSquare size={14} className='me-75' />
          <span className='align-middle'>Tasks</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/apps/chat'>
          <MessageSquare size={14} className='me-75' />
          <span className='align-middle'>Chats</span>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem tag={Link} to='/pages/account-settings'>
          <Settings size={14} className='me-75' />
          <span className='align-middle'>Settings</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/pages/pricing'>
          <CreditCard size={14} className='me-75' />
          <span className='align-middle'>Pricing</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/pages/faq'>
          <HelpCircle size={14} className='me-75' />
          <span className='align-middle'>FAQ</span>
        </DropdownItem> */}
        {(user.role !== 'student' && user.role !== "tutor") &&
          <DropdownItem className='w-100'>
            <Link to='/dashboard/mycourse'>
              <Book size={14} />
              Dashboard
            </Link>
          </DropdownItem>
        }
        <DropdownItem
          className='w-100'
          onClick={() => {
            dispatch(handleLogout())
            dispatch(delToCartState([]))
            // dispatch(getCoupon(0))
            setUser('')
            if ((user.role === 'student' ||  user.role === "tutor")) {
              navigate('/login')
              localStorage.removeItem('course')
              localStorage.removeItem('userDataPayment')
            } else {
              navigate('/')
              localStorage.removeItem('course')
              localStorage.removeItem('userDataPayment')
            }
          }}
        >
          <Power size={14} />
          <span className='align-middle'>Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  ) : (
    <Button
      color='light'
      outline
      className='me-1'
      tag={Link}
      to='/login'
      onClick={() => {
        dispatch(getCoupon(0))
        localStorage.removeItem('course')
        localStorage.removeItem('userDataPayment')
        dispatch(delCalendarEvents())
      }}
    >
      Login
    </Button>
  )
}

export default UserDropdown
