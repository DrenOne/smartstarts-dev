// ** React Imports
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

// ** Store & Actions
import { useSelector, useDispatch } from "react-redux"
import {
  handleMenuCollapsed,
  handleContentWidth,
  handleMenuHidden
} from "@store/layout"

// ** Third Party Components
import classnames from "classnames"
import { ArrowUp } from "react-feather"

// ** Reactstrap Imports
import { Navbar, Button } from "reactstrap"

// ** Configs
import themeConfig from "@configs/themeConfig"

// ** Custom Components

import Customizer from "@components/customizer"
import ScrollToTop from "@components/scrolltop"
import FooterComponent from "./components/footer"
import NavbarComponent from "./components/navbar"
import SidebarComponent from "./components/menu/vertical-menu"

// ** Custom Hooks
import { useRTL } from "@hooks/useRTL"
import { useSkin } from "@hooks/useSkin"
import { useLayout } from "@hooks/useLayout"
import { useNavbarType } from "@hooks/useNavbarType"
import { useFooterType } from "@hooks/useFooterType"
import { useNavbarColor } from "@hooks/useNavbarColor"

// ** Styles
import "@styles/base/core/menu/menu-types/vertical-menu.scss"
import "@styles/base/core/menu/menu-types/vertical-overlay-menu.scss"

