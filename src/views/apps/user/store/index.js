// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import moment from 'moment/moment'

export const getAllData = createAsyncThunk('appUsers/getAllData', async () => {
  const response = await axios.get('/api/users/list/all-data')
  return response.data
})

export const getData = createAsyncThunk('appUsers/getData', async params => {
  const response = await axios.get('/api/users/list/data', params)
  return {
    params,
    data: response.data.users,
    totalPages: response.data.total
  }
})

export const getUser = createAsyncThunk('appUsers/getUser', async id => {
  const response = await axios.get(`https://admin.smartstartnow.com/api/child-show/${id}`)

  return response.data.children
})

export const getStudentListTutor = createAsyncThunk('appUsers/getStudentListTutor', async id => {
  const response = await axios.get(`https://admin.smartstartnow.com/api/course/student-list/${id}`)
  return response.data.data
})

export const addUser = createAsyncThunk('appUsers/addUser', async (user, { dispatch, getState }) => {
  await axios.post('/apps/users/add-user', user)
  await dispatch(getData(getState().users.params))
  await dispatch(getAllData())
  return user
})

export const addHomeworkAPI = createAsyncThunk('appUsers/addHomework', async (user, {dispatch}) => {
  const s = []
  const formData = new FormData()
  const media = user.media.map(el => {
     formData.append("homeworks[1][file]", el)
   }) 
  formData.append("homeworks[1][title]", user.title)
  formData.append("homeworks[1][date_to]", user.describe)
  formData.append("homeworks[1][text]", user.text)
  formData.append("theme_id", user.lectureId)


  await axios({url:'https://admin.smartstartnow.com/api/homework/store', method:"POST", data:formData})
  await dispatch(getStudentListTutor(user.courseId))
  return user
})

export const updateHomework = createAsyncThunk('appUsers/updateHomework', async (user, {dispatch}) => {
  const formData = new FormData()

     formData.append("date_to",  user.describe)
     formData.append("text",  user.text)
     formData.append("title",  user.title)
     if (user.media.length > 0) {
      formData.append("file",  user.media[0])

     }
 const x = await axios.post(`https://admin.smartstartnow.com/api/homework/update/${user.id}`, formData )

//  const t =  await axios({url:`https://admin.smartstartnow.com/api/homework/update/${user.id}`, method:"POST", formData})
  await dispatch(lectureShow(user.lectureId))
  await dispatch(homeworkShow(user.id))
  return user
})

// lecture
export const addLectureAPI = createAsyncThunk('appUsers/addLecture', async (user, { dispatch, rejectWithValue }) => {

  try {
    const formData = new FormData()
    const media = user.media.map(el => formData.append("file[]", el))
    formData.append("course_day_id", user.id)
    formData.append("title", user.title)
    formData.append("description", user.describe)
    formData.append("text", user.text)

    await axios.post('https://admin.smartstartnow.com/api/theme/store', formData )
    await dispatch(getStudentListTutor(user.id))
    return user
  } catch (err) {
    if (!err.response) {
      throw err
    }

    return rejectWithValue(err.response.data)
  }
})

export const updateLectureAPI = createAsyncThunk('appUsers/updateLectureAPI', async (user, {dispatch}) => {
  try {
    const formData = new FormData()
    user.media.length > 0 && user.media.map(el => formData.append("file[]", el))

    // formData.append("course_day_id", user.id)
    user.title && formData.append("title", user.title)
    user.describe && formData.append("description", user.describe)
    user.text && formData.append("text", user.text)

    await axios.post(`https://admin.smartstartnow.com/api/theme/update/${user.lectureId}`, formData )
    await dispatch(getStudentListTutor(user.id))
    return user
  } catch (err) {
    if (!err.response) {
      throw err
    }

    return rejectWithValue(err.response.data)
  }
})


export const lectureShow = createAsyncThunk('appUsers/lectureShow', async (id, {dispatch}) => {
  const res = await axios.get(`https://admin.smartstartnow.com/api/theme/show/${id}`)
  res.data.data.files.map(el => {
    dispatch(getImg({id:el.file, fileId:el.id}))
  })

  return [res.data.data]
})

