// ** React Imports
import {  useState } from "react"
import { ShoppingCart } from "react-feather"
import { Link } from "react-router-dom"

// ** Reactstrap Imports
import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Badge,
  Button
  // Button
} from "reactstrap"

// ** Store & Actions
import { useSelector } from "react-redux"

// ** Styles
import "@styles/react/libs/input-number/input-number.scss"
import MyCart from "./myCart"

const CartDropdown = () => {
  // ** State
  const [dropdownOpen, setDropdownOpen] = useState(false)
  // ** Store Vars
  const store = useSelector((state) => state.ecommerce)

  const token = JSON.parse(localStorage.getItem("userData"))

  // ** Function to toggle Dropdown
  const toggle = () => {
    setDropdownOpen((prevState) => !prevState)
  }

  return (
  (token?.role !== 'student' && token?.role !== "tutor") &&
    <Dropdown
    isOpen={dropdownOpen}
    toggle={toggle}
    tag="li"
    className="dropdown-cart nav-item"
  >
    <DropdownToggle tag="a" className="nav-link position-relative">
      <ShoppingCart className="ficon text-white" />
      {token ? (
        <Badge pill color="danger" className="badge-up">
          {store.cart?.length}
        </Badge>
      ) : store?.cartState?.length ? (
        <Badge pill color="danger" className="badge-up">
          {store?.cartState?.length}
        </Badge>
      ) : null}
    </DropdownToggle>
    <DropdownMenu
      end
      tag="ul"
      className="dropdown-menu-media dropdown-cart mt-0 overflow-hidden"
    >
      <li className="dropdown-menu-header">
        <DropdownItem tag="div" className="d-flex" header>
          <h4 className="notification-title mb-0 me-auto">My Cart</h4>
          <Badge color="light-primary" pill>
            {token ? store?.cart?.length : store?.cartState?.length || 0}{" "}
            Items
          </Badge>
        </DropdownItem>
      </li>
      <MyCart setDropdownOpen={setDropdownOpen} />
      <Button
        tag={Link}
        to={"/apps/ecommerce/checkout"}
        color="primary"
        block
        disabled={ token ? !store.cart?.length : !store?.cartState?.length}
        className='rounded-0'
        onClick={() => setDropdownOpen(false)}
      >
        Checkout
      </Button>
    </DropdownMenu>
  </Dropdown>
  )
}

export default CartDropdown
