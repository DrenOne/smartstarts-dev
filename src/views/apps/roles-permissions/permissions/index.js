// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Card } from 'reactstrap'

// ** Table Import
import Table from './Table'

const Permissions = () => {
  return (
    <div className='container-xxl p-5'>
      <h3>Courses</h3>
      {/* <p>Each category (Basic, Professional, and Business) includes the four predefined roles shown below.</p> */}
      <Card>
        <div className='card-datatable app-user-list table-responsive'>
          <Table />
        </div>
      </Card>
    </div>
  )
}

export default Permissions
