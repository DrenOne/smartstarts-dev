import { Fragment, useEffect, useMemo, useState } from 'react'
import { Book, Edit, Trash2, FileText } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Button, Card, CardBody, Col, ListGroupItem, Row, Spinner } from 'reactstrap'
import {
  deletehomework,
  getPdf,
  getStudentListTutor,
  lectureShow,
  studentsHomeworks,
} from '../../apps/user/store'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function Lecture() {
  const getUserData = JSON.parse(localStorage.getItem('userData'))
  const store = useSelector(state => state.users)
  const { id } = useParams()
  const MySwal = withReactContent(Swal)
  const dispatch = useDispatch()
  const baseURl = 'https://admin.smartstartnow.com'
  const courseId = id.split('-')
  let [studentHomework, setStudentHomework] = useState([])
  const [fileUrl, setFileUrl] = useState({})

  const handleRemoveFile = (file = 0) => {
    return MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ms-1',
      },
      buttonsStyling: false,
      preConfirm() {
        dispatch(
          deletehomework({ id: file.id, courseId: courseId[0], lectureId: courseId[1] })
        ).then(res => {
          if (res?.meta?.requestStatus === 'fulfilled') {
            dispatch(getStudentListTutor(courseId[0]))
            dispatch(lectureShow(courseId[1]))
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

  useEffect(() => {
    if (store?.lecture?.homeworks?.length) {
      store.lecture.homeworks.map(el => {
        dispatch(studentsHomeworks(el.id))
      })
    }
  }, [store.lecture.homeworks])

  useEffect(() => {
    dispatch(getStudentListTutor(courseId[0]))
    dispatch(lectureShow(courseId[1]))
  }, [])

  useEffect(() => {
    // studentHomework = store?.studentsHomeworks?.find(
    //   student => student?.student?.id === getUserData.id
    // )
    // studentHomework = store.studentsHomeworks &&  store.studentsHomeworks.filter(el => {
    //   return  el.student?.id === getUserData.id
    // })
    // setStudentHomework(studentHomework)
    // console.log(studentHomework)
    if (studentHomework && store.lectureNew[0]) {
      const x = store?.lectureNew[0]?.homeworks.map(el => {
        return el.id
      })
      studentHomework.map(el2 => {
        if (
          x.includes(el2.homework?.id) &&
          el2.student?.id === getUserData.id &&
          el2.checked_file !== null
        ) {
          return dispatch(
            getPdf({ id: el2.checked_file, homeworkId: el2.homework_id, mark: el2.mark })
          )
        } else {
          return dispatch(getPdf({ id: el2.file, homeworkId: el2.homework_id, mark: el2.mark }))
        }
      })
    }
  }, [studentHomework])

  useMemo(() => {
    setStudentHomework(store.studentsHomeworks)
  }, [store.studentsHomeworks])

  return (
    <Fragment>
      {store.isLoadingLecture === false && store?.photoAll.length > 0 ? (
        <Row className=''>
          {store.lectureNew?.map((item, index) => {
            const id = `${courseId[0]}-${courseId[1]}`
            return (
              <Col key={index} xl={12} md={12}>
                <Card>
                  <CardBody style={{ background: 'white' }}>
                    <div className=' mt-1 pt-25'>
                      <div className=''>
                        <div className='d-flex justify-content-between'>
                          <h1 className='fw-bolder text-primary'>{item.title}</h1>
                          <div className='d-flex'>
                            <Link to={`/class/list/addHomework/${id}`}>
                              <Button
                                color='primary'
                                className='me-2'
                                style={{
                                  display: getUserData.role === 'tutor' ? 'block' : 'none',
                                }}
                              >
                                Add homework
                              </Button>
                            </Link>
                            <Link to={`/class/list/edit/${id}`}>
                              <Button
                                color='primary'
                                style={{
                                  display: getUserData.role === 'tutor' ? 'block' : 'none',
                                }}
                              >
                                Edit the lecture
                              </Button>
                            </Link>
                          </div>
                        </div>
                        <p className='fw-bolder border-bottom pb-2'>Describe: {item.description}</p>
                        <div className='mt-2' dangerouslySetInnerHTML={{ __html: item.text }}></div>
                        <div className='mt-2'>
                          {store?.photoAll?.map((el, index) => {
                            if (el.type === 'image') {
                              return (
                                <img
                                  key={index}
                                  className='img-fluid mx-auto d-block mb-2'
                                  src={`data:image/png;base64, ${el.url}`}
                                  style={{
                                    height: 300,
                                    width: '50%',
                                    overflow: 'hidden',
                                  }}
                                />
                              )
                            } else if (el.type === 'video') {
                              return (
                                <video
                                  controls
                                  className='img-fluid mx-auto d-block mb-2'
                                  key={index}
                                >
                                  <source src={el.url} />
                                </video>
                              )
                            } else if (el.type === 'file') {
                              return (
                                <div className='my-2' key={index}>
                                  <a href={el.url} className='d-flex'>
                                    {' '}
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='80'
                                      height='80'
                                      preserveAspectRatio='xMidYMid meet'
                                      viewBox='0 0 20 20'
                                    >
                                      <path
                                        fill='#9c4854'
                                        d='M6.5 11a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0v-.166h.334a1.167 1.167 0 0 0 0-2.334H6.5Zm.834 1.334H7V12h.334a.167.167 0 0 1 0 .334ZM12 11.499a.5.5 0 0 1 .5-.499h.998a.5.5 0 1 1 0 1H13v.335h.498a.5.5 0 1 1 0 1H13v.164a.5.5 0 1 1-1 .002v-.667l.002-1.335ZM9.5 11a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h.502a1.5 1.5 0 0 0 0-3H9.5Zm.5 2v-1h.002a.5.5 0 0 1 0 1H10Zm.002-6.5V2H5.5A1.5 1.5 0 0 0 4 3.5v5.582a1.5 1.5 0 0 0-1 1.414v4.003a1.5 1.5 0 0 0 1 1.414v.587A1.5 1.5 0 0 0 5.5 18h9a1.5 1.5 0 0 0 1.5-1.5v-.587a1.5 1.5 0 0 0 .998-1.414v-4.003A1.5 1.5 0 0 0 16 9.082V8h-4.5A1.5 1.5 0 0 1 10 6.5Zm-5.5 3.496h10.997a.5.5 0 0 1 .5.5v4.003a.5.5 0 0 1-.5.5H4.502a.5.5 0 0 1-.5-.5v-4.003a.5.5 0 0 1 .5-.5ZM11 6.5V2.25L15.75 7H11.5a.5.5 0 0 1-.5-.5Z'
                                      />
                                    </svg>
                                  </a>
                                </div>
                              )
                            }
                          })}
                        </div>
                      </div>
                    </div>
                    <div className='fw-bolder border-top pb-2 justify-content-between'>
                      <h1 className='mt-2'>Homework</h1>

                      {store?.lectureNew[0]?.homeworks?.length
                        ? store?.lectureNew[0]?.homeworks.map((el, index) => {
                            const id = `${courseId[0]}-${courseId[1]}-${el.id}`
                            let x = []
                            x = store.pdffile.filter(el2 => {
                              if (el2.homeworkId === el.id) {
                                return el2
                              }
                            })

                            return (
                              <ListGroupItem
                                key={`${el.id}-${index}`}
                                className='d-flex align-items-center justify-content-between'
                              >
                                <div className='file-details d-flex align-items-center'>
                                  <div>
                                    <p className='file-name mb-0'>Title: {el?.title}</p>
                                    <p className='text-danger fw-bolder mb-0'>Due: {el.date_to}</p>
                                    {getUserData.role === 'tutor' &&
                                      studentHomework?.checked_file && (
                                        <p className='mb-0'>Score: {studentHomework?.mark}</p>
                                      )}
                                  </div>
                                </div>
                                <div className=' align-items-center'>
                                  {getUserData.role === 'tutor' ? (
                                    <Fragment>
                                      {/* <a href={x[0]?.url}> <Button style={{ padding: '10px' }} color='primary'>
                                <small className='fw-bolder'>
                                  <FileText size={18} />
                                </small>
                              </Button></a> */}
                                      <Link to={`/class/list/studentsHomework/${el.id}`}>
                                        <Button style={{ padding: '10px' }} color='primary'>
                                          <small className='fw-bolder'>
                                            <Book size={18} />
                                          </small>
                                        </Button>
                                      </Link>
                                      <Link to={`/class/list/homeworkEdit/${id}`}>
                                        <Button
                                          style={{ padding: '10px' }}
                                          color='primary'
                                          className='mx-1'
                                        >
                                          <small className='fw-bolder'>
                                            <Edit size={18} />
                                          </small>
                                        </Button>
                                      </Link>
                                      <Button
                                        color='danger'
                                        className=''
                                        style={{ padding: '10px' }}
                                        onClick={() => handleRemoveFile(el)}
                                      >
                                        <Trash2 size={18} />
                                      </Button>
                                    </Fragment>
                                  ) : (
                                    <div className='d-flex align-items-center justify-content-start'>
                                      {x.length > 0 ? (
                                        <a href={x[0]?.url}>
                                          {' '}
                                          <Button style={{ padding: '10px' }} color='primary'>
                                            <small className='fw-bolder'>
                                              <FileText size={18} />
                                            </small>
                                          </Button>
                                        </a>
                                      ) : (
                                        <a
                                          href={`/file/${el.file}-${el.id}-${courseId[0]}-${courseId[1]}`}
                                        >
                                          {' '}
                                          <Button style={{ padding: '10px' }} color='primary'>
                                            <small className='fw-bolder'>
                                              <FileText size={18} />
                                            </small>
                                          </Button>
                                        </a>
                                      )}
                                      {x[0]?.mark ? (
                                        <p
                                          className='mb-0 ms-2 text-danger'
                                          style={{ minWidth: '110px' }}
                                        >
                                          Score: {x[0].mark}
                                        </p>
                                      ) : (
                                        <p
                                          style={{ minWidth: '110px' }}
                                          className='mb-0 ms-2 text-danger'
                                        >
                                          Not yet rated
                                        </p>
                                      )}

                                      {/* // return ( el2.homeworkId === el.id ? <a href={`${el2.url}`}>1</a> : <a href={`/file/${el.file}-${el.id}-${courseId[0]}-${courseId[1]}`}>2</a>) */}
                                      {/* }) */}

                                      {/* {store.studentsHomeworks?.map(el2 => {
                                  console.log(el)
                                  el2.homework.id === el.id &&  dispatch(getPdf(el2.homework.file))
                                  console.log(store.pdffile)
                                  return (
                                    <a
                                  href={
                                    studentHomework?.checked_file  ? `${store.pdffile.url}` : `/file/${el.file}-${el.id}-${courseId[0]}-${courseId[1]}`
                                  }
                                  target='_blank'
                                  rel='noopener noreferrer'
                                >
                                  <Button style={{ padding: '10px' }} color='primary'>
                                    <small className='fw-bolder'>
                                      <FileText size={18} />
                                    </small>
                                    
                                  </Button>
                                </a>
                                  )
                                })} */}
                                      {/* <a
                                  href={
                                    !studentHomework?.checked_file  ? `${store.pdffile[0].url}` : `/file/${el.file}-${el.id}-${courseId[0]}-${courseId[1]}`
                                  }
                                  target='_blank'
                                  rel='noopener noreferrer'
                                >
                                  <Button style={{ padding: '10px' }} color='primary'>
                                    <small className='fw-bolder'>
                                      <FileText size={18} />
                                    </small>
                                    
                                  </Button>
                                </a> */}
                                    </div>
                                    // <div className='d-flex align-items-center'>
                                    // {  console.log(studentHomework)}
                                    // {studentHomework?.checked_file && (
                                    //       <p className='mb-0 me-2'>Score: {studentHomework.mark}</p>
                                    //     )}
                                    // <a
                                    //   href={
                                    //     studentHomework?.checked_file  ? `${store.pdffile.url}` : `/file/${el.file}-${el.id}-${courseId[0]}-${courseId[1]}`
                                    //   }
                                    //   target='_blank'
                                    //   rel='noopener noreferrer'
                                    // >
                                    //   <Button style={{ padding: '10px' }} color='primary'>
                                    //     <small className='fw-bolder'>
                                    //       <FileText size={18} />
                                    //     </small>

                                    //   </Button>
                                    // </a>
                                    // </div>
                                  )}
                                </div>
                              </ListGroupItem>
                            )
                          })
                        : 'Homework are not added'}
                    </div>
                  </CardBody>
                </Card>
              </Col>
            )
          })}
        </Row>
      ) : (
        <div className='d-flex justify-content-center' style={{ paddingTop: '20%' }}>
          <Spinner size={40} color='primary' />
        </div>
      )}
    </Fragment>
  )
}
