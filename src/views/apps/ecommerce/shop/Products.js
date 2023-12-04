// ** React Imports
import ReactPaginate from 'react-paginate'

// ** Product components
import ProductCards from './ProductCards'
// import ProductsHeader from './ProductsHeader'
import ProductsSearchbar from './ProductsSearchbar'
import Skeleton from 'react-loading-skeleton'

// ** Third Party Components
// import classnames from 'classnames'

// ** Reactstrap Imports
import { Button, Card, CardBody, CardText, Col, Row } from 'reactstrap'

import 'react-loading-skeleton/dist/skeleton.css'

export const ProductSkeleton = () => (
  <Row className='px-1'>
    {[...new Array(3)].map((_, index) => (
      <Col xl='4' md='6' sm='12' className='col-12 p-2 ps-0' key={index}>
        <Card className='ecommerce-card rounded overflow-hidden h-100 w-100'>
          <Skeleton width='100%' height={230} />
          <CardBody>
            <h4>
              <Skeleton />
            </h4>
            <CardText>
              <Skeleton count={2} />
            </CardText>
          </CardBody>
          <div className='item-options text-center'>
            <div className='d-flex flex-xl-row flex-lg-column flex-sm-row flex-column'>
              <Button className='w-100 p-0 border-0'>
                <Skeleton width='100%' height='35px' className='rounded-0' />
              </Button>
              <Button className='w-100 p-0 border-0'>
                <Skeleton width='100%' height='35px' className='rounded-0' />
              </Button>
            </div>
          </div>
        </Card>
      </Col>
    ))}
  </Row>
)

const ProductsPage = props => {
  // ** Props
  const {
    store,
    dispatch,
    addToCart,
    activeView,
    // sidebarOpen,
    getProducts,
    getCartItems,
    addToWishlist,
    // setActiveView,
    // deleteCartItem,
    // setSidebarOpen,
    deleteWishlistItem,
    name,
    setName,
    grade_id,
    program_id,
    subject_id,
  } = props

  const handlePagination = page => {
    dispatch(
      getProducts({
        name,
        grade_id,
        program_id,
        subject_id,
        page: page.selected + 1,
      })
    )
  }

  // ** Handles pagination
  // const handlePageChange = val => {
  //   if (val === 'next') {
  //     dispatch(getProducts({ ...store.params, page: store.params.page + 1 }))
  //   } else if (val === 'prev') {
  //     dispatch(getProducts({ ...store.params, page: store.params.page - 1 }))
  //   } else {
  //     dispatch(getProducts({ ...store.params, page: val }))
  //   }
  // }

  // ** Render pages
  // const renderPageItems = () => {
  //   const arrLength =
  //     store.totalProducts !== 0 && store.products.length !== 0 ? Number(store.totalProducts) / store.products.length : 3

  //   return new Array(Math.trunc(arrLength)).fill().map((item, index) => {
  //     return (
  //       <PaginationItem
  //         key={index}
  //         active={store.params.page === index + 1}
  //         onClick={() => handlePageChange(index + 1)}
  //       >
  //         <PaginationLink href='/' onClick={e => e.preventDefault()}>
  //           {index + 1}
  //         </PaginationLink>
  //       </PaginationItem>
  //     )
  //   })
  // }

  // ** handle next page click
  // const handleNext = () => {
  //   if (store.params.page !== Number(store.totalProducts) / store.products.length) {
  //     handlePageChange('next')
  //   }
  // }

  return (
    <div className='content-detached content-right'>
      <div className='content-body'>
        {/* <ProductsHeader
          store={store}
          dispatch={dispatch}
          activeView={activeView}
          getProducts={getProducts}
          setActiveView={setActiveView}
          setSidebarOpen={setSidebarOpen}
        />
        <div
          className={classnames('body-content-overlay', {
            show: sidebarOpen
          })}
          onClick={() => setSidebarOpen(false)}
        ></div> */}
        <ProductsSearchbar name={name} setName={setName} />
        {store?.data?.data?.length ? (
          <div className='mt-2 mb-0'>
            <ReactPaginate
              forcePage={store.data.current_page - 1}
              pageCount={store.data.last_page || 1}
              pageRangeDisplayed={5}
              marginPagesDisplayed={3}
              onPageChange={page => handlePagination(page)}
              nextLabel=''
              breakLabel='...'
              previousLabel=''
              activeClassName='active'
              pageClassName='page-item'
              breakClassName='page-item'
              nextLinkClassName='page-link'
              pageLinkClassName='page-link'
              nextClassName='page-item next'
              breakLinkClassName='page-link'
              previousLinkClassName='page-link'
              previousClassName='page-item prev'
              containerClassName='pagination react-paginate justify-content-center mb-0'
            />
          </div>
        ) : null}
        {store.isLoading ? (
          <ProductSkeleton />
        ) : store?.data?.data?.length ? (
          <Row className='px-1'>
            <ProductCards
              store={store}
              dispatch={dispatch}
              addToCart={addToCart}
              activeView={activeView}
              products={store.products}
              getProducts={getProducts}
              getCartItems={getCartItems}
              addToWishlist={addToWishlist}
              // deleteCartItem={deleteCartItem}
              deleteWishlistItem={deleteWishlistItem}
            />
            <ReactPaginate
              forcePage={store.data.current_page - 1}
              pageCount={store.data.last_page || 1}
              pageRangeDisplayed={5}
              marginPagesDisplayed={3}
              onPageChange={page => handlePagination(page)}
              nextLabel=''
              breakLabel='...'
              previousLabel=''
              activeClassName='active'
              pageClassName='page-item'
              breakClassName='page-item'
              nextLinkClassName='page-link'
              pageLinkClassName='page-link'
              nextClassName='page-item next'
              breakLinkClassName='page-link'
              previousLinkClassName='page-link'
              previousClassName='page-item prev'
              containerClassName='pagination react-paginate justify-content-center'
            />
            {/* <Pagination className='d-flex justify-content-center ecommerce-shop-pagination mt-2'>
              <PaginationItem
                disabled={store.params.page === 1}
                className='prev-item'
                onClick={() => (store.params.page !== 1 ? handlePageChange('prev') : null)}
              >
                <PaginationLink href='/' onClick={e => e.preventDefault()}></PaginationLink>
              </PaginationItem>
              {renderPageItems()}
              <PaginationItem
                className='next-item'
                onClick={() => handleNext()}
                disabled={store.params.page === Number(store.totalProducts) / store.products.length}
              >
                <PaginationLink href='/' onClick={e => e.preventDefault()}></PaginationLink>
              </PaginationItem>
            </Pagination> */}
          </Row>
        ) : (
          <div className='d-flex justify-content-center mt-2'>
            <p>No Results</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductsPage
