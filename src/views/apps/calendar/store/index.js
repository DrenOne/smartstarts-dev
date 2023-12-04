// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const fetchEvents = createAsyncThunk('appCalendar/fetchEvents', async calendars => {
  // const response = await axios.get('/apps/calendar/events', { calendars })
  // return response.data
  const getUserData = JSON.parse(localStorage.getItem('userData'))
  let response = []
  if (getUserData.role === 'student' || getUserData.role === 'user') {
    response = await axios.get(
      `https://admin.smartstartnow.com/api/student-schedule?student_id=${calendars}`
    )
  } else if ((getUserData.role = 'tutor')) {
    response = await axios.get(
      `https://admin.smartstartnow.com/api/tutor-schedule?tutor_id=${calendars}`
    )
  }
  const addHours = (cHours, aHours) => {
    let hours = 0
    if (Number(cHours.split(':')[1])) {
      hours = Number(cHours.split(':')[0]) + aHours
      hours = hours + ':' + cHours.split(':')[1]
    } else {
      hours = Number(cHours.split(':')[0]) + aHours
      hours = hours + ':00'
    }

    return hours
  }
  const event = response.data.data.map(el => {
    const newEl = {
      course_days_id: el.course_days_id,
      course_id: el.course_id,
      course_time_id: el.course_time_id,
      day_id: el.day_id,
      day_name: el.day_name,
      end_time: el.end_time,
      semester_id: el.semester_id,
      semester_name: el.semester_name,
      start_time: el.start_time,
      // title:el.course_name,
      title: el.course_name,
      startTime: addHours(el.start_time, 12),
      endTime: addHours(el.end_time, 12),
      daysOfWeek: [el.day_id],
      startRecur: el.start_date,
      endRecur: el.end_date,
      student_count: el.student_count,
      lesson_count: el.lesson_count,
    }
    return newEl
  })
  return event
})

export const addEvent = createAsyncThunk(
  'appCalendar/addEvent',
  async (event, { dispatch, getState }) => {
    await axios.post('/apps/calendar/add-event', { event })
    await dispatch(fetchEvents(getState().calendar.selectedCalendars))
    return event
  }
)

export const delCalendarEvents = createAsyncThunk('appCalendar/delCalendarEvents', async () => {
  return []
})
export const updateEvent = createAsyncThunk('appCalendar/updateEvent', async event => {
  // await axios.post('/apps/calendar/update-event', { event })
  // await dispatch(fetchEvents(getState().calendar.selectedCalendars))
  return event
})

export const updateFilter = createAsyncThunk('appCalendar/updateFilter', async filter => {
  // if (getState().calendar.selectedCalendars.includes(filter)) {
  //   await dispatch(fetchEvents(getState().calendar.selectedCalendars.filter(i => i !== filter)))
  // } else {
  //   await dispatch(fetchEvents([...getState().calendar.selectedCalendars, filter]))
  // }
  return filter
})

export const updateAllFilters = createAsyncThunk('appCalendar/updateAllFilters', async value => {
  // if (value === true) {
  //   await dispatch(fetchEvents(['Personal', 'Business', 'Family', 'Holiday', 'ETC']))
  // } else {
  //   await dispatch(fetchEvents([]))
  // }
  return value
})

export const removeEvent = createAsyncThunk('appCalendar/removeEvent', async id => {
  await axios.delete('/apps/calendar/remove-event', { id })
  return id
})

export const appCalendarSlice = createSlice({
  name: 'appCalendar',
  initialState: {
    isLoading: false,
    events: [],
    selectedEvent: {},
    selectedCalendars: [],
    alldata: [],
  },
  reducers: {
    selectEvent: (state, action) => {
      state.selectedEvent = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(delCalendarEvents.fulfilled, state => {
        state.events = []
        state.alldata = []
        state.selectedCalendars = []
      })
      .addCase(fetchEvents.pending, state => {
        state.isLoading = true
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        if (action.payload) {
          state.events = action.payload
          state.alldata = action.payload
          const x = action.payload.map(el => {
            return el.course_days_id
          })
          state.selectedCalendars = x
        } else {
          state.events = []
          state.alldata = []
          state.selectedCalendars = []
        }
        state.isLoading = false
      })
      .addCase(fetchEvents.rejected, state => {
        state.isLoading = false
      })
      .addCase(updateFilter.fulfilled, (state, action) => {
        if (state.selectedCalendars.includes(action.payload)) {
          state.selectedCalendars.splice(state.selectedCalendars.indexOf(action.payload), 1)
        } else {
          state.selectedCalendars.push(action.payload)
        }
        state.events = state.alldata.filter(el => {
          if (state.selectedCalendars.includes(el.course_days_id)) {
            return el
          }
        })
      })
      .addCase(updateAllFilters.fulfilled, (state, action) => {
        const value = action.payload
        let selected = []
        if (value === true) {
          const x = state.alldata.map(el => {
            return el.course_days_id
          })
          selected = x
          state.events = state.alldata
        } else {
          selected = []
          state.events = []
        }
        state.selectedCalendars = selected
      })
  },
})

export const { selectEvent } = appCalendarSlice.actions

export default appCalendarSlice.reducer
