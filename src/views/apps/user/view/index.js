// ** React Imports
import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

// ** Store & Actions
import { getUser } from '../store'
import { useSelector, useDispatch } from 'react-redux'

// ** Reactstrap Imports
import { Row, Col, Alert, Card, CardBody } from 'reactstrap'

// ** User View Components
import UserTabs from './Tabs'
// import PlanCard from './PlanCard'
import UserInfoCard from './UserInfoCard'

// ** Styles
import '@styles/react/apps/app-users.scss'
import { fetchEvents } from '../../calendar/store'
import classNames from 'classnames'
import Skeleton from 'react-loading-skeleton'

import 'react-loading-skeleton/dist/skeleton.css'

const UserView = () => {
  // ** Store Vars
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const getUserData = JSON.parse(localStorage.getItem('userData'))
  const { selectedUser, isLoading } = useSelector(state => state.users)
  const store = useSelector(state => state.calendar)

  // ** Hooks
  const { id } = useParams()

  useEffect(() => {
    if (!getUserData) navigate('/')
  }, [getUserData])

  // ** Get suer on mount
  useEffect(() => {
    if (getUserData.role === 'tutor' || getUserData.role === 'student') {
      dispatch(fetchEvents(getUserData?.id))
      // dispatch(getUser(getUserData?.id))
    } else {
      dispatch(getUser(id))
      dispatch(fetchEvents(id))
    }
  }, [dispatch])

  const [active, setActive] = useState('1')

  const toggleTab = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  return isLoading || store.isLoading ? (
    <Row className={classNames({
      'pt-3rem': getUserData?.role === 'user'
    })}>
      <Col xl='4' lg='5'>
        <Card>
          <CardBody>
            <Row>
              <Col xl='12'>
                <Skeleton height={200} />
              </Col>
              <Col md='6' className='mt-1'>
                <Skeleton height={30} />
              </Col>
              <Col md='6' className='mt-1'>
                <Skeleton height={30} />
              </Col>
            </Row>
            <Skeleton className='w-25 mt-1' height={20} />
            {[...new Array(6)].map((_, index) => (
              <Skeleton key={index} className='mt-1' width='45%' />
            ))}
          </CardBody>
        </Card>
      </Col>
    </Row>
  ) : !isLoading && Object.keys(getUserData.role === "user" ? selectedUser : getUserData).length ? (
    <div
      className={classNames('app-user-view', {
        'pt-3rem': getUserData?.role === 'user'
      })}
    >
      <Row>
        <Col xl='4' lg='5' xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <UserInfoCard selectedUser={getUserData.role === "user" ? selectedUser : getUserData} />
          {/* <PlanCard /> */}
        </Col>
        <Col xl='8' lg='7' xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <UserTabs active={active} toggleTab={toggleTab} />
        </Col>
      </Row>
    </div>
  ) : (
    <Alert color='danger mt-3'>
      <h4 className='alert-heading'>User not found</h4>
      <div className='alert-body'>
        User with id: {id} doesn't exist. Check list of all Users:
        <Link to='/apps/user/list'> Users List</Link>
      </div>
    </Alert>
  )
}

export default UserView
