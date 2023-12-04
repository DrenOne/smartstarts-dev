// ** React Imports
import { Fragment, useState, useRef, useEffect } from 'react'

// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'

// ** Vertical Menu Components
import VerticalMenuHeader from './VerticalMenuHeader'
import VerticalNavMenuItems from './VerticalNavMenuItems'

const Sidebar = props => {
  // ** Props
  const { menuCollapsed, routerProps, menu, currentActiveItem, skin, menuData } = props
  const getUserData = JSON.parse(localStorage.getItem("userData"))


  // ** States
  const [groupOpen, setGroupOpen] = useState([])
  const [groupActive, setGroupActive] = useState([])
  const [currentActiveGroup, setCurrentActiveGroup] = useState([])
  const [activeItem, setActiveItem] = useState(null)
  const [newMenuData, setNewMenuData] = useState([])


  // ** Menu Hover State
  const [menuHover, setMenuHover] = useState(false)
  // ** Ref
  const shadowRef = useRef(null)

  // ** Function to handle Mouse Enter
  const onMouseEnter = () => {
    setMenuHover(true)
  }

  // ** Scroll Menu
  const scrollMenu = container => {
    if (shadowRef && container.scrollTop > 0) {
      if (!shadowRef.current.classList.contains('d-block')) {
        shadowRef.current.classList.add('d-block')
      }
    } else {
      if (shadowRef.current.classList.contains('d-block')) {
        shadowRef.current.classList.remove('d-block')
      }
    }
  }

 
  useEffect(() => {
    if (getUserData?.role === "tutor") {
      const newMenuData = menuData.filter(el => {
        if (el.id === "teacher") return el
        })
        setNewMenuData(newMenuData)
    } else if (getUserData?.role === "student") {
      const newMenuData = menuData.filter(el => {
        if (el.id === "child") return el
        })
        setNewMenuData(newMenuData)
    } else {
      const newMenuData = menuData.filter(el => {
        if (el.id === "parent") return el
      })
        setNewMenuData(newMenuData)
    }
  }, [menuData])
  return (
    <Fragment>
      <div style={{display:"block"}}
        className={classnames('main-menu menu-fixed menu-accordion menu-shadow mt-lg-0 mt-5', {
          expanded: menuHover || menuCollapsed === false,
          'menu-light': skin !== 'semi-dark' && skin !== 'dark',
          'menu-dark': skin === 'semi-dark' || skin === 'dark'
        })}
        onMouseEnter={onMouseEnter}
        onMouseLeave={() => setMenuHover(false)}
      >
        {menu ? (
          menu({ ...props })
        ) : (
          <Fragment>
            {/* Vertical Menu Header */}
            <VerticalMenuHeader setGroupOpen={setGroupOpen} menuHover={menuHover} {...props} />
            {/* Vertical Menu Header Shadow */}
            <div className='shadow-bottom' ref={shadowRef}></div>
            {/* Perfect Scrollbar */}
            <PerfectScrollbar
              className='main-menu-content'
              options={{ wheelPropagation: false }}
              onScrollY={container => scrollMenu(container)}
            >
              <ul className='navigation navigation-main'>
              
                <VerticalNavMenuItems
                  items={newMenuData}
                  menuHover={menuHover}
                  groupOpen={groupOpen}
                  activeItem={activeItem}
                  groupActive={groupActive}
                  currentActiveGroup={currentActiveGroup}
                  routerProps={routerProps}
                  setGroupOpen={setGroupOpen}
                  menuCollapsed={menuCollapsed}
                  setActiveItem={setActiveItem}
                  setGroupActive={setGroupActive}
                  setCurrentActiveGroup={setCurrentActiveGroup}
                  currentActiveItem={currentActiveItem}
                />
              </ul>
            </PerfectScrollbar>
          </Fragment>
        )}
      </div>
    </Fragment>
  )
}

export default Sidebar
