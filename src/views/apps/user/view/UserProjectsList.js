// ** Reactstrap Imports
import { Card, CardHeader, Progress } from 'reactstrap'

// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { useSelector } from 'react-redux'
let result = []

function progressFunc(row) {
  result = []
  // const x = new Date().toISOString().split('T')[0]
      const start = moment(row.start_date), // Sept. 1st
      
    end   = moment("2023-06-27"), // Nov. 2nd
    day   = 1                   // Sunday

const current = start.clone()

while (current.day(7 + day).isBefore(end)) {
  result.push(current.clone())
}
}
export const columns = [
  {
    sortable: true,
    width: '275px',
    name: 'Course Name',
    selector: row => row.title,
    cell: row => {
      progressFunc(row)
      return (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='avatar-wrapper'>
          
            <Avatar className='me-1' img={row.img} alt={row.title} imgWidth='30' />
          </div>
          <div className='d-flex flex-column'>
           
            <span className='text-truncate fw-bolder'>{row.title}<br/>
           ( {row.semester_name}, {row.day_name}, {row.start_time})
            
            </span>
            <small className='text-muted'>{row.subtitle}</small>
          </div>
        </div>
      )
    }
  },
  {
    name: 'Start Lessons',
    width:"150px",
    selector: row => row.start_date
  },
  {
    name: 'End Lessons',
    width:"148px",
    selector: row => row.end_date
  },
  {
    name: 'Total Lessons',
    width:"150px",
    selector: row => `${row.lesson_count}`
  },
  // {
  //   name: 'Progress',
  //   selector: row => row.progress,
  //   width:"150px",
  //   sortable: true,
  //   cell: row => {
  //     progressFunc(row)
  //           return (
  //       <div className='d-flex flex-column w-100'>
  //         <small className='mb-1'>{`${result.length}%`}</small>
  //         <Progress
  //           value={result.length}
  //           style={{ height: '6px' }}
  //           className={`w-100 progress-bar-${row.progressColor}`}
  //         />
  //       </div>
  //     )
  //   }
  // },
  // {
  //   name: 'Hours',
  //   width:"95px",
  //   selector: row => `${row.lesson_count * 2 }h`
  // }
]

const UserProjectsList = () => {
  // const store = useSelector(state => state.users)
  const storeCalendar = useSelector(state => state.calendar)

  const projectsArr = storeCalendar.alldata.map(el => {
   const item = {
      ...el,
      progress: 30,
      // hours: '210:30h',
      progressColor: 'info',
      lesson_count: el.lesson_count,
      semester_name:el.semester_name,
      day_name:el.day_name,
      start_time:el.start_time,
      end_date:el.endRecur,
      // subtitle: 'Subject',
      title: el.title,
      // img: require('@src/assets/images/icons/brands/react-label.png').default
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT81XbWhkSL6nudDIrPXvc6J5Z4yNcUdzq4dg&usqp=CAU",
      start_date: el.startRecur
    }
    return item
  })

  return (
    <Card>
      <CardHeader tag='h4'>Course List</CardHeader>
      <div className='react-dataTable user-view-account-projects'>
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={projectsArr}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  )
}

export default UserProjectsList
