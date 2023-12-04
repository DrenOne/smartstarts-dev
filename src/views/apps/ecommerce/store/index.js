// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { Cell } from 'recharts'

const url = 'https://admin.smartstartnow.com/api/'

export const getProducts = createAsyncThunk('appEcommerce/getProducts', async params => {
  const response = await axios.get('https://admin.smartstartnow.com/api/course', { params })
  return { params, data: response.data.data }
  // const response = await axios.get('/apps/ecommerce/products', { params })
  // return { params, data: response.data }
})

export const getMyCoursesDetail = createAsyncThunk('appEcommerce/getMyCoursesDetail', async () => {
  const response = await axios.all([
    axios.get(`${url}order?status=1&filter=0`),
    axios.get(`${url}order?status=1&filter=1`),
  ])

  return response
})

export const getCoupon = createAsyncThunk('appEcommerce/getCoupon', async (coupon, { rejectWithValue }) => {
  if (coupon) {
    try {
      const response = await axios
        .get(`https://admin.smartstartnow.com/api/coupon/${coupon}`)
        .then(res => res.data.data)
        // .catch(() => false)

      return response
    } catch (error) {
      if (!error.response) {
        throw error
      }

      return rejectWithValue(error.response.status === 404 ? 'The coupon code entered is not valid for this course.' : error?.response?.data?.error)
    }
  }
  // return false
})
export const getGrade = createAsyncThunk('appEcommerce/getGrade', async params => {
  const response = await axios.get('https://admin.smartstartnow.com/api/grade', { params })
  return { params, data: response.data.data.data }
  // const response = await axios.get('/apps/ecommerce/products', { params })
  // return { params, data: response.data }
})

export const getProgram = createAsyncThunk('appEcommerce/program', async params => {
  const response = await axios.get('https://admin.smartstartnow.com/api/program', { params })
  return { params, dataProgram: response.data.data.data }
})

export const getTotalSum = createAsyncThunk('appEcommerce/getTotalSum', async params => {
  return params
})

export const allUserRegData = createAsyncThunk('appEcommerce/allUserRegData', async params => {
  return params
})

export const addToCartState = createAsyncThunk(
  'appEcommerce/addToCartState',
  async (item, { getState }) => {
    const rootState = getState()
    let AllData = []
    let FilterDataState = []

    const returnedTarget = Object.assign(item)
    AllData = item.allSemester.map(i => {
      return { ...returnedTarget, allSemester: i }
    })
    const ItemIdlari = item.allSemester.map(el => {
      return el.id
    })

    if (rootState.ecommerce.cartState.length) {
      FilterDataState = rootState.ecommerce.cartState.filter(el => {
        if (!ItemIdlari.includes(el.allSemester.id)) {
          return el
        }
      })
      return [...FilterDataState, ...AllData]
    }
    return [...rootState.ecommerce.cartState, ...AllData]
  }
)

export const delToCartState = createAsyncThunk('appEcommerce/delToCartState', async data => {
  return data
})
export const refreshCart = createAsyncThunk('appEcommerce/refreshCart', async data => {
  return data
})
export const getDisCount = createAsyncThunk('appEcommerce/getDisCount', async () => {
  const response = await axios.get('https://admin.smartstartnow.com/api/discount/academic-year')
  return response.data
})

export const getWishlistItems = createAsyncThunk('appEcommerce/getWishlistItems', async () => {
  const response = await axios.get('/apps/ecommerce/wishlist')
  return response.data
})

export const deleteWishlistItem = createAsyncThunk(
  'appEcommerce/deleteWishlistItem',
  async (id, { dispatch }) => {
    const response = await axios.delete(`/apps/ecommerce/wishlist/${id}`)
    dispatch(getWishlistItems())
    return response.data
  }
)

export const getCartItems = createAsyncThunk('appEcommerce/getCartItems', async () => {
  const response = await axios.get('https://admin.smartstartnow.com/api/order?status=0')

  return response.data.data.data
})

