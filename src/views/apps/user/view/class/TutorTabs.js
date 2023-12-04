// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

// ** Icons Imports
import { User, Bookmark, Bell, Link, Table } from 'react-feather'

// ** User Components
import AddLecture from './addlecture'
import ClassItemTutor from './ClassItemTutor'
import SubjectLecture from '../../../../pages/subjecthomework'

const UserTabs = ({ active, toggleTab }) => {
  const store = JSON.parse(localStorage.getItem("userData"))
  return (
      store.role === 'tutor' ? (<Fragment>
      <Nav pills className='mb-2'>
        <NavItem>
          <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
            <User className='font-medium-3 me-50' />
            <span className='fw-bold'>List of students</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
            <Bookmark className='font-medium-3 me-50' />
            <span className='fw-bold'>All lecture</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
            <Table className='font-medium-3 me-50' />
            <span className='fw-bold'>Add lecture</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId='1'>
          <ClassItemTutor />
        </TabPane>
        <TabPane tabId='2'>
          <AddLecture />
        </TabPane>
         <TabPane tabId='3'>
          <SubjectLecture />
        </TabPane>
      </TabContent>
    </Fragment>) : <SubjectLecture />
  )
}
export default UserTabs
