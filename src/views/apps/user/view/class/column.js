// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
// import { store } from '@store/store'


// ** Icons Imports
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

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
        content={row.first_name || 'John Doe'}
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
    name: 'Student Name',
    sortable: true,
    minWidth: '300px',
    sortField: 'name',
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
            <span className=''>{row.first_name} {row.last_name}</span>
          {/* </Link> */}
          {/* <small className='text-truncate text-muted mb-0'>{row.email}</small> */}
        </div>
      </div>
    )
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
    name: 'Email',
    minWidth: '140px',
    sortable: true,
    sortField: 'email',
    selector: row => row.currentPlan,
    cell: row => <span className='text-capitalize'>{row.email}</span>
  },
  {
    name: 'Parent Name',
    minWidth: '130px',
    sortable: true,
    sortField: 'parent_name',
    selector: row => row.billing,
    cell: row => <span className='text-capitalize'>{row.parent.first_name} {row.parent.last_name}</span>
  },
  {
    name: 'Parent Email',
    minWidth: '150px',
    sortable: true,
    sortField: 'parent_email',
    selector: row => row.billing,
    cell: row => <span className='text-capitalize'>{row.parent.email}</span>
  }
  // {
  //   name: 'End Date',
  //   minWidth: '150px',
  //   sortable: true,
  //   sortField: 'endRecur',
  //   selector: row => row.billing,
  //   cell: row => <span className='text-capitalize'>{row.endRecur}</span>
  // },
  // {
  //   name: 'Time',
  //   minWidth: '150px',
  //   sortable: true,
  //   sortField: 'endRecur',
  //   selector: row => row.billing,
  //   cell: row => <span className='text-capitalize'>{row.start_time} / {row.end_time}</span>
  // },
  // {
  //   name: 'Pupil',
  //   minWidth: '100px',
  //   sortable: true,
  //   sortField: 'endRecur',
  //   selector: row => row.billing,
  //   cell: () => <span className='text-capitalize'>20</span>
  // }
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
  // {
  //   name: 'Actions',
  //   minWidth: '100px',
  //   cell: () => (
  //     <div className='column-action'>
  //       <UncontrolledDropdown>
  //         <DropdownToggle tag='div' className='btn btn-sm'>
  //           <MoreVertical size={14} className='cursor-pointer' />
  //         </DropdownToggle>
  //         <DropdownMenu>
  //           {/* <DropdownItem
  //             tag={Link}
  //             className='w-100'
  //             onClick={() => store.dispatch(getUser(row.id))}
  //             to={`/apps/user/list/${row.id}`}
  //           >
  //             <FileText size={14} className='me-50' />
  //             <span className='align-middle'>Details</span>
  //           </DropdownItem> */}
  //           {/* <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
  //             <Archive size={14} className='me-50' />
  //             <span className='align-middle'>Edit</span>
  //           </DropdownItem> */}
  //           {/* <DropdownItem
  //             tag='a'
  //             href='/'
  //             className='w-100'
  //             onClick={e => {
  //               e.preventDefault()
  //               store.dispatch(deleteUser(row.id))
  //             }}
  //           >
  //             <Trash2 size={14} className='me-50' />
  //             <span className='align-middle'>Delete</span>
  //           </DropdownItem> */}
  //         </DropdownMenu>
  //       </UncontrolledDropdown>
  //     </div>
  //   )
  // }
]