const VerticalLayout = (props) => {
  // ** Props
  const { menu, navbar, footer, children, menuData } = props

  // ** Hooks
  const [isRtl, setIsRtl] = useRTL()
  const { skin, setSkin } = useSkin()
  const { navbarType, setNavbarType } = useNavbarType()
  const { footerType, setFooterType } = useFooterType()
  const { navbarColor, setNavbarColor } = useNavbarColor()
  const { layout, setLayout, setLastLayout } = useLayout()

  // ** States
  const [isMounted, setIsMounted] = useState(false)
  const [menuVisibility, setMenuVisibility] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [sidebarDisplay, setSidebarDisplay] = useState(false)
  const getUserData = JSON.parse(localStorage.getItem("userData"))

  // ** Vars
  const dispatch = useDispatch()
  const layoutStore = useSelector((state) => state.layout)

  // ** Update Window Width
  const handleWindowWidth = () => {
    setWindowWidth(window.innerWidth)
  }
  // ** Vars
  const location = useLocation()
  const isHidden = layoutStore.menuHidden
  const contentWidth = layoutStore.contentWidth
  const menuCollapsed = layoutStore.menuCollapsed
  // ** Toggles Menu Collapsed
  const setMenuCollapsed = (val) => dispatch(handleMenuCollapsed(val))

  // ** Handles Content Width
  const setContentWidth = (val) => dispatch(handleContentWidth(val))

  // ** Handles Content Width
  const setIsHidden = (val) => dispatch(handleMenuHidden(val))

  //** This function will detect the Route Change and will hide the menu on menu item click
  useEffect(() => {
    if (menuVisibility && windowWidth < 1200) {
      setMenuVisibility(false)
    }
    if (isHidden && windowWidth > 1200) {
      // dispatch(handleMenuHidden(false))
      if (sidebarDisplay) {
        setMenuVisibility(true)
      }
    }
  }, [location, isHidden, layoutStore])

  //** Sets Window Size & Layout Props
  useEffect(() => {
    if (window !== undefined) {
      window.addEventListener("resize", handleWindowWidth)
    }
  }, [windowWidth])

  //** ComponentDidMount
  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  // ** Vars
  const footerClasses = {
    static: "footer-static",
    sticky: "footer-fixed",
    hidden: "footer-hidden"
  }

  useEffect(() => {
    const arr = window.location.href.split("/")
    if ( (arr.length < 4) || (arr.includes("home")) || (arr.includes("about")) || (arr.includes("courses")) || (arr.includes("course")) || (arr.includes("FAQ")) || (arr.includes("contact")) || (arr.includes("ecommerce"))) {
      setSidebarDisplay(false)
      setMenuVisibility(false)
    } else {
      setSidebarDisplay(arr.includes("user") || arr.includes("child") || arr.includes("mycourse") || getUserData?.role === "student" || getUserData?.role === "user" || getUserData?.role === "tutor")
    }
  }, [window.location.href, sidebarDisplay])

  const navbarWrapperClasses = {
    floating: "navbar-floating",
    sticky: "navbar-sticky",
    static: "navbar-static",
    hidden: "navbar-hidden"
  }

  const navbarClasses = {
    floating:
      contentWidth === "boxed" ? "floating-nav container-xxl" : "floating-nav",
    sticky: "fixed-top",
    static: "navbar-static-top",
    hidden: "d-none"
  }

  const bgColorCondition =
    navbarColor !== "" && navbarColor !== "light" && navbarColor !== "white"

  if (!isMounted) {
    return null
  }

  return (
    <div
      className={classnames(
        `wrapper vertical-layout ${
          navbarWrapperClasses[navbarType] || "navbar-floating"
        } ${footerClasses[footerType] || "footer-static"}`,
        {
          // Modern Menu
          "vertical-menu-modern": windowWidth >= 1200,
          "menu-collapsed": menuCollapsed && windowWidth >= 1200,
          "menu-expanded": !menuCollapsed && windowWidth > 1200,
     
          // Overlay Menu
          // 'vertical-overlay-menu': windowWidth < 1200,
          // 'menu-hide': !menuVisibility && windowWidth < 1200,
          // 'menu-open': menuVisibility && windowWidth < 1200
            
          "vertical-overlay-menu": sidebarDisplay ? windowWidth < 1200 : true,
          "menu-hide": sidebarDisplay ? !menuVisibility && windowWidth < 1200 : true,
          "menu-open": sidebarDisplay ?  menuVisibility && windowWidth < 1200 : false
// =======
//           'vertical-overlay-menu': windowWidth < 1200,
//           'menu-hide': !menuVisibility && windowWidth < 1200,
//           'menu-open': menuVisibility && windowWidth < 1200
    
// >>>>>>> 72f234e149bad94d943dd1173890ab6915750cfb
        }
      )}
     
      {...(isHidden ? { "data-col": "1-column" } : {})}
    >
      {!isHidden ? (
        <SidebarComponent
          skin={skin}
          menu={menu}
          menuData={menuData}
          menuCollapsed={menuCollapsed}
          menuVisibility={menuVisibility}
          setMenuCollapsed={setMenuCollapsed}
          setMenuVisibility={setMenuVisibility}
        />
      ) : null}

      <Navbar

        // style={{ minWidth: "100%", borderRadius:0, marginTop:0}}
        expand="lg"
        container={false}
        light={skin !== "dark"}
        dark={true}
        color={bgColorCondition ? navbarColor : undefined}
        style={{
          // left: (sidebarDisplay ?  menuVisibility && windowWidth < 1200 : false) ? '80px' : '0px',
          borderRadius:0,
          marginTop:0
        }}

        className={classnames(
          `header-navbar navbar align-items-center ${
            navbarClasses[navbarType] || "floating-nav"
          } navbar-shadow`, {
            'l-0': isHidden
          }
        )}
      >
        <div className="navbar-container d-flex content">
          {navbar ? (
            navbar({ skin, setSkin, setMenuVisibility })
          ) : (
            <NavbarComponent
              setMenuVisibility={setMenuVisibility}
              skin={skin}
              setSkin={setSkin}
            />
          )}
        </div>
      </Navbar>
      {children}

      {/* Vertical Nav Menu Overlay */}
      <div
        className={classnames("sidenav-overlay", {
          show: menuVisibility
        })}
        onClick={() => setMenuVisibility(false)}
      ></div>
      {/* Vertical Nav Menu Overlay */}

      {themeConfig.layout.customizer === true ? (
        <Customizer
          skin={skin}
          isRtl={isRtl}
          layout={layout}
          setSkin={setSkin}
          setIsRtl={setIsRtl}
          isHidden={isHidden}
          setLayout={setLayout}
          footerType={footerType}
          navbarType={navbarType}
          setIsHidden={setIsHidden}
          themeConfig={themeConfig}
          navbarColor={navbarColor}
          contentWidth={contentWidth}
          setFooterType={setFooterType}
          setNavbarType={setNavbarType}
          setLastLayout={setLastLayout}
          menuCollapsed={menuCollapsed}
          setNavbarColor={setNavbarColor}
          setContentWidth={setContentWidth}
          setMenuCollapsed={setMenuCollapsed}
        />
      ) : null}
      <footer
        className={classnames(
          `footer p-0 footer-light ${footerClasses[footerType] || "footer-static"}`,
          {
            "d-none": footerType === "hidden",
            'ms-0': isHidden
          }
        )}
      >
        {footer ? (
          footer
        ) : (
          <FooterComponent
            footerType={footerType}
            footerClasses={footerClasses}
          />
        )}
      </footer>

      {themeConfig.layout.scrollTop === true ? (
        <div className="scroll-to-top">
          <ScrollToTop showOffset={300} className="scroll-top d-block">
            <Button className="btn-icon" color="primary">
              <ArrowUp size={14} />
            </Button>
          </ScrollToTop>
        </div>
      ) : null}
    </div>
  )
}

export default VerticalLayout
