// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

const url = 'https://admin.smartstartnow.com/api/'

export const getMyCourses = createAsyncThunk('myCourses/getCourses', async () => {
  const response = await axios.all([
    axios.get(`${url}order?status=0`),
    axios.get(`${url}order?status=1&filter=0`),
    axios.get(`${url}order?status=1&filter=1`),
  ])

  return response
})

export const getChildren = createAsyncThunk('myCourses/getChildren', async () => {
  const response = await axios.get(`${url}child-list`)

  return response
})

// user_id
// course_semester_id
export const assignCourse = createAsyncThunk(
  'myCourses/assignCourse',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios({ url: `${url}assign-course`, method: 'post', data })
      return response
    } catch (err) {
      if (!err.response) {
        throw err
      }

      return rejectWithValue(err.response.data)
    }
  }
)

const myCourses = createSlice({
  name: 'myCourses',
  initialState: {
    isLoading: false,
    success: false,
    purchasedUnassignedCourses: [],
    purchasedAssignedCourses: [],
    notPurchasedCourses: [],
    assignCourseError: '',
    children: [],
  },
  reducers: {
    clearAssignCourseError: state => {
      state.assignCourseError = ''
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getMyCourses.pending, state => {
        state.isLoading = true
        state.success = false
        state.assignCourseError = ''
      })
      .addCase(getMyCourses.fulfilled, (state, { payload }) => {
        state.notPurchasedCourses = payload[0].data.data
        state.purchasedUnassignedCourses = payload[1].data.data
        state.purchasedAssignedCourses = payload[2].data.data
        state.isLoading = false
      })
      .addCase(getMyCourses.rejected, state => {
        state.isLoading = false
        state.success = false
      })
      .addCase(assignCourse.fulfilled, (state, { payload }) => {
        state.success = payload.data.success
      })
      .addCase(assignCourse.rejected, (state, { payload }) => {
        state.assignCourseError = payload.message
      })
      .addCase(getChildren.fulfilled, (state, { payload }) => {
        state.children = payload.data.children.data
      })
  },
})

export const { clearAssignCourseError } = myCourses.actions

export default myCourses.reducer
