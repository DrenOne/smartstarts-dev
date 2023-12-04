import { Button, Input } from 'reactstrap'

const Coupon = ({ coupon, setCoupon, store, CouponCheck }) => {
  return (
    <div className='w-100'>
      <span className='text-danger'>Have Discount Coupon? Enter it here</span>
      <div className='input-group  text-start border-bottom w-100'>
        <Input
          type='text'
          className='form-control'
          value={coupon}
          onChange={e => setCoupon(e.target.value)}
          style={{ border: 'none' }}
          placeholder='Enter coupon'
        />
        <Button
          type='btn'
          color='transparent'
          className='text-end'
          onClick={e => CouponCheck(e)}
          style={{ color: '#0A3161' }}
        >
          Apply
        </Button>
      </div>
      {store.couponErrMsg ? (
        <span className='text-danger'>{store.couponErrMsg}</span>
      ) : null}
    </div>
  )
}

export default Coupon
