import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

// ** Reactstrap Imports
import {
  Form,
  Input,
  Card,
  Label,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Button,
  Row,
  Col,
} from 'reactstrap'
import EditorControlled from '../../../../forms/form-elements/editor/EditorControlled'
import FileUploaderMultiple from '../../../../forms/form-elements/file-uploader/FileUploaderMultiple'
import { addLectureAPI, homeworkShow, lectureShow, updateLectureAPI } from '../../store'
import { useNavigate, useParams } from 'react-router-dom'

const AddLecture = () => {
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
  const editOrAdd = window.location.href.includes('edit') ? 'Edit' : 'Add'
  let defaultValues = {}

  useEffect(() => {
    dispatch(lectureShow(courseId[1]))
  }, [window.location.href])

  const {
    control,
    setError,
    handleSubmit,
    setValue,
    resetField,
    formState: { errors },
  } = useForm({ defaultValues })

  useEffect(() => {
    if (
      window.location.href.includes('edit') &&
      deleteData === false &&
      store.lecture &&
      check === false
    ) {
      setValue('text', store.lecture.text, { shouldTouch: true })
      setValue('media', store.lecture.files, { shouldTouch: true })
      setValue('title', store.lecture.title, { shouldTouch: true })
      setValue('describe', store.lecture.description, { shouldTouch: true })
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
    if (store.addEditLectureError) handleErrorCancel()
  }, [store.addEditLectureError])

  useEffect(() => {
    setValue('text', editData, { shouldTouch: true })
    setValue('media', mediaData, { shouldTouch: true })
  }, [mediaData, editData])

  // Alert
  const handleAjax = data2 => {
    MySwal.fire({
      title: 'Are you sure?',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger ms-1',
      },
      buttonsStyling: false,
      inputAttributes: { autocapitalize: 'off' },
      showCancelButton: true,
      confirmButtonText: 'Yes',
      showLoaderOnConfirm: true,
      preConfirm() {
        const API = !id.includes('-') ? addLectureAPI(data2) : updateLectureAPI(data2)

        dispatch(API).then(res => {
          if (res?.meta?.requestStatus === 'fulfilled') {
            resetField('title')
            resetField('describe')
            setValue('describe', '', { shouldTouch: true })
            setValue('title', '', { shouldTouch: true })
            setDelete(true)
            handleSuccess()
          }
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
      title: 'The lecture was successfully saved!',
      icon: 'success',
      customClass: {
        confirmButton: 'btn btn-primary',
      },
      buttonsStyling: false,
    }).then(res => {
      const id = courseId[0] + '-' + courseId[1]
      navigate(
        window.location.href.includes('edit')
          ? `/class/list/subject/${id}`
          : `/class/list/${courseId[0]}`
      )
    })
  }

  const onSubmit = data => {
    let testData = { text: data.text, title: data.title, describe: data.describe }
    if (Object.values(testData).every(field => field?.length > 0)) {
      if (!id.includes('-')) {
        const data2 = { ...data, id: id }
        handleAjax(data2)
      } else {
        data.media = mediaData2
        const courseId = id.split('-')
        const data2 = { ...data, id: courseId[0], lectureId: courseId[1] }
        handleAjax(data2)
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
          <CardTitle tag='h4'>{editOrAdd} your lecture</CardTitle>
          <CardText className='text-muted mt-25'>
            Please enter all the information required
          </CardText>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md='12' sm='12'>
              <div className='mb-2'>
                <Label className='form-label' for='title'>
                  Title of lecture
                </Label>
                <Controller
                  control={control}
                  name='title'
                  rules={{ required: true }}
                  render={({ field }) => <Input id='title' placeholder='' {...field} />}
                />
              </div>
            </Col>

            <Col md='12' sm='12'>
              <div className='mb-2'>
                <Label className='form-label' for='describe'>
                  Description:
                </Label>
                <Controller
                  control={control}
                  name='describe'
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input type='text' id='describe' placeholder='' {...field} />
                  )}
                />
              </div>
            </Col>

            <Col md='12' sm='12'>
              <div className='mb-2'>
                <Label className='form-label' for='text'>
                  Text of lecture:
                </Label>
                <Controller
                  control={control}
                  name='text'
                  rules={{ required: true }}
                  render={({ field }) => (
                    <EditorControlled
                      {...field}
                      setCheck={setCheck}
                      invalid={errors.text && true}
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
                <Label className='form-label' for='media'>
                  Upload of media:
                </Label>
                <Controller
                  control={control}
                  name='media'
                  render={({ field }) => (
                    <FileUploaderMultiple
                      {...field}
                      invalid={errors.media && true}
                      setMedia={setMedia}
                      setMedia2={setMedia2}
                      setCheck={setCheck}
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

export default AddLecture
