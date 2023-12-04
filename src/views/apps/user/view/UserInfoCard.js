// ** React Imports
import { useState, Fragment, useEffect } from 'react'

// ** Reactstrap Imports
import { Row, Col, Card, Form, CardBody, Button, Badge, Modal, Input, Label, ModalBody, ModalHeader } from 'reactstrap'

// ** Third Party Components
import Swal from 'sweetalert2'
import Select from 'react-select'
import { Check, Briefcase, X } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'
import withReactContent from 'sweetalert2-react-content'
import {useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'


// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
// import { selectThemeColors } from '@utils'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import { editStudent, editTutor } from '../store'
import { useParams } from 'react-router-dom'

const roleColors = { 
  editor: 'light-info',
  admin: 'light-danger',
  author: 'light-warning',
  student: 'light-success',
  subscriber: 'light-primary'
}

// const statusColors = {
//   active: 'light-success',
//   pending: 'light-warning',
//   inactive: 'light-secondary'
// }

// const statusOptions = [
//   { value: 'active', label: 'Active' },
//   { value: 'inactive', label: 'Inactive' },
//   { value: 'suspended', label: 'Suspended' }
// ]

// const countryOptions = [
//   { value: 'uk', label: 'UK' },
//   { value: 'usa', label: 'USA' },
//   { value: 'france', label: 'France' },
//   { value: 'russia', label: 'Russia' },
//   { value: 'canada', label: 'Canada' }
// ]

// const languageOptions = [
//   { value: 'english', label: 'English' },
//   { value: 'spanish', label: 'Spanish' },
//   { value: 'french', label: 'French' },
//   { value: 'german', label: 'German' },
//   { value: 'dutch', label: 'Dutch' }
// ]

const MySwal = withReactContent(Swal)

const formSchema = Yup.object().shape({
  last_name: Yup.string().required('This field is required'),
  first_name: Yup.string().required('This field is required'),
  password: Yup.string().required('Please enter a valid password'),
  confirmpassword: Yup.string()
    .required('Please enter a valid confirm password')
    .oneOf([Yup.ref('password')], 'This is not same as password')
})

const UserInfoCard = ({ selectedUser }) => {
  const dispatch = useDispatch()
  const { id } = useParams()
  // ** State
  const [show, setShow] = useState(false)
  const getUserData = JSON.parse(localStorage.getItem("userData"))
  const store = useSelector((state) => state.calendar)
  const { success } = useSelector(state => state.users)

  // ** useEffect
  useEffect(() => {
    document.body.style.overflow = show ? 'hidden' : ''
  }, [show])

  // ** Hook
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onTouched', resolver: yupResolver(formSchema),
    defaultValues: {
      // username: selectedUser.username,
      last_name: selectedUser?.last_name,
      first_name: selectedUser?.first_name
    }
  })
  // ** render user img
  const renderUserImg = () => {
    if (selectedUser !== null && selectedUser?.avatar?.length) {
      return (
        <img
          height='110'
          width='110'
          alt='user-avatar'
          src={selectedUser.avatar}
          className='img-fluid rounded mt-3 mb-2'
        />
      )
    } else {
      return (
        <Avatar
          initials
          color={ 'light-primary'}
          className='rounded mt-3 mb-2'
          content={`${selectedUser.first_name}  ${selectedUser.last_name}` }
          contentStyles={{
            borderRadius: 0,
            fontSize: 'calc(48px)',
            width: '100%',
            height: '100%'
          }}
          style={{
            height: '110px',
            width: '110px'
          }}
        />
      )
    }
  }

  const onSubmit = data => {
    if (getUserData.role === 'tutor') dispatch(editTutor({ data, id }))
    else dispatch(editStudent({ data, id }))
  }

  useEffect(() => {
    if (success) setShow(false)
  }, [success])

  const handleReset = () => {
    reset({
      // username: selectedUser?.username,
      lastName: selectedUser?.last_name,
      firstName: selectedUser?.first_name
    })
  }

  // const handleSuspendedClick = () => {
  //   return MySwal.fire({
  //     title: 'Are you sure?',
  //     text: "You won't be able to revert user!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes, Suspend user!',
  //     customClass: {
  //       confirmButton: 'btn btn-primary',
  //       cancelButton: 'btn btn-outline-danger ms-1'
  //     },
  //     buttonsStyling: false
  //   }).then(function (result) {
  //     if (result.value) {
  //       MySwal.fire({
  //         icon: 'success',
  //         title: 'Suspended!',
  //         text: 'User has been suspended.',
  //         customClass: { confirmButton: 'btn btn-success' }
  //       })
  //     } else if (result.dismiss === MySwal.DismissReason.cancel) {
  //       MySwal.fire({
  //         title: 'Cancelled',
  //         text: 'Cancelled Suspension :)',
  //         icon: 'error',
  //         customClass: { confirmButton: 'btn btn-success' }
  //       })
  //     }
  //   })
  // }

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className='user-avatar-section'>
            <div className='d-flex align-items-center flex-column'>
              {renderUserImg()}
              <div className='d-flex flex-column align-items-center text-center'>
                <div className='user-info'>
                  <h4>{selectedUser !== null ? `${selectedUser.first_name} ${selectedUser.last_name}` : 'Eleanor Aguilar'}</h4>
                  {selectedUser !== null ? (
                    <Badge color={roleColors[selectedUser.role]} className='text-capitalize'>
                      {selectedUser.role}
                    </Badge>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className='d-flex justify-content-around my-2 pt-75'>
            <div className='d-flex align-items-start me-2'>
              <Badge color='light-primary' className='rounded p-75'>
                <Check className='font-medium-2' />
              </Badge>
              <div className='ms-75'>
                <h4 className='mb-0'>{store.alldata.length || 0}</h4>
                <small>All Courses</small>
              </div>
            </div>
            <div className='d-flex align-items-start'>
              <Badge color='light-primary' className='rounded p-75'>
                <Briefcase className='font-medium-2' />
              </Badge>
              <div className='ms-75'>
                <h4 className='mb-0'>0</h4>
                <small>Completed Courses</small>
              </div>
            </div>
          </div>
          <h4 className='fw-bolder border-bottom pb-50 mb-1'>Details</h4>
          <div className='info-container'>
            {Object.keys(selectedUser).length ? (
              <ul className='list-unstyled'>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>First Name:</span>
                  <span>{selectedUser.first_name}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Last Name:</span>
                  <span>{selectedUser.last_name}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Email:</span>
                  <span>{selectedUser.email}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Status:</span>
                  <Badge className='text-capitalize' color={!selectedUser.status ? "success" : ""}>
                    {selectedUser.status || "active"}
                  </Badge>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Role:</span>
                  <span className='text-capitalize'>{selectedUser.role}</span>
                </li>
                {/* <li className='mb-75'>
                  <span className='fw-bolder me-25'>Contact:</span>
                  <span>{selectedUser.contact}</span>
                </li> */}
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Language:</span>
                  <span>English</span>
                </li>
                {/* <li className='mb-75'>
                  <span className='fw-bolder me-25'>Country:</span>
                  <span>{selectedUser.country}</span>
                </li> */}
              </ul>
            ) : null}
          </div>
          { getUserData.role !== "student" && <div className='d-flex justify-content-center pt-2'>
            <Button color='primary' onClick={() => setShow(true)}>
              Edit
            </Button>
            {/* <Button className='ms-1' color='danger' outline onClick={handleSuspendedClick}>
              Suspended
            </Button> */}
          </div>}
        </CardBody>
      </Card>
      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 pt-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>Edit User Information</h1>
            <p>Updating user details will receive a privacy audit.</p>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className='gy-1 pt-75'>
              <Col md={6} xs={12}>
                <Label className='form-label' for='firstName'>
                  First Name
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='firstName'
                  name='first_name'
                  render={({ field }) => (
                    <Input {...field} id='firstName' placeholder='John' invalid={errors?.first_name?.message && true} />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='lastName'>
                  Last Name
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='lastName'
                  name='last_name'
                  render={({ field }) => (
                    <Input {...field} id='lastName' placeholder='Doe' invalid={errors?.last_name?.message && true} />
                  )}
                />
              </Col>
              {/* <Col xs={12}>
                <Label className='form-label' for='passwordformzoom'>
                  Password for zoom
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='passwordformzoom'
                  name='passwordformzoom'
                  render={({ field }) => (
                    <Input {...field} id='passwordformzoom' placeholder='Password for zoom' invalid={errors.passwordformzoom && true} />
                  )}
                />
              </Col> */}
              <Col md={6} xs={12}>
                <Label className='form-label' for='password'>
                  Password
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='password'
                  name='password'
                  render={({ field }) => (
                    <Input {...field} id='password' placeholder='******' invalid={errors?.password?.message && true} />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='confirmpassword'>
                  Confirm Password
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='confirmpassword'
                  name='confirmpassword'
                  render={({ field }) => (
                    <Input {...field} id='confirmpassword' placeholder='******' invalid={errors?.confirmpassword?.message && true} />
                  )}
                />
              </Col>
              {/* <Col xs={12}>
                <Label className='form-label' for='username'>
                  Username
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='username'
                  name='username'
                  render={({ field }) => (
                    <Input {...field} id='username' placeholder='john.doe.007' invalid={errors.username && true} />
                  )}
                />
              </Col> */}
              {/* <Col md={6} xs={12}>
                <Label className='form-label' for='billing-email'>
                  Billing Email
                </Label>
                <Input
                  type='email'
                  id='billing-email'
                  defaultValue={selectedUser.email}
                  placeholder='example@domain.com'
                />
              </Col> */}
              {/* <Col md={6} xs={12}>
                <Label className='form-label' for='status'>
                  Status:
                </Label>
                <Select
                  id='status'
                  isClearable={false}
                  className='react-select'
                  classNamePrefix='select'
                  options={statusOptions}
                  theme={selectThemeColors}
                  defaultValue={statusOptions[statusOptions.findIndex(i => i.value === selectedUser.status)]}
                />
              </Col> */}
              {/* <Col md={6} xs={12}>
                <Label className='form-label' for='tax-id'>
                  Tax ID
                </Label>
                <Input
                  id='tax-id'
                  placeholder='Tax-1234'
                  defaultValue={selectedUser.contact.substr(selectedUser.contact.length - 4)}
                />
              </Col> */}
              {/* <Col md={6} xs={12}>
                <Label className='form-label' for='contact'>
                  Contact
                </Label>
                <Input id='contact' defaultValue={selectedUser.contact} placeholder='+1 609 933 4422' />
              </Col> */}
              {/* <Col md={6} xs={12}>
                <Label className='form-label' for='language'>
                  language
                </Label>
                <Select
                  id='language'
                  isClearable={false}
                  className='react-select'
                  classNamePrefix='select'
                  options={languageOptions}
                  theme={selectThemeColors}
                  defaultValue={languageOptions[0]}
                />
              </Col> */}
              {/* <Col md={6} xs={12}>
                <Label className='form-label' for='country'>
                  Country
                </Label>
                <Select
                  id='country'
                  isClearable={false}
                  className='react-select'
                  classNamePrefix='select'
                  options={countryOptions}
                  theme={selectThemeColors}
                  defaultValue={countryOptions[0]}
                />
              </Col> */}
              {/* <Col xs={12}>
                <div className='d-flex align-items-center mt-1'>
                  <div className='form-switch'>
                    <Input type='switch' defaultChecked id='billing-switch' name='billing-switch' />
                    <Label className='form-check-label' htmlFor='billing-switch'>
                      <span className='switch-icon-left'>
                        <Check size={14} />
                      </span>
                      <span className='switch-icon-right'>
                        <X size={14} />
                      </span>
                    </Label>
                  </div>
                  <Label className='form-check-label fw-bolder' for='billing-switch'>
                    Use as a billing address?
                  </Label>
                </div>
              </Col> */}
              <Col xs={12} className='text-center mt-2 pt-50'>
                <Button type='submit' className='me-1' color='primary'>
                  Submit
                </Button>
                <Button
                  type='reset'
                  color='secondary'
                  outline
                  onClick={() => {
                    handleReset()
                    setShow(false)
                  }}
                >
                  Discard
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default UserInfoCard
