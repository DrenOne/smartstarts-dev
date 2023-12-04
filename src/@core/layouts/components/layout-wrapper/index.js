// ** React Imports
import { Fragment, useEffect, memo, useState } from 'react'
import { useLocation } from 'react-router-dom'

// ** Third Party Components
import classnames from 'classnames'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'
import { handleContentWidth, handleMenuCollapsed, handleMenuHidden } from '@store/layout'

// ** ThemeConfig
import themeConfig from '@configs/themeConfig'

// ** Styles
import 'animate.css/animate.css'

const image = require('@src/assets/images/smartnew.jpeg').default

const LayoutWrapper = props => {
  // ** Props
  const { children, routeMeta } = props

  // ** Store Vars
  const dispatch = useDispatch()
  const location = useLocation()
  const store = useSelector(state => state)
  const { menuHidden } = useSelector(state => state.layout)
  const { productDetail } = useSelector(state => state.ecommerce)
  const [sidebarDisplay, setSidebarDisplay] = useState(false)
  const getUserData = JSON.parse(localStorage.getItem('userData'))

  const navbarStore = store.navbar
  const layoutStored = store.layout.layout
  const contentWidth = store.layout.contentWidth
  //** Vars
  const appLayoutCondition =
    (layoutStored.layout === 'horizontal' && !routeMeta) ||
    (layoutStored.layout === 'horizontal' && routeMeta && !routeMeta.appLayout)
  const Tag = appLayoutCondition ? 'div' : Fragment

  // ** Clean Up Function
  const cleanUp = () => {
    if (routeMeta) {
      if (routeMeta.contentWidth && routeMeta.contentWidth === store.layout.contentWidth) {
        dispatch(handleContentWidth(themeConfig.layout.contentWidth))
      }
      if (routeMeta.menuCollapsed && routeMeta.menuCollapsed === store.layout.menuCollapsed) {
        dispatch(handleMenuCollapsed(!store.layout.menuCollapsed))
      }
      if (routeMeta.menuHidden && routeMeta.menuHidden === store.layout.menuHidden) {
        dispatch(handleMenuHidden(!store.layout.menuHidden))
      }
    }
  }

  // ** ComponentDidMount
  useEffect(() => {
    if (routeMeta) {
      if (routeMeta.contentWidth) {
        dispatch(handleContentWidth(routeMeta.contentWidth))
      }
      if (routeMeta.menuCollapsed) {
        dispatch(handleMenuCollapsed(routeMeta.menuCollapsed))
      }
      if (routeMeta.menuHidden) {
        dispatch(handleMenuHidden(routeMeta.menuHidden))
      }
    }
    return () => cleanUp()
  }, [routeMeta])

  useEffect(() => {
    const arr = window.location.href.split('/')
    if (
      arr.includes('home') ||
      arr.includes('course') ||
      arr.includes('about') ||
      arr.includes('courses') ||
      arr.includes('FAQ') ||
      arr.includes('contact') ||
      arr.includes('ecommerce')
    ) {
      setSidebarDisplay(false)
    } else {
      setSidebarDisplay(
        arr.includes('user') ||
          arr.includes('child') ||
          arr.includes('mycourse') ||
          getUserData?.role === 'student' ||
          getUserData?.role === 'user' ||
          getUserData?.role === 'tutor'
      )
    }
  }, [window.location.href, sidebarDisplay])

  const userDate = JSON.parse(localStorage.getItem('userData'))

  return (
    <div
      //side style
      className={classnames('app-content content overflow-hidden mt--1', {
        [routeMeta ? routeMeta.className : '']: routeMeta && routeMeta.className,
        'show-overlay': navbarStore.query.length,
        'ms-260': !menuHidden,
        'ps-2': !menuHidden && sidebarDisplay,
        'ms-0': menuHidden,
        'pt-6': userDate?.role === 'student' || userDate?.role === 'tutor',
      })}
    >
      <div className='content-overlay'></div>
      <div className='header-navbar-shadow' />
      <div
        className={classnames({
          'content-wrapper': routeMeta && !routeMeta.appLayout,
          'content-area-wrapper': routeMeta && routeMeta.appLayout,
          'p-0': contentWidth === 'boxed',
        })}
      >
        {Object.keys(productDetail).length && location.pathname.split('/')[1] === 'course' ? (
          <div className='mt-1 d-block d-md-none'>
            <img src={image} className='w-100' />
          </div>
        ) : null}
        {location.pathname === '/contact' ? (
          <img
            className='img-fluid text-center w-100 h-100 d-block d-md-none mt-5 mt-md-0'
            src={themeConfig.app.appLogoImage}
            alt='illustration'
          />
        ) : null}
        <Tag {...(appLayoutCondition ? { className: 'content-body' } : {})}>{children}</Tag>
      </div>
    </div>
  )
}

export default memo(LayoutWrapper)
