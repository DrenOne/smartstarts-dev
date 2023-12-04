// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'

// ** Icons Imports
import { FileText, Trash2 } from 'react-feather'

// ** Reactstrap Imports
import { Button } from 'reactstrap'
import { deleteUser } from '../../ecommerce/store'
import { getUser } from '../store'

// ** Third Party Components
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const del = async (item) => {
  return MySwal.fire({
    title: 'Are you sure?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete!',
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-outline-danger ms-1'
    },
    buttonsStyling: false,
    preConfirm: () => {
      try {
        store.dispatch(deleteUser(item))
        MySwal.fire({
          icon: 'success',
          title: 'Deleted!',
          customClass: { confirmButton: 'btn btn-success' }
        })
      } catch (error) {
        MySwal.showValidationMessage(
          `Request failed: ${error}`
        )
      }
    }
  })
}

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
    name: 'First Name',
    sortable: true,
    minWidth: '300px',
    sortField: 'first_name',
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
            <span className=''>{row.first_name} </span>
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
    name: 'last name',
    minWidth: '138px',
    sortable: true,
    sortField: 'last_name',
    selector: row => row.currentPlan,
    cell: row => <span className='text-capitalize'>{row.last_name}</span>
  },
  {
    name: 'email',
    minWidth: '230px',
    sortable: true,
    sortField: 'email',
    selector: row => row.billing,
    cell: row => <span className='text-capitalize'>{row.email}</span>
  },
  {
    name: 'phone',
    minWidth: '230px',
    sortable: true,
    sortField: 'phone',
    selector: row => row.billing,
    cell: row => <span className='text-capitalize'>{row.phone}</span>
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
    minWidth: '100px',
    center: true,
    cell: row => (
      <div className='column-action'>
        <Button
          outline
          color='primary'
          className='me-1 mb-0.5'
          tag={Link}
          onClick={() => store.dispatch(getUser(row.id))}
          to={`/apps/user/list/${row.id}`}
        >
          <FileText size={14} className='me-50' />
          <span className='align-middle'>Details</span>
        </Button>
        {/* <Button
          outline
          color='danger'
          onClick={e => {
            e.preventDefault()
            // store.dispatch(deleteUser(row.id))
            del(row.id)
          }}>
          <Trash2 color='#ff0000' size={14} className='me-50' />
          <span className='align-middle'>Delete</span>
        </Button> */}
      {/* <UncontrolledDropdown direction='up'>
        <DropdownToggle tag='div' className='btn btn-sm'>
          <MoreVertical size={14} className='cursor-pointer' />
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem
            tag={Link}
            className='w-100'
            onClick={() => store.dispatch(getUser(row.id))}
            to={`/apps/user/list/${row.id}`}
          >
            <FileText size={14} className='me-50' />
            <span className='align-middle'>Details</span>
          </DropdownItem>
          <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
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
    )
  }
]