export const addToCart = createAsyncThunk(
  'appEcommerce/addToCart',
  async (params, { dispatch }) => {
    let response = {}
    if (params.bundle) {
      response = await axios.post(
        `https://admin.smartstartnow.com/api/order/${params.id}?bunlde=1`,
        { count: params.count }
      )
    } else {
      response = await axios.post(`https://admin.smartstartnow.com/api/order/${params.id}`, {
        count: params.count,
      })
    }

    dispatch(getCartItems())
    // await dispatch(getProducts(getState().ecommerce.params))
    // dispatch(getCartItems())
    return response.data.success
  }
)
export const payState = createAsyncThunk('appEcommerce/payState', async data => {
  const formData = new FormData()
  formData.append('first_name', data.first_name)
  formData.append('last_name', data.last_name)
  formData.append('phone', data.phone)
  formData.append('email', data.email)
  formData.append('token', data.token)
  formData.append('address', data.checkoutAddress)
  formData.append('city', data.checkoutCity)
  formData.append('state', data.checkoutState)
  formData.append('zip_code', data.checkoutZipcode)
  formData.append('price', data.price)
  data.courses.map(course => formData.append('course_day_ids[]', course))

  if (data.coupon) formData.append('discount_code', data.coupon)

  const response = await axios.post(`https://admin.smartstartnow.com/api/guest-order`, formData)
  return response
})

export const client_secret = createAsyncThunk('appEcommerce/client_secret', async data => {
  const formData = new FormData()
  formData.append('first_name', data.first_name)
  formData.append('last_name', data.last_name)
  formData.append('phone', data.phone)
  // formData.append('email', data.email)
  // formData.append('token', data.token)
  formData.append('address', data.checkoutAddress)
  formData.append('city', data.checkoutCity)
  formData.append('state', data.checkoutState)
  formData.append('zip_code', data.checkoutZipcode)
  formData.append('price', data.price)

  if (data.coupon) formData.append('discount_code', data.coupon)

  const response = await axios.post(
    `https://admin.smartstartnow.com/api/order-payment-intent`,
    formData
  )

  return response.data.data.client_secret
})

export const client_secret_no_auth = createAsyncThunk(
  'appEcommerce/client_secret_no_auth',
  async (data, { rejectWithValue }) => {
    const formData = new FormData()
    formData.append('first_name', data.first_name)
    formData.append('last_name', data.last_name)
    formData.append('phone', data.phone)
    formData.append('email', data.email)
    // formData.append('token', data.token)
    formData.append('address', data.checkoutAddress)
    formData.append('city', data.checkoutCity)
    formData.append('state', data.checkoutState)
    formData.append('zip_code', data.checkoutZipcode)
    formData.append('price', data.price)
    data.courses.map(course => formData.append('course_day_ids[]', course))

    try {
      if (data.coupon) formData.append('discount_code', data.coupon)

      const response = await axios.post(
        `https://admin.smartstartnow.com/api/guest-order-intent`,
        formData
      )

      return response.data.data
    } catch (error) {
      if (!error.response) {
        throw error
      }

      return rejectWithValue(error?.response?.data?.error)
    }
  }
)

export const payRegUser = createAsyncThunk('appEcommerce/payRegUser', async data => {
  const formData = new FormData()
  formData.append('first_name', data.first_name)
  formData.append('last_name', data.last_name)
  formData.append('phone', data.phone)
  formData.append('token', data.token)
  formData.append('address', data.checkoutAddress)
  formData.append('city', data.checkoutCity)
  formData.append('state', data.checkoutState)
  formData.append('zip_code', data.checkoutZipcode)
  formData.append('price', data.price)

  if (data.coupon) formData.append('discount_code', data.coupon)

  const response = await axios.post(`https://admin.smartstartnow.com/api/order-payment`, formData)
  return response
})

export const payCheckUser = createAsyncThunk('appEcommerce/payCheckUser', async (data, { rejectWithValue }) => {
  try {
    const formData = new FormData()
    formData.append('first_name', data.first_name)
    formData.append('last_name', data.last_name)
    formData.append('phone', data.phone)
    formData.append('payment_id', data.payment_id)
    formData.append('address', data.checkoutAddress)
    formData.append('city', data.checkoutCity)
    formData.append('state', data.checkoutState)
    formData.append('zip_code', data.checkoutZipcode)
    formData.append('price', data.price)

    if (data.coupon) formData.append('discount_code', data.coupon)

    const response = await axios.post(`https://admin.smartstartnow.com/api/order-payment`, formData)
    return response
  } catch (error) {
    if (!error.response) {
      throw error
    }

    return rejectWithValue(error.response.data)
  }
})

export const successPaymentUrl = createAsyncThunk('appEcommerce/successPaymentUrl', async () => {
  return false
})

