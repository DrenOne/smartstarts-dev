// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Custom Components
import classnames from 'classnames'

// ** Reactstrap Imports
import { CardBody, Button, Input, Label } from 'reactstrap'

// ** illustration import
import illustration from '@src/assets/images/pages/calendar-illustration.png'

// ** Filters Checkbox Array
//   { label: 'Personal', color: 'danger', className: 'form-check-danger mb-1' },
//   { label: 'Business', color: 'primary', className: 'form-check-primary mb-1' },
//   { label: 'Family', color: 'warning', className: 'form-check-warning mb-1' },
//   { label: 'Holiday', color: 'success', className: 'form-check-success mb-1' },
//   { label: 'ETC', color: 'info', className: 'form-check-info' }
// ]


// const color = ["primary", "danger", "warning", 'success', "info", "dark"]
const SidebarLeft = props => {
  // ** Props
  const { handleAddEventSidebar, toggleSidebar, updateFilter, updateAllFilters, store, dispatch } = props
  const [filters, setFilters] = useState([])

  // ** Function to handle Add Event Click
  useEffect(() => {
     if (store.alldata.length >= 1) {
      const filter = store.alldata.map((el) => {
      // const x = { label: el?.title, color: color[i] || "danger", className: `form-check-${color[i]} mb-1` }
            const x = { label: el?.title, color: "primary", className: `form-check-primary  mb-1`, id:el.course_days_id, semester_name:el.semester_name, day_name:el.day_name, start_time:el.start_time}

      return x
    })
    setFilters(filter)
     } else {
      setFilters([])
     }
  }, [store])
  const handleAddEventClick = () => {
    toggleSidebar(false)
    handleAddEventSidebar()
  }

  return (
    <Fragment>

      <div className='sidebar-wrapper'>
        <CardBody className='card-body d-flex justify-content-center my-sm-0 mb-3'>
          <Button color='primary' block onClick={handleAddEventClick}>
            <span className='align-middle'>Add Event</span>
          </Button>
        </CardBody>
        <CardBody>
          <h5 className='section-label mb-1'>
            <span className='align-middle'>Filter</span>
          </h5>
          <div className='form-check mb-1'>
            <Input
              id='view-all'
              type='checkbox'
              label='View All'
              className='select-all'
              checked={store.selectedCalendars.length === filters.length}
              onChange={e => dispatch(updateAllFilters(e.target.checked))}
            />
            <Label className='form-check-label' for='view-all'>
              View All
            </Label>
          </div>
          <div className='calendar-events-filter'>
            {(filters.length &&
              filters.map(filter => {
                return (
                  <div
                    key={`${filter.label}-key`}
                    className={classnames('form-check', {
                      [filter.className]: filter.className
                    })}
                  >
                    <Input
                      type='checkbox'
                      key={filter.label}
                      label={filter.label}
                      className='input-filter'
                      id={`${filter.label}-event`}
                      checked={store.selectedCalendars.includes(filter.id)}
                      onChange={() => {
                        dispatch(updateFilter(filter.id))
                      }}
                    />
                    <Label className='form-check-label' >
                      {filter.label.split('(')[0]} <br/>
                      ({filter.semester_name}, {filter.day_name}, {filter.start_time})
                    </Label>
                  </div>
                )
              })) || ""}
          </div>
        </CardBody>
      </div>
      <div className='mt-auto'>
        <img className='img-fluid' src={illustration} alt='illustration' />
      </div>
    </Fragment>
  )
}

export default SidebarLeft
