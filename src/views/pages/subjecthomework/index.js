import { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Card, CardBody, Col, Progress, Row } from 'reactstrap'
import { deletelecture, getStudentListTutor } from '../../apps/user/store'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { fetchEvents } from '../../apps/calendar/store'
import Avatar from '@components/avatar'
import Skeleton from 'react-loading-skeleton'
import moment, {} from 'moment'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import 'react-loading-skeleton/dist/skeleton.css'

export default function SubjectLecture() {
  const { id } = useParams()
  const store = useSelector(state => state.users)
  const dispatch = useDispatch()
  const MySwal = withReactContent(Swal)
  let result = []
  const getUserData = JSON.parse(localStorage.getItem('userData'))
  const roleTutor = id ? 'none' : 'block'
  const navigate = useNavigate()
  const check = window.location.href.includes('subject')

  function progressFunc(row) {
    result = []
    const start = moment(row.start_date),
      end = moment(row.end),
      day = 1

    const current = start.clone()

    while (current.day(7 + day).isBefore(end)) result.push(current.clone())
  }

  useEffect(() => {
    dispatch(fetchEvents(getUserData?.id))
    dispatch(getStudentListTutor(id))
  }, [])

  const columns = [
    {
      sortable: true,
      minWidth: '250px',
      name: 'Course Name',
      selector: row => row.title,
      cell: row => {
        progressFunc(row)
        return (
          <Link to={`/class/list/${row.course_days_id}`}>
            <div className='d-flex justify-content-left align-items-center'>
              <div className='avatar-wrapper'>
                <Avatar className='me-1' img={row.img} alt={row.title} imgWidth='32' />
              </div>
              <div className='d-flex flex-column'>
                <span className='text-truncate fw-bolder'>
                  {row.title}
                  <br />( {row.semester_name}, {row.day_name}, {row.start_time})
                </span>
                <small className='text-muted'>{row.subtitle}</small>
              </div>
            </div>
          </Link>
        )
      },
    },
    {
      name: 'Start Lessons',
      width: '150px',
      selector: row => moment(row.start_date).format("MM/DD/yyyy"),
    },
    {
      name: 'Total Lessons',
      width: '150px',
      selector: row => `${result.length}/ ${row.lesson_count}`,
    },
    {
      name: 'Progress',
      selector: row => row.progress,
      width: '150px',
      sortable: true,
      cell: row => {
        progressFunc(row)
        return (
          <div className='d-flex flex-column w-100'>
            <small className='mb-1'>{`${result.length}%`}</small>
            <Progress
              value={result.length}
              style={{ height: '6px' }}
              className={`w-100 progress-bar-${row.progressColor}`}
            />
          </div>
        )
      },
    },
    {
      name: 'Hours',
      width: '95px',
      selector: row => `${row.lesson_count * 2}h`,
    },
  ]

  const delLecture = (id, courseId) => {
    return MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ms-1',
      },
      buttonsStyling: false,
      showLoaderOnConfirm: true,
      preConfirm() {
        dispatch(deletelecture({ id, courseId })).then(res => {
          if (res?.meta?.requestStatus === 'fulfilled') {
            MySwal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              customClass: {
                confirmButton: 'btn btn-success',
              },
            })
          }
        })
      },
    })
    // .then(function (result) {
    //   if (result.value) {
    //     dispatch(deletelecture({ id, courseId }))
    //     MySwal.fire({
    //       icon: 'success',
    //       title: 'Deleted!',
    //       text: 'Your file has been deleted.',
    //       customClass: {
    //         confirmButton: 'btn btn-success',
    //       },
    //     })
    //   }
    // })
  }

  const storeCalendar = useSelector(state => state.calendar)

  const projectsArr = storeCalendar.alldata.map(el => {
    const item = {
      ...el,
      progress: 30,
      hours: '210:30h',
      progressColor: 'info',
      lesson_count: el.lesson_count,
      semester_name: el.semester_name,
      day_name: el.day_name,
      start_time: el.start_time,
      // subtitle: 'Subject',
      title: el.title,
      // img: require('@src/assets/images/icons/brands/react-label.png').default
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT81XbWhkSL6nudDIrPXvc6J5Z4yNcUdzq4dg&usqp=CAU',
      start_date: el.startRecur,
    }
    return item
  })

  const rowClick = row => {
    navigate(`/class/list/${row.course_days_id}`)
  }

  return (
    <Fragment>
      {!check && (
        <Row>
          {store.isLoading ? (
            [...new Array(2)].map((_, index) => (
              <Col xl={6} md={6} key={index}>
                <Card>
                  <CardBody>
                    <Skeleton height={25} />
                    <br />
                    <Skeleton count={3} />
                    <br />
                    <Skeleton width='25%' height={40} />
                  </CardBody>
                </Card>
              </Col>
            ))
          ) : store.allStudents?.themes?.length ? (
            store.allStudents?.themes?.map((item, index) => {
              const id = `${store.allStudents.id}-${item.id}`

              return (
                <Col key={index} xl={6} md={6}>
                  <Card>
                    <CardBody>
                      <div className='d-flex justify-content-between align-items-end mt-1 pt-25'>
                        <div className='role-heading'>
                          <h4 className='fw-bolder text-primary'>{store.allStudents.title}</h4>
                          <p className='fw-bolder m-0 mt-1'>Title: {item.title}</p>
                          <p className='fw-bolder m-0' style={{ display: roleTutor }}>
                            Teacher: {item.teacher}
                          </p>
                          <p className='m-0 fw-bolder' style={{ display: roleTutor }}>
                            Class: {item.class}
                          </p>
                          <p className='text-success m-0  fw-bolder '>
                            Created at: {item?.created_at.slice(0, 10)}
                          </p>
                          <p className='text-success mb-1 fw-bolder '>
                            Updated at: {item?.updated_at.slice(0, 10)}
                          </p>
                          <div className='d-flex  align-items-center'>
                            <Link to={`/class/list/subject/${id}`}>
                              <Button color='primary'>
                                <small className='fw-bolder'>Open the Lecture</small>
                              </Button>
                            </Link>
                            <Button
                              color='danger'
                              className='mx-1'
                              style={{ display: getUserData.role === 'tutor' ? 'block' : 'none' }}
                              onClick={() => {
                                delLecture(item.id, store.allStudents.id)
                              }}
                            >
                              Delete
                            </Button>
                            {/* <p className='text-danger ms-2 fw-bolder mb-0'>Due: {item.dueday}</p> */}
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              )
            })
          ) : (
            <h3>Lectures are not added</h3>
          )}
        </Row>
      )}
      {getUserData.role === 'student' && (
        <Card style={{ display: roleTutor }}>
          <div className='react-dataTable user-view-account-projects'>
            <DataTable
              noHeader
              responsive
              columns={columns}
              data={projectsArr}
              className='react-dataTable'
              onRowClicked={rowClick}
              progressPending={store.isLoading}
              sortIcon={<ChevronDown size={10} />}
            />
          </div>
        </Card>
      )}
    </Fragment>
  )
}