export const homeworkShow = createAsyncThunk('appUsers/homeworkShow', async (id, {dispatch}) => {
  const res = await axios.get(`https://admin.smartstartnow.com/api/homework/show/${id}`)
  const r = await axios.get(`https://admin.smartstartnow.com/api/file/${res.data.data.file}`, {responseType:"arraybuffer"})
  const d = Buffer.from(r.data).toString('base64')
  const typePhoto = await axios.get(`https://admin.smartstartnow.com/api/file-get/${res.data.data.file}`)
  const x = typePhoto.data.data.type.split(".")
  let type = ""
  if (x[x.length-1] === "jpg" || x[x.length-1] === "apng" || x[x.length-1] === "png" || x[x.length-1] === "jpeg" || x[x.length-1] === "gif" || x[x.length-1] === "svg"){
    type="image"
  } else if (x[x.length-1] === "mp4"){
    type = "video"
  } else {
    type = "file"
    const arr = new Uint8Array(r.data)
      const blob = new Blob([arr], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const data = {...res.data.data, url, type, blob}
  return data
  }
  const data = {...res.data.data, url:d, type}
  return data
})

export const deletelecturePhoto = createAsyncThunk('appUsers/deletelecturePhoto', async (params, { dispatch, getState }) => {
  const response = await axios.delete(`https://admin.smartstartnow.com/api/theme/delete-file/${params.id}`)
  await dispatch(getStudentListTutor(params.courseId))
  await dispatch(lectureShow(params.lectureId))
  // return response.data
})

export const deletelecture = createAsyncThunk('appUsers/deletelecture', async (params, { dispatch }) => {
  await axios.delete(`https://admin.smartstartnow.com/api/theme/delete/${params.id}`)
  await dispatch(getStudentListTutor(params.courseId))
})

export const deletehomework = createAsyncThunk('appUsers/deletelecture', async (params, { dispatch }) => {
  await axios.delete(`https://admin.smartstartnow.com/api/homework/delete/${params.id}`)
  await dispatch(getStudentListTutor(params.courseId))
})

export const getImg = createAsyncThunk('appUsers/getImg', async (params) => {
  const r = await axios.get(`https://admin.smartstartnow.com/api/file/${params.id}`, {responseType:"arraybuffer"})
    const typePhoto = await axios.get(`https://admin.smartstartnow.com/api/file-get/${params.id}`)
    const x = typePhoto.data.data.type.split(".")

    if (x[x.length-1] === "jpg" || x[x.length-1] === "apng" || x[x.length-1] === "png" || x[x.length-1] === "jpeg" || x[x.length-1] === "gif" || x[x.length-1] === "svg"){
      const d = Buffer.from(r.data).toString('base64')
      return {url:d, id:params.id, type:"image", fileId:params.fileId}

    } else if (x[x.length-1] === "mp4"){
      const videoUrl = await axios.get(`https://admin.smartstartnow.com/api/file-url/${params.id}`)
      // const arr = new Uint8Array(r.data)
      // const blob = new Blob([arr], { type: 'application/pdf' })
      // const url = URL.createObjectURL(blob)
      return {url:videoUrl.data.data.url, id:params.id, type:"video", fileId:params.fileId}

    } else {
      const arr = new Uint8Array(r.data)
      const blob = new Blob([arr], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      return {url:url, id:params.id, type:"file", fileId:params.fileId, blob}
    }
})

export const getFileHomework = createAsyncThunk('appUsers/getFileHomework', async (id, { }) => {

  const r = await axios.get(`https://admin.smartstartnow.com/api/file/${id}`, {responseType:"arraybuffer"})
    const arr = new Uint8Array(r.data)
    const blob = new Blob([arr], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    return {url:url, id, type:"file"}
})

export const getPdf = createAsyncThunk('appUsers/getPdf', async (params, {getState}) => {
  const rootState = getState()
  // console.log(rootState.users)
  // console.log(params)

  const r = await axios.get(`https://admin.smartstartnow.com/api/file/${params.id}`, {responseType:"arraybuffer"})
    const arr = new Uint8Array(r.data)
    const blob = new Blob([arr], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    const x = {url:url, id:params.id, type:"file", homeworkId:params.homeworkId, mark:params.mark}
    // console.log(rootState.users.pdffile)
    return x
})

export const studentsHomeworks = createAsyncThunk('appUsers/studentsHomeworks', async (id, { getState }) => {
  const response = await axios.get(`https://admin.smartstartnow.com/api/student-answer/list/${id}`)
  return response.data.data
})

export const addScore = createAsyncThunk('appUsers/addScore', async (data, {dispatch}) => {
  const formData = new FormData()

  formData.append("mark",  data.mark)
  await axios.post(`https://admin.smartstartnow.com/api/student-answer/put-mark/${data.id}`, formData )
  dispatch(studentsHomeworks(data.homework_id))
})

export const delAllImg = createAsyncThunk('appUsers/delAllImg', async () => {
  return []
})

export const checkedFile = createAsyncThunk('appUsers/checkedFile', async (data) => {
  const formData = new FormData()

  formData.append("checked_file",  data.file)
  await axios.post(`https://admin.smartstartnow.com/api/student-answer/checked-file/${data.id}`, formData )
})

export const sendStudentHomework = createAsyncThunk('appUsers/studentHomework', async data => {
  const formData = new FormData()

  formData.append('file',  data.file)
  formData.append('homework_id', data.id)
  await axios.post('https://admin.smartstartnow.com/api/student-answer/store', formData)
})

export const editTutor = createAsyncThunk('appsUsers/editUser', async data => {
  const response = await axios({
    method: 'post',
    url: `https://smartstarts.drensys.com/api/tutor/update/${ data.id }`,
    data: data.data
  })

  return response.data
})

export const editStudent = createAsyncThunk('appsUsers/editStudent', async data => {
  const response = await axios({
    method: 'post',
    url: `https://smartstarts.drensys.com/api/update-child/${ data.id }`,
    data: data.data
  })

  return response.data
})

export const clearStudentsHomeworks = createAsyncThunk('appUsers/clearStudentsHomeworks', ()  => {
 return []
})

export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    isLoading: false,
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectedUser: {},
    allStudents:[],
    lecture:[],
    lectureNew:[],
    homeworkState:[],
    homeworkAll:[],
    photoAll:[],
    isLoadingLecture:true,
    studentsHomeworks:[],
    checked_file:"",
    pdffile: [],
    success: false,
    addEditLectureSuccess: '',
    addEditLectureError: ''
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllData.fulfilled, (state, action) => {
        state.allData = action.payload
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.totalPages
      })
      .addCase(getUser.pending, state => {
        state.isLoading = true
      })
      .addCase(checkedFile.fulfilled, (state, action) => {
        state.checked_file = action.payload
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.selectedUser = action.payload
        state.isLoading = false
      })
      .addCase(getUser.rejected, state => {
        state.isLoading = false
      })
      .addCase(getStudentListTutor.pending, state => {
        state.isLoading = true
      })
      .addCase(getStudentListTutor.fulfilled, (state, action) => {
        state.allStudents = action.payload
        state.isLoading = false
      })
      .addCase(getStudentListTutor.rejected, state => {
        state.isLoading = false
      })
      .addCase(clearStudentsHomeworks.fulfilled, state => {
        state.studentsHomeworks = []
      })
      .addCase(studentsHomeworks.pending, state => {
        state.isLoading = true
      })
      .addCase(studentsHomeworks.fulfilled, (state, action) => {
        const x = state.studentsHomeworks.filter(el => el?.id !== action.payload[0]?.id)
        state.studentsHomeworks = [...x, ...action.payload]
        state.isLoading = false
      })
      .addCase(studentsHomeworks.rejected, state => {
        state.isLoading = false
      })
      // .addCase(studentsHomeworks.fulfilled, (state, action) => {
      //   const x = state.studentsHomeworks.filter(el => el.id !== action.payload.id)
      //   state.studentsHomeworks = [...action.payload]
      //   state.isLoading = false
      // })
      .addCase(lectureShow.pending, state => {
        // state.isLoadingLecture = true
        state.photoAll = []
      })
      .addCase(delAllImg.fulfilled, state => {
        // state.isLoadingLecture = true
        state.photoAll = []
      })
      .addCase(lectureShow.fulfilled, (state, action) => {
        state.lecture = action.payload[0]
        state.lectureNew = [action.payload[0]]
        state.homeworkAll = action.payload[1]
        state.homeworkState = []
        state.studentsHomeworks = []
      })
      .addCase(homeworkShow.fulfilled, (state, action) => {
        state.homeworkState = []
        state.homeworkState = action.payload
      })
      .addCase(getImg.fulfilled, (state, action) => {
        const newState = state.photoAll.filter(el => {
         return  action.payload.id !== el.id
          })
        state.photoAll = [...newState, action.payload]
        state.isLoadingLecture = false

      })
      .addCase(getFileHomework.fulfilled, (state, action) => {
        state.photoAll = [action.payload]
        state.isLoadingLecture = false
      })
      .addCase(getPdf.fulfilled, (state, { payload }) => {
        const x = state.pdffile.filter(el => {
          el.id !== payload.id
        })
        state.pdffile = [...state.pdffile, payload]
      })
      .addCase(getImg.rejected, state => {
        state.isLoadingLecture = false
      })
      .addCase(addLectureAPI.fulfilled, (state, { payload }) => {
        state.addEditLectureSuccess = payload.success
      })
      .addCase(addLectureAPI.rejected, (state, { payload }) => {
        state.addEditLectureError = payload?.message
      })
      .addCase(updateLectureAPI.fulfilled, (state, { payload }) => {
        state.addEditLectureSuccess = payload
      })
      .addCase(updateLectureAPI.rejected, (state, { payload }) => {
        state.addEditLectureError = payload
      })
      .addCase(editTutor.pending, state => {
        state.isLoading = true
        state.success = false
      })
      .addCase(editTutor.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.success = payload.success
      })
      .addCase(editStudent.pending, state => {
        state.isLoading = true
        state.success = false
      })
      .addCase(editStudent.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.success = payload.success
      })
  }
})

export default appUsersSlice.reducer
