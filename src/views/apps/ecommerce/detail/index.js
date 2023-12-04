// ** React Imports
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Skeleton from './Skeleton'

// ** Third Party Components
import classnames from 'classnames'

// ** Product detail components
import ItemFeatures from './ItemFeatures'
import ProductDetails from './ProductDetails'
import RelatedProducts from './RelatedProducts'

// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs'

// ** Reactstrap Imports
import { Card, CardBody } from 'reactstrap'
import classNames from 'classnames'
import discount from '@src/assets/images/discount.jpg'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import {
  getProduct,
  deleteWishlistItem,
  addToWishlist,
  addToCart,
  getMyCoursesDetail,
} from '../store'

import '@styles/base/pages/app-ecommerce-details.scss'
import { X } from 'react-feather'

const Details = () => {
  // ** Vars
  // const params = useParams().product
  const { slug } = useParams()
  const productId = slug
  const [visible, setVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(true)

  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.ecommerce)
  // ** ComponentDidMount : Get product
  useEffect(() => {
    dispatch(getProduct(productId))
    dispatch(getMyCoursesDetail())
    // window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (window) {
      window.addEventListener('scroll', () => {
        if (window.pageYOffset >= 300) setVisible(true)
        else setVisible(false)
      })
    }
  }, [])

  const image = require('@src/assets/images/smartnew.jpeg').default
  return (
    <div className={classnames('container-xxl p-5', { 'pt-0': Object.keys(store.productDetail).length })}>
      {/* <BreadCrumbs title='Product Details' data={[{ title: 'eCommerce' }, { title: 'Details' }]} /> */}
      <div className='app-ecommerce-details'>
        {store.isLoadingProduct ? (
          <Skeleton />
        ) : store.error ? (
          <h2>Course not found</h2>
        ) : Object.keys(store.productDetail).length ? (
          <Card className='overflow-hidden'>
            <div className='d-none d-md-block'>
              <img src={image} className='w-100' />
            </div>
            <CardBody>
              <ProductDetails
                dispatch={dispatch}
                addToCart={addToCart}
                productId={productId}
                getProduct={getProduct}
                data={{ ...store.productDetail, count: 1 }}
                addToWishlist={addToWishlist}
                deleteWishlistItem={deleteWishlistItem}
                slug={slug}
              />
            </CardBody>
            <ItemFeatures />
            {/* <CardBody>
              <RelatedProducts />
            </CardBody> */}
          </Card>
        ) : null}
      </div>
      <div
        className={classNames('position-fixed end-0 mb-3 me-5 pe-3 animated', {
          'mb--100': !visible && isOpen,
          'bottom-0': visible && isOpen,
        })}
        style={{ zIndex: 99999 }}
      >
        <div className='w-100 text-end'>
          <X size={42} onClick={() => setIsOpen(false)} />
        </div>
        <div className='rounded border overflow-hidden'>
          <Link to='/courses'>
            <img src={discount} width={300} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Details