export const getProduct = createAsyncThunk('appEcommerce/getProduct', async slug => {
  const response = await axios.get(`https://admin.smartstartnow.com/api/course/${slug}`)

  return { data: response.data.data, days_ids: response.data.data.days_ids }
})

export const addToWishlist = createAsyncThunk('appEcommerce/addToWishlist', async id => {
  await axios.post('/apps/ecommerce/wishlist', { productId: id })
  return id
})

// export const deleteCartItem = createAsyncThunk(
//   "appEcommerce/deleteCartItem",
//   async (id, { dispatch }) => {
//     await axios.delete(`https://admin.smartstartnow.com/api/order/${id}`)
//     dispatch(getCartItems())
//     return id
//   }
// )

export const deleteCourseCartItem = createAsyncThunk(
  'appEcommerce/deleteCartItem',
  async (id, { dispatch }) => {
    await axios.delete(`https://admin.smartstartnow.com/api/order/${id}`)
    dispatch(getCartItems())
    return id
  }
)
export const disCountDataSort = createAsyncThunk('appEcommerce/checkout', async data => {
  return data
})

export const checkout = createAsyncThunk('appEcommerce/checkout', async test => {
  return test
})

export const getFilterCourses = createAsyncThunk('appEcommerce/getFilter', async () => {
  const response = await axios.all([
    axios.get(`${url}grade`),
    axios.get(`${url}program`),
    axios.get(`${url}subject`),
    axios.get(`${url}year-list`),
  ])

  return response
})

export const getPrograms = createAsyncThunk('appEcommerce/getPrograms', async () => {
  const response = await axios.get(`${url}program`)

  return response
})

export const filterCourses = createAsyncThunk('appEcommerce/filter', async params => {
  const response = await axios({
    method: 'GET',
    url: `${url}course`,
    params,
  })

  return response.data.data.data
})

//Contact

export const contactPost = createAsyncThunk('appEcommerce/contactPost', async params => {
  // console.log(params)
  const response = await axios.post(`https://admin.smartstartnow.com/api/contact-form`, {
    ...params,
  })

  return response
})

//Child
export const getChildList = createAsyncThunk('appEcommerce/getChildList', async params => {
  const response = await axios.get(
    `https://admin.smartstartnow.com/api/child-list?name=${params.name || ''}&page=${
      params.page || 1
    }`
  )

  return response.data.children.data
})
export const postNewChild = createAsyncThunk('appEcommerce/postNewChild', async params => {
  await axios
    .post(`https://admin.smartstartnow.com/api/assign-child`, { ...params })
    .then(res => {
      return res
    })
    .catch(err => {
      return err
    })

  // console.log(response)
  // return response
})
// export const deleteUser = createAsyncThunk('appEcommerce/deleteUser', async (id, { dispatch, getState }) => {
//   await axios.delete(`https://admin.smartstartnow.com/api/delete-child/${id}`)
//   await dispatch(getData(getState().users.params))
//   // await dispatch(getAllData())
//   // await dispatch(getChildList())
//   // await dispatch(getChildList())
//   return id
// })

export const deleteUser = createAsyncThunk('appEcommerce/deleteUser', async id => {
  const response = await axios.delete(`https://admin.smartstartnow.com/api/delete-child/${id}`)

  return response
})

export const paypalState = createAsyncThunk('appEcommerce/paypalState', async data => {
  const response = await axios({
    baseURL: 'https://admin.smartstartnow.com/api/payment-paypal',
    method: 'post',
    data,
  })

  return response
})

export const getRelatedCourse = createAsyncThunk('getRelatedCourse', async id => {
  const { data } = await axios.get(`${url}course/related/${id}`)

  return data
})

