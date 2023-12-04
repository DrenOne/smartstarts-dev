// ** React Imports
import { Link } from 'react-router-dom'
import { Fragment, useEffect, useState } from 'react'

// ** Third Party Components
import PerfectScrollbar from 'react-perfect-scrollbar'
import { X } from 'react-feather'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'

// ** Styles
import '@styles/react/libs/input-number/input-number.scss'
import {
  deleteCourseCartItem,
  delToCartState,
  getCartItems,
} from '../../../../views/apps/ecommerce/store'

const MyCart = ({ setDropdownOpen }) => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.ecommerce)
  let [price, setPrice] = useState(0)
  const baseURl = 'https://admin.smartstartnow.com/'
  const token = JSON.parse(localStorage.getItem('userData'))
  const data = token ? store.cart : store.cartState
  let [disCount, setDisCount] = useState([])
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  const del = item => {
    if (token) {
      dispatch(deleteCourseCartItem(item.course_days_id))
      dispatch(getCartItems())
    } else {
      const newData = store.cartState.filter(el => {
        if (el.id === item.id) {
          if (el.allSemester.id !== item.allSemester.id) {
            return el
          }
        } else return el
      })
      dispatch(delToCartState(newData))
      // dispatch(delToCartState(newData))
    }
  }
  useEffect(() => {}, [store, del])

  const findDuplicates = data2 => {
    const output = []
    Object.values(
      data2.reduce((res, obj) => {
        if (obj?.allSemester?.semester) {
          const key = obj?.allSemester?.semester !== 'Summer' && obj.id && !obj.allSemester?.bundle
          res[key] = [
            ...(res[key] || []),
            {
              id: obj.id,
              day: obj?.allSemester.day,
              semester: obj.allSemester.semester,
              price: obj.allSemester.price,
            },
          ]
          return res
        } else if (obj.semester_name) {
          const key =
            obj.semester_name !== 'Summer' && (obj.course_id || obj.id) && obj.bundle === false
          res[key] = [
            ...(res[key] || []),
            {
              id: obj.course_id,
              day: obj?.day_id,
              semester: obj.semester_name,
              price: Number(obj?.lesson_count * obj?.per_day_price),
            },
          ]
          return res
        }
      }, {})
    ).forEach(res => {
      if (res.length > 1) {
        output.push(...res)
      }
    })
    let lookup = []
    output.map(course => {
      if (
        output.find(
          item =>
            item.id === course.id && item.day === course.day && item.semester !== course.semester
        )
      )
        lookup.push(course)
    })
    return lookup
  }

  useEffect(() => {
    if (disCount.length) {
      disCount.map(item => (price += item.price))
      setPrice(price)
    }
  }, [disCount])

  const RenderCartItems = () => {
    if (data.length) {
      let total = 0
      return (
        <Fragment>
          <PerfectScrollbar
            className='scrollable-container media-list'
            options={{ wheelPropagation: false }}
          >
            {data.map((item, index) => {
              disCount = findDuplicates(data)
              total += Number(item?.lesson_count * item?.per_day_price || item?.allSemester?.price)
              return (
                <div key={index} className='list-item align-items-center'>
                  <img
                    className='d-block rounded me-1'
                    src={`${baseURl}api/file/${item?.course_image || item?.image}`}
                    alt={item?.name}
                    width='62'
                  />
                  <div className='list-item-body flex-grow-1'>
                    <X size={14} className='cart-item-remove' onClick={() => del(item)} />
                    <div className='media-heading'>
                      <h6 className='cart-item-title'>
                        <Link
                          className='text-body'
                          to={`/course/${item?.slug}`}
                          onClick={() => setDropdownOpen(false)}
                        >
                          {item?.course_name || item?.name}
                        </Link>
                      </h6>
                    </div>
                    <div className='cart-item-qty'>
                      <span>
                        {item?.allSemester?.semester || item?.semester_name} (
                        {item.bundle ? item.day : days[item?.day_id - 1] || item?.allSemester?.day})
                      </span>
                    </div>
                    <h5 className='cart-item-price '>
                      $
                      {disCount.find(el => {
                        return (
                          el.id === (item.course_id || item.id) &&
                          (item.day_id === el.day || item?.allSemester?.day === el.day) &&
                          (item.semester_name || item.allSemester.semester) === el.semester
                        )
                      })
                        ? disCount.find(el => {
                            return (
                              el.id === (item.course_id || item.id) &&
                              (item.day_id === el.day || item?.allSemester?.day === el.day) &&
                              (item.semester_name || item.allSemester.semester) === el.semester
                            )
                          })?.price - Number(store.disCount.data / 2)
                        : Number(item?.allSemester?.price) ||
                          Number(item?.lesson_count * item?.per_day_price)}
                    </h5>
                  </div>
                </div>
              )
            })}
          </PerfectScrollbar>
          <div className='dropdown-menu-footer'>
            <div className='d-flex justify-content-between mb-1 align-items-end'>
              <div>
                <h6 className='fw-bolder mb-0'>Total:</h6>
              </div>
              <div className='text-end'>
                <h6 className='text-primary fw-bolder mb-0'>
                  $
                  {disCount.length % 2 === 0
                    ? disCount
                      ? Number(total) - (Number(store.disCount.data) * disCount.length) / 2
                      : total
                    : disCount
                    ? Number(total) - (Number(store.disCount.data) * (disCount.length - 1)) / 2
                    : total}
                </h6>
              </div>
            </div>
          </div>
        </Fragment>
      )
    } else {
      return <p className='m-0 p-1 text-center'>Your cart is empty</p>
    }
  }

  return <>{RenderCartItems()}</>
}

export default MyCart
