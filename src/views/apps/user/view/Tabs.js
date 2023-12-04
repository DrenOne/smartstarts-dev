// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

// ** Icons Imports
import { User, Bookmark, Bell, Link, Table } from 'react-feather'

// ** User Components
// import InvoiceList from './InvoiceList'
import SecurityTab from './SecurityTab'
import Connections from './Connections'
import BillingPlanTab from './BillingTab'
// import UserTimeline from './UserTimeline'
import Notifications from './Notifications'
import UserProjectsList from './UserProjectsList'

const UserTabs = ({ active, toggleTab }) => {
  const getUserData = JSON.parse(localStorage.getItem("userData"))
  const displayItem = getUserData.role === "user" ? "d-block" : "d-none"
  return (
    <Fragment>
      <Nav pills className='mb-2'>
        <NavItem>
          <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
            <User className='font-medium-3 me-50' />
            <span className='fw-bold'>Account</span>
          </NavLink>
        </NavItem>
        {/* <NavItem>
          <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
            <Table className='font-medium-3 me-50' />
            <span className='fw-bold'>Schedule</span>
          </NavLink>
        </NavItem>
        <NavItem className={displayItem}>
          <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
            <Bookmark className='font-medium-3 me-50' />
            <span className='fw-bold'>Billing & Plans</span>
          </NavLink>
        </NavItem>
        <NavItem className={displayItem}>
          <NavLink active={active === '4'} onClick={() => toggleTab('4')}>
            <Bell className='font-medium-3 me-50' />
            <span className='fw-bold'>Alerts</span>
          </NavLink>
        </NavItem>
        <NavItem className={displayItem}>
          <NavLink active={active === '5'} onClick={() => toggleTab('5')}>
            <Link className='font-medium-3 me-50' />
            <span className='fw-bold'>Connections</span>
          </NavLink>
        </NavItem> */}
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId='1'>
          <UserProjectsList />
          {/* <UserTimeline />
          <InvoiceList /> */}
        </TabPane>
        <TabPane tabId='2'>
          <UserProjectsList />
        </TabPane>
        <TabPane tabId='3'>
          <BillingPlanTab />
        </TabPane>
        <TabPane tabId='4'>
          <Notifications />
        </TabPane>
        <TabPane tabId='5'>
          <Connections />
        </TabPane>
      </TabContent>
    </Fragment>
  )
}
export default UserTabs
