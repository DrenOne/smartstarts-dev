import Avatar from '@components/avatar'
import { useEffect, useState } from 'react'
import { Check, File } from 'react-feather'
import { Button, Input } from 'reactstrap'
import { store } from '@store/store'
import { addScore, delAllImg, getFileHomework, getImg } from '../../store'
import { useSelector, useStore } from 'react-redux'
import { Link } from 'react-router-dom'

const renderClient = row => {
  store.dispatch(delAllImg())
  store.dispatch(getFileHomework(row.checked_file ? row.checked_file : row.file))
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
let scoreGlobal = ''
const ScoreFunc = (check, id, score) => {
  if (score) scoreGlobal = score
  if (check) {
    const data = {
      id: id.id,
      mark: scoreGlobal,
      homework_id: id.homeworkId,
    }
    store.dispatch(addScore(data))
  }
}
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
          <span className=''>
            {row?.student?.first_name} {row?.student?.last_name}
          </span>
        </div>
      </div>
    ),
  },
  {
    name: 'Email',
    minWidth: '140px',
    sortable: true,
    sortField: 'email',
    selector: row => row.currentPlan,
    cell: row => <span className='text-capitalize'>{row?.student?.email}</span>,
  },
  {
    name: 'Title',
    minWidth: '120px',
    sortable: true,
    sortField: 'title',
    selector: row => row.currentPlan,
    cell: row => <span className='text-capitalize'>{row?.homework?.title}</span>,
  },
  {
    name: 'Due to',
    minWidth: '130px',
    sortable: true,
    sortField: 'due_to',
    selector: row => row.billing,
    cell: row => <span className='text-capitalize'>{row?.homework?.date_to}</span>,
  },
  {
    name: 'File',
    width: '100px',
    sortable: true,
    sortField: 'File',
    selector: row => row.billing,
    cell: row => {
      const store = useSelector(state => state.users)
      return store?.photoAll?.map(el => {
        const id = `${row?.file}-${row?.homework_id}-${row?.id}`
        return (
          <div className='my-2'>
            {row.checked_file ? (
              <a href={el.url} className='d-flex'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='40'
                  height='40'
                  preserveAspectRatio='xMidYMid meet'
                  viewBox='0 0 20 20'
                >
                  <path
                    fill='#9c4854'
                    d='M6.5 11a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0v-.166h.334a1.167 1.167 0 0 0 0-2.334H6.5Zm.834 1.334H7V12h.334a.167.167 0 0 1 0 .334ZM12 11.499a.5.5 0 0 1 .5-.499h.998a.5.5 0 1 1 0 1H13v.335h.498a.5.5 0 1 1 0 1H13v.164a.5.5 0 1 1-1 .002v-.667l.002-1.335ZM9.5 11a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h.502a1.5 1.5 0 0 0 0-3H9.5Zm.5 2v-1h.002a.5.5 0 0 1 0 1H10Zm.002-6.5V2H5.5A1.5 1.5 0 0 0 4 3.5v5.582a1.5 1.5 0 0 0-1 1.414v4.003a1.5 1.5 0 0 0 1 1.414v.587A1.5 1.5 0 0 0 5.5 18h9a1.5 1.5 0 0 0 1.5-1.5v-.587a1.5 1.5 0 0 0 .998-1.414v-4.003A1.5 1.5 0 0 0 16 9.082V8h-4.5A1.5 1.5 0 0 1 10 6.5Zm-5.5 3.496h10.997a.5.5 0 0 1 .5.5v4.003a.5.5 0 0 1-.5.5H4.502a.5.5 0 0 1-.5-.5v-4.003a.5.5 0 0 1 .5-.5ZM11 6.5V2.25L15.75 7H11.5a.5.5 0 0 1-.5-.5Z'
                  />
                </svg>
              </a>
            ) : (
              <Link to={`/file/${id}`} target='_blank' rel='noopener noreferrer'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='40'
                  height='40'
                  preserveAspectRatio='xMidYMid meet'
                  viewBox='0 0 20 20'
                >
                  <path
                    fill='#9c4854'
                    d='M6.5 11a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0v-.166h.334a1.167 1.167 0 0 0 0-2.334H6.5Zm.834 1.334H7V12h.334a.167.167 0 0 1 0 .334ZM12 11.499a.5.5 0 0 1 .5-.499h.998a.5.5 0 1 1 0 1H13v.335h.498a.5.5 0 1 1 0 1H13v.164a.5.5 0 1 1-1 .002v-.667l.002-1.335ZM9.5 11a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h.502a1.5 1.5 0 0 0 0-3H9.5Zm.5 2v-1h.002a.5.5 0 0 1 0 1H10Zm.002-6.5V2H5.5A1.5 1.5 0 0 0 4 3.5v5.582a1.5 1.5 0 0 0-1 1.414v4.003a1.5 1.5 0 0 0 1 1.414v.587A1.5 1.5 0 0 0 5.5 18h9a1.5 1.5 0 0 0 1.5-1.5v-.587a1.5 1.5 0 0 0 .998-1.414v-4.003A1.5 1.5 0 0 0 16 9.082V8h-4.5A1.5 1.5 0 0 1 10 6.5Zm-5.5 3.496h10.997a.5.5 0 0 1 .5.5v4.003a.5.5 0 0 1-.5.5H4.502a.5.5 0 0 1-.5-.5v-4.003a.5.5 0 0 1 .5-.5ZM11 6.5V2.25L15.75 7H11.5a.5.5 0 0 1-.5-.5Z'
                  />
                </svg>
              </Link>
            )}
          </div>
        )
      })
    },
  },
  {
    name: 'Score',
    minWidth: '200px',
    sortable: true,
    sortField: 'Score',
    selector: row => row.billing,
    cell: row => {
      const [score, setScore] = useState('')
      const store = useSelector(state => state.users)

      useEffect(() => {
        if (score > 100) {
          ScoreFunc(0, row.id, 100, store)
          setScore(100)
        } else {
          ScoreFunc(0, row.id, score, store)
        }
      }, [score])
      return (
        <Input
          type='number'
          id='score'
          onChange={e => setScore(e.target.value)}
          value={row.mark ? row.mark : score}
          defaultValue={row.mark || ''}
        />
      )
    },
  },
  {
    name: 'Action',
    minWidth: '150px',
    sortable: true,
    sortField: 'Save',
    selector: row => row.billing,
    cell: row => {
      return row.mark && row.checked_file ? (
        <div className='btn btn-success' style={{ padding: '9px 10px' }}>
          <Check size={15} /> Checked
        </div>
      ) : (
        <Button
          type='submit'
          color={'primary'}
          onClick={() =>
            row.checked_file && ScoreFunc(1, { id: row.id, homeworkId: row.homework_id })
          }
          disabled={false}
        >
          Save
        </Button>
      )
    },
  },
]
