// ** React Imports
import { Link } from 'react-router-dom'

// ** Third Party Components
// import classnames from 'classnames'

// ** Reactstrap Imports
import { Badge } from 'reactstrap'

// ** Vars
// const colors = {
//   support: 'light-info',
//   user: 'light-success',
//   manager: 'light-warning',
//   administrator: 'light-primary',
//   'restricted-user': 'light-danger'
// }

export const columns = [
  {
    name: "Name",
    sortable: true,
    maxWidth: "250px",
    cell: ({ name }) => name,
    selector: (row) => row.name
  },
  {
    sortable: true,
    maxWidth: "250px",
    name: "Description",
    selector: (row) => row.description
    // cell: ({ createdDate }) => createdDate,
  },

  {
    sortable: true,
    minWidth: "150px",
    name: "Price",
    selector: (row) => <span>$ {row.price}</span>
  },
  {
    sortable: true,
    maxWidth: "150px",
    name: "Duration",
    // selector: row => row.created_at.slice(0, 10) + " " + row.created_at.slice(12, 22)
    cell: (row) => <span>{row.duration} </span>
  },
  
  {
    sortable: true,
    maxWidth: "150px",
    name: "Start Time",
    // selector: row => row.created_at.slice(0, 10) + " " + row.created_at.slice(12, 22)
    cell: (row) => <span>{row.start_time} </span>
  },
  {
    sortable: true,
    maxWidth: "150px",
    name: "End Time",
    // selector: row => row.created_at.slice(0, 10) + " " + row.created_at.slice(12, 22)
    cell: (row) => <span>{row.end_time} </span>
  },
  {
    sortable: true,
    maxWidth: "250px",
    name: "Created Date",
    // selector: row => row.created_at.slice(0, 10) + " " + row.created_at.slice(12, 22)
    cell: (row) => <span>{row.created_at.slice(0, 10)} </span>
  }
]
