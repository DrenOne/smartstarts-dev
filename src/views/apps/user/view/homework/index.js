import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import {
  Form,
  Input,
  Card,
  Label,
  CardHeader,
  CardTitle,
  CardBody,
  Button,
  Row,
  Col,
} from 'reactstrap'
import EditorControlled from '../../../../forms/form-elements/editor/EditorControlled'
import FileUploaderMultiple from '../../../../forms/form-elements/file-uploader/FileUploaderMultiple'
import { addHomeworkAPI, homeworkShow, updateHomework } from '../../store'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'

const AddHomework = () => {
  const dispatch = useDispatch()
  const MySwal = withReactContent(Swal)
  const { id } = useParams()
  const store = useSelector(state => state.users)
  const navigate = useNavigate()
  const [editData, setEditData] = useState('')
  const [mediaData, setMedia] = useState([])
  const [mediaData2, setMedia2] = useState([])
  const [deleteData, setDelete] = useState(false)
  const [check, setCheck] = useState(false)
  const courseId = id.split('-')
  let defaultValues = {}
  const editOrAdd = window.location.href.includes('homeworkEdit') ? 'Edit' : 'Add'

  const {
    control,
    setError,
    handleSubmit,
    setValue,
    resetField,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues })

  useEffect(() => {
    //  dispatch(lectureShow(courseId[1]))
    dispatch(homeworkShow(courseId[2]))
  }, [dispatch, window.location.href])

  useEffect(() => {
    if (
      window.location.href.includes('homeworkEdit') &&
      deleteData === false &&
      store.homeworkState &&
      check === false
    ) {
      setValue('text', store.homeworkState.text, { shouldTouch: true })
      setValue('media', store.homeworkState.files, { shouldTouch: true })
      setValue('title', store.homeworkState.title, { shouldTouch: true })
      setValue('describe', store.homeworkState.date_to)
    } else {
      defaultValues = {
        title: '',
        describe: '',
        text: '',
        media: [],
      }
    }
  }, [deleteData, defaultValues])

  useEffect(() => {
    setValue('text', editData, { shouldTouch: true })
    setValue('media', mediaData, { shouldTouch: true })
  }, [mediaData, editData])

  // Alert
  const handleConfirmCancel = () => {
    return MySwal.fire({
      title: 'Error!',
      text: ' Please, enter all information completely!',
      icon: 'error',
      customClass: {
        confirmButton: 'btn btn-primary',
      },
      buttonsStyling: false,
    })
  }
  const handleErrorCancel = () => {
    return MySwal.fire({
      title: 'Error!',
      text: ' Please, try again!',
      icon: 'error',
      customClass: {
        confirmButton: 'btn btn-primary',
      },
      buttonsStyling: false,
    })
  }
  const handleSuccess = () => {
    return MySwal.fire({
      title: 'The homework was successfully saved!',
      icon: 'success',
      customClass: {
        confirmButton: 'btn btn-primary',
      },
      buttonsStyling: false,
    }).then(() => {
      const id = courseId[0] + '-' + courseId[1]
      navigate(`/class/list/subject/${id}`)
    })
  }

  const handleAjax = data2 => {
    MySwal.fire({
      title: 'Are you sure?',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger ms-1',
      },
      buttonsStyling: false,
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Yes',
      showLoaderOnConfirm: true,
      preConfirm() {
        const API = window.location.href.includes('addHomework')
          ? addHomeworkAPI(data2)
          : updateHomework(data2)

        return dispatch(API).then(res => {
          if (res?.meta?.requestStatus === 'fulfilled') {
            handleSuccess()
            resetField('title')
            resetField('describe')
            setValue('describe', '', { shouldTouch: true })
            setValue('title', '', { shouldTouch: true })
            setDelete(true)
          } else if (res?.meta?.requestStatus === 'rejected') handleErrorCancel()
        })
      },
    })
    // .then(function (result) {
    //   if (result.value) {
    //     handleSuccess()
    //     resetField('title')
    //     resetField('describe')
    //     setValue('describe', '', { shouldTouch: true })
    //     setValue('title', '', { shouldTouch: true })
    //     setDelete(true)
    //   }
    // })
  }

  const onSubmit = async data => {
    const values = getValues()
    const x =
      typeof data?.describe === 'object'
        ? moment(data?.describe[0]?.toString()).format('DD-MM-YYYY')
        : values.describe
    data.describe = x
    const dataMedia = { ...data }
    delete data.media
    if (Object.values(data).every(field => field?.length > 0)) {
      if (window.location.href.includes('addHomework')) {
        const data2 = { ...dataMedia, courseId: courseId[0], lectureId: courseId[1] }
        handleAjax(data2)
        // dispatch(addHomeworkAPI(data2)).then(() => handleSuccess()).catch(() => handleErrorCancel())
        // resetField("title")
        // resetField("describe")
        // setDelete(true)
      } else {
        dataMedia.media = mediaData2
        const courseId = id.split('-')
        const data2 = { ...dataMedia, id: courseId[2], lectureId: courseId[1] }
        handleAjax(data2)
        //   dispatch(updateHomework(data2)).then(() => handleSuccess()).catch(() => handleErrorCancel())
        //  resetField("title")
        //  resetField("describe")
        //  setValue('describe', "", { shouldTouch: true })
        //  setValue("title", "", {shouldTouch: true })
        //  setDelete(true)
      }
    } else {
      handleConfirmCancel()
      setDelete(false)
      for (const key in data) {
        if (data[key]?.length === 0) {
          setError(key, {
            type: 'manual',
          })
        }
      }
    }
  }

  return (
    <Form className='list-view product-checkout' onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader className='flex-column align-items-start'>
          <CardTitle tag='h4'>{editOrAdd} your homework</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md='12' sm='12'>
              <div className='mb-2'>
                <Label className='form-label' for='title'>
                  Title of homework
                </Label>
                <Controller
                  control={control}
                  name='title'
                  render={({ field }) => <Input id='title' placeholder='' {...field} />}
                />
              </div>
            </Col>

            <Col md='12' sm='12'>
              <div className='mb-2'>
                <Label className='form-label' for='text'>
                  Text of homework:
                </Label>
                <Controller
                  control={control}
                  name='text'
                  render={({ field }) => (
                    <EditorControlled
                      {...field}
                      invalid={errors.text && true}
                      setCheck={setCheck}
                      setEditData={setEditData}
                      deleteData={deleteData}
                      editData={editData}
                    />
                  )}
                />
              </div>
            </Col>

            <Col md='12' sm='12'>
              <div className='mb-2'>
                <Label className='form-label' for='describe'>
                  Due to:
                </Label>
                <Controller
                  control={control}
                  name='describe'
                  render={({ field }) => (
                    <Flatpickr
                      required
                      id='describe'
                      name='describe'
                      className='form-control'
                      options={{
                        enableTime: false,
                        dateFormat: 'Y-m-d',
                      }}
                      {...field}
                    />
                  )}
                />
              </div>
            </Col>

            <Col md='12' sm='12'>
              <div className='mb-2'>
                <Label className='form-label' for='media'>
                  Upload of media:
                </Label>
                <Controller
                  control={control}
                  name='media'
                  render={({ field }) => (
                    <FileUploaderMultiple
                      accept='.pdf'
                      {...field}
                      invalid={errors.media && true}
                      setCheck={setCheck}
                      setMedia={setMedia}
                      setMedia2={setMedia2}
                      deleteData={deleteData}
                    />
                  )}
                />
              </div>
            </Col>

            <Col md='1' lg='1' className='ms-auto'>
              <Button type='submit' color='primary'>
                Save
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Form>
  )
}

export default AddHomework
