// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'

// ** Icons Imports
import { FileText } from 'react-feather'

// ** Reactstrap Imports
import { Button } from 'reactstrap'
import moment from 'moment'

// ** Renders Client Columns
const renderClient = row => {
  if (row?.avatar?.length) {
    return <Avatar className='me-1' img={row.avatar} width='32' height='32' />
  } else {
    return (
      <Avatar
        initials
        className='me-1'
        color={row.avatarColor || 'light-primary'}
        content={row.title || 'John Doe'}
      />
    )
  }
}

// ** Renders Role Columns
// const renderRole = row => {
//   const roleObj = {
//     subscriber: {
//       class: 'text-primary',
//       icon: User
//     },
//     maintainer: {
//       class: 'text-success',
//       icon: Database
//     },
//     editor: {
//       class: 'text-info',
//       icon: Edit2
//     },
//     author: {
//       class: 'text-warning',
//       icon: Settings
//     },
//     admin: {
//       class: 'text-danger',
//       icon: Slack
//     }
//   }

//   const Icon = roleObj[row.role] ? roleObj[row.role].icon : Edit2

//   return (
//     <span className='text-truncate text-capitalize align-middle'>
//       <Icon size={18} className={`${roleObj[row.role] ? roleObj[row.role].class : ''} me-50`} />
//       {row.role}
//     </span>
//   )
// }

// const statusObj = {
//   pending: 'light-warning',
//   active: 'light-success',
//   inactive: 'light-secondary'
// }

export const columns = [
  {
    name: 'Class Name',
    // sortable: true,
    width: '245px',
    sortField: 'class_name',
    selector: row => row.fullName,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
          {/* <Link
            to={`apps/user/list/${row.id}`}
            className='user_name text-truncate text-body'
            onClick={() => store.dispatch(getUser(row.id))}
          > */}
          <span className=''>{row.title} </span>
          {/* </Link> */}
          {/* <small className='text-truncate text-muted mb-0'>{row.email}</small> */}
        </div>
      </div>
    ),
  },
  // {
  //   name: 'first name',
  //   sortable: true,
  //   minWidth: '172px',
  //   sortField: 'first_name',
  //   selector: row => row.first_name,
  //   // cell: row => renderRole(row),
  //   cell: row => row.first_name

  // },
  {
    name: 'Semester',
    width: '125px',
    // sortable: true,
    sortField: 'semester_name',
    selector: row => row.currentPlan,
    cell: row => <span className='text-capitalize'>{row.semester_name}</span>,
  },
  {
    name: 'Day',
    width: '120px',
    // sortable: true,
    sortField: 'day_name',
    selector: row => row.billing,
    cell: row => <span className='text-capitalize'>{row.day_name}</span>,
  },
  {
    name: 'Start Date',
    width: '125px',
    // sortable: true,
    sortField: 'startRecur',
    selector: row => row.billing,
    cell: row => (
      <span className='text-capitalize'>{moment(row.startRecur).format('MM/DD/yyyy')}</span>
    ),
  },
  {
    name: 'End Date',
    width: '125px',
    // sortable: true,
    sortField: 'endRecur',
    selector: row => row.billing,
    cell: row => (
      <span className='text-capitalize'>{moment(row.endRecur).format('MM/DD/yyyy')}</span>
    ),
  },
  {
    name: 'Time',
    width: '125px',
    // sortable: true,
    sortField: 'endRecur',
    selector: row => row.billing,
    cell: row => (
      <span className='text-capitalize'>
        {row.start_time} / {row.end_time}
      </span>
    ),
  },
  {
    name: 'Students',
    width: '115px',
    // sortable: true,
    sortField: 'endRecur',
    selector: row => row.billing,
    cell: row => <span className='text-capitalize'>{row.student_count || 0}</span>,
  },
  // {
  //   name: 'Status',
  //   minWidth: '138px',
  //   sortable: true,
  //   sortField: 'status',
  //   selector: row => row.status,
  //   cell: row => (
  //     <Badge className='text-capitalize' color={statusObj[row.status]} pill>
  //       {row.status}
  //     </Badge>
  //   )
  // },
  {
    name: 'Actions',
    // width: '105px',
    cell: row => (
      <div className='column-action'>
        <Button
          outline
          color='primary'
          // className='me-1 mb-0.5'
          tag={Link}
          onClick={() => store.dispatch(getUser(row.id))}
          to={`/class/list/${row.course_days_id}`}
        >
          <FileText size={14} className='me-50' />
          <span className='align-middle'>Details</span>
        </Button>
        {/* <UncontrolledDropdown>
          <DropdownToggle tag='div' className='btn btn-sm'>
            <MoreVertical size={14} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              tag={Link}
              className='w-100'
              onClick={() => {
                store.dispatch(getUser(row.id))
                } }
              to={`/class/list/${row.course_days_id}`}
            >
              <FileText size={14} className='me-50' />
              <span className='align-middle'>Details</span>
            </DropdownItem>
            {/* <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
              <Archive size={14} className='me-50' />
              <span className='align-middle'>Edit</span>
            </DropdownItem>
            <DropdownItem
              tag='a'
              href='/'
              className='w-100'
              onClick={e => {
                e.preventDefault()
                store.dispatch(deleteUser(row.id))
              }}
            >
              <Trash2 size={14} className='me-50' />
              <span className='align-middle'>Delete</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown> */}
      </div>
    ),
  },
]
