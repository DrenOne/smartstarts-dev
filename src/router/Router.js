// ** Router imports
import { lazy, useEffect } from 'react'
import { useDispatch } from 'react-redux'

// ** Router imports
import { useRoutes, Navigate, useLocation } from 'react-router-dom'

// ** Layouts
import BlankLayout from '@layouts/BlankLayout'
import { handleMenuHidden } from '@store/layout'

// ** Hooks Imports
import { useLayout } from '@hooks/useLayout'

// ** Utils
import { getUserData, getHomeRouteForLoggedInUser } from '../utility/Utils'

// ** GetRoutes
import { getRoutes, Routes } from './routes'

// ** Components
const Error = lazy(() => import('../views/pages/misc/Error'))
const Login = lazy(() => import('../views/pages/authentication/Login'))
const NotAuthorized = lazy(() => import('../views/pages/misc/NotAuthorized'))

const Router = () => {
  // ** Hooks
  const { layout } = useLayout()
  const location = useLocation()
  const dispatch = useDispatch()

  const allRoutes = getRoutes(layout)
  const getHomeRoute = () => {
    const user = getUserData()
    if (user && user.role === 'admin') {
      return getHomeRouteForLoggedInUser(user.role)
    } else {
      return '/'
    }
  }

  useEffect(() => {
    const sidebar = Routes.filter(route => route.path === location.pathname)
    if (!sidebar.length) {
      if (
        Routes.filter(route => {
          const path = route.path.slice(0, route.path.lastIndexOf(':') + 1)
          const pathname = location.pathname.slice(0, location.pathname.lastIndexOf('/'))
          return path === `${pathname}/:`
        })[0]?.sidebar
      ) dispatch(handleMenuHidden(false))
      else dispatch(handleMenuHidden(true))
    } else {
      if (sidebar[0]?.sidebar) dispatch(handleMenuHidden(false))
      else dispatch(handleMenuHidden(true))
    }
  }, [location.pathname])

  const routes = useRoutes([
    // {
    //   path: '/',
    //   index: true,
    //   element: <Navigate replace to={getHomeRoute()} />
    // },
    {
      path: '/login',
      element: <BlankLayout />,
      children: [{ path: '/login', element: <Login /> }]
    },
    {
      path: '/auth/not-auth',
      element: <BlankLayout />,
      children: [{ path: '/auth/not-auth', element: <NotAuthorized /> }]
    },
    {
      path: '*',
      element: <BlankLayout />,
      children: [{ path: '*', element: <Error /> }]
    },
    ...allRoutes
  ])

  return routes
}

export default Router