export const appEcommerceSlice = createSlice({
  name: 'appEcommerce',
  initialState: {
    isLoading: false,
    isLoadingProduct: false,
    cart: [],
    params: {},
    products: [],
    wishlist: [],
    totalProducts: 0,
    productDetail: {},
    data: [],
    dataGrade: [],
    dataProgram: [],
    checkout: false,
    addCart: false,
    cartState: [],
    filter: {},
    programs: [],
    getTotal: 0,
    disCount: {},
    coupon: {},
    couponErrMsg: '',
    disCountSort: [],
    userRegData: {},
    payment: false,
    child: [],
    childSuccess: false,
    myCourseDetail: [],
    relatedLoading: false,
    relatedCourse: [],
    error: '',
    paypal: '',
    client_secret: '',
    client_secret_error: '',
    addChildLoading: false,
    addChildSuccess: '',
    addChildError: '',
  },
  reducers: {
    changeCoupon: state => {
      state.coupon = true
    },
    changePayment: state => {
      state.coupon = true
    },
    deleteCart: state => {
      state.cartState = []
      localStorage.removeItem('course')
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getProducts.pending, state => {
        state.isLoading = true
        state.data = []
      })
      .addCase(getProduct.pending, state => {
        state.isLoadingProduct = true
        state.data = []
      })
      .addCase(payRegUser.pending, state => {
        state.isLoading = true
      })
      .addCase(payCheckUser.pending, state => {
        state.isLoading = true
      })
      .addCase(payState.pending, state => {
        state.isLoading = true
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        // state.params = action.payload.params
        // state.products = action.payload.data.products
        // state.totalProducts = action.payload.data.total\
        state.data = action.payload.data
        state.isLoading = false
      })
      .addCase(getProducts.rejected, state => {
        state.isLoading = false
      })
      .addCase(getChildList.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(getChildList.fulfilled, (state, action) => {
        state.isLoading = false
        state.child = action.payload
        state.childSuccess = false
      })
      // .addCase(postNewChild.fulfilled, (state, { payload }) => {
      //   state.childSuccess = payload.data.success
      // })
      .addCase(deleteUser.fulfilled, state => {
        state.childSuccess = true
      })
      .addCase(getGrade.fulfilled, (state, action) => {
        // state.params = action.payload.params
        // state.products = action.payload.data.products
        // state.totalProducts = action.payload.data.total\
        state.dataGrade = action.payload.data
      })
      .addCase(getWishlistItems.fulfilled, (state, action) => {
        state.wishlist = action.payload.products
      })
      .addCase(getDisCount.fulfilled, (state, action) => {
        state.disCount = action.payload
      })
      .addCase(allUserRegData.fulfilled, (state, action) => {
        state.userRegData = action.payload
      })
      .addCase(disCountDataSort.rejected, state => {
        state.disCountSort = action.payload
      })
      .addCase(getCoupon.fulfilled, (state, action) => {
        state.coupon = action.payload
        state.couponErrMsg = ''
      })
      .addCase(getCoupon.rejected, (state, { payload }) => {
        state.coupon = {}
        state.couponErrMsg = payload
      })
      .addCase(addToCartState.fulfilled, (state, action) => {
        state.cartState = action.payload
        localStorage.removeItem('course')
        localStorage.setItem('course', JSON.stringify(action.payload))
      })
      .addCase(getTotalSum.fulfilled, (state, action) => {
        state.getTotal = action.payload
      })
      .addCase(delToCartState.fulfilled, (state, action) => {
        state.cartState = action.payload
        localStorage.removeItem('course')
        localStorage.setItem('course', JSON.stringify(action.payload))
      })
      .addCase(refreshCart.fulfilled, (state, action) => {
        state.cartState = action.payload
        localStorage.removeItem('course')
        localStorage.setItem('course', JSON.stringify(action.payload))
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        let data = []
        const x = action.payload.filter(el => {
          if (el.bundle) {
            return el.day_id
          }
        })
        const BundleDays = x.map(el => el.day_id)
        const BundleSemester = [
          ...new Set(
            x.map(el => {
              if (el.bundle) {
                return el.course_semesters_id
              }
            })
          ),
        ]
        const myFunc = propsId => {
          let day = ''
          let sum = 0
          let obj = {}

          x.map((el, index) => {
            if (BundleDays.includes(el.day_id) && el.course_semesters_id === propsId && el.bundle) {
              day += `${days[el.day_id]} ` + `${x.length - 1 !== index ? ',' : ''}`
              sum += el?.lesson_count
              obj = el
            }
          })
          return { ...obj, day: day, lesson_count: sum, bundle: true }
        }
        const filterData = action.payload.filter(el => {
          if (!el.bundle) {
            return el
          }
        })
        data = [...filterData]
        BundleSemester.map(el => {
          const getFunc = myFunc(el)
          data.push(getFunc)
        })
        state.cart = data
        state.addCart = false
      })
      .addCase(getProduct.fulfilled, (state, { payload }) => {
        //   console.log(payload.data)
        // //   const olddays = new Array(...action.payload.days_ids)
        //   const x = payload.data.days_ids.map(el => {
        //   el.semester.name = "Full"
        //   // el.id = 123456789
        //   return el
        //  })
        //  console.log(payload.days_ids)
        //   const y = { id:123456789, name:"Full"}
        //   payload.data.semesters = [...payload.data.semesters, y]
        //   payload.data.days_ids = [...x, ...payload.days_ids]
        state.productDetail = payload.data
        state.isLoadingProduct = false
      })
      .addCase(getProduct.rejected, state => {
        state.error = 'false'
        state.isLoadingProduct = false
      })
      .addCase(getProgram.fulfilled, (state, action) => {
        state.dataProgram = action.payload.dataProgram
      })
      .addCase(checkout.fulfilled, (state, action) => {
        state.checkout = action.payload
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.addCart = action.payload
      })
      .addCase(payState.fulfilled, (state, action) => {
        state.payment = action.payload
        state.isLoading = false
      })
      .addCase(client_secret.fulfilled, (state, { payload }) => {
        state.client_secret = payload
      })
      .addCase(client_secret.rejected, (state, { payload }) => {
        state.client_secret = payload
      })
      .addCase(client_secret_no_auth.fulfilled, (state, { payload }) => {
        state.client_secret = payload.client_secret
        localStorage.setItem('accessToken', JSON.stringify(payload.token))
      })
      .addCase(client_secret_no_auth.rejected, (state, { payload }) => {
        toast.error(payload)
        state.coupon = {}
        state.client_secret_error = payload
      })
      .addCase(payRegUser.fulfilled, (state, action) => {
        state.payment = action.payload
        state.isLoading = false
      })
      .addCase(payCheckUser.fulfilled, (state, { payload }) => {
        state.payment = payload.success
        state.isLoading = false
      })
      .addCase(payState.rejected, state => {
        state.payment = 'error'
        state.isLoading = false
      })
      .addCase(payRegUser.rejected, state => {
        state.payment = 'error'
        state.isLoading = false
      })
      .addCase(payCheckUser.rejected, (state, { payload }) => {
        toast.error(payload.error)
        state.payment = 'error'
        state.isLoading = false
        state.payment = false
      })
      .addCase(successPaymentUrl.fulfilled, (state, action) => {
        state.payment = action.payload
      })
      .addCase(getFilterCourses.fulfilled, (state, { payload }) => {
        state.filter = {
          grades: payload[0].data.data.data,
          programs: payload[1].data.data.data,
          subjects: payload[2].data.data.data,
          years: payload[3].data.data,
        }
      })
      .addCase(getPrograms.fulfilled, (state, { payload }) => {
        state.programs = payload.data.data.data
      })
      .addCase(filterCourses.fulfilled, (state, { payload }) => {
        state.data = payload
      })
      .addCase(getMyCoursesDetail.fulfilled, (state, { payload }) => {
        state.myCourseDetail = [...payload[0]?.data.data.data, ...payload[1]?.data.data.data]
      })
      .addCase(paypalState.fulfilled, (state, { payload }) => {
        state.paypal = payload
      })
      .addCase(paypalState.rejected, (state, { payload }) => {
        state.paypal = payload
      })
      .addCase(getRelatedCourse.pending, state => {
        state.relatedLoading = true
      })
      .addCase(getRelatedCourse.fulfilled, (state, { payload }) => {
        state.relatedLoading = false
        state.relatedCourse = payload.data.map(course => {
          return {
            ...course,
            value: course.slug,
            label: `${course.term} - ${Number(course.term) + 1}`,
            term: Number(course.term),
          }
        })
      })
      .addCase(getRelatedCourse.rejected, state => {
        state.relatedLoading = false
      })
      .addCase(postNewChild.pending, state => {
        state.addChildLoading = true
        state.addChildSuccess = ''
        state.addChildError = ''
      })
      .addCase(postNewChild.fulfilled, (state, { payload }) => {
        state.addChildLoading = false
        state.addChildSuccess = payload
        state.addChildError = ''
      })
      .addCase(postNewChild.rejected, (state, { payload }) => {
        state.addChildLoading = false
        state.addChildSuccess = ''
        state.addChildError = payload
      })
  },
})

export const { changeCoupon, changePayment, deleteCart } = appEcommerceSlice.actions

export default appEcommerceSlice.reducer
