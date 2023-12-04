// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'

// ** React Hook Form
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

// ** Icons Imports
import { ChevronLeft } from 'react-feather'

// ** React Imports
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle'

// ** Reactstrap Imports
import { Row, Col, CardTitle, CardText, Form, Label, Button, FormFeedback } from 'reactstrap'

import themeConfig from '@configs/themeConfig'

// ** Styles
import '@styles/react/pages/page-authentication.scss'
import axios from 'axios'

// const defaultValues = { password: '', confirmPassword: '' }

const ResetPasswordCover = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()

  // ** Hooks
  const { skin } = useSkin()
  const formSchema = Yup.object().shape({
    password: Yup.string().required('Please enter a valid password'),
    confirmPassword: Yup.string()
      .required('Please enter a valid confirm password')
      .oneOf([Yup.ref('password')], 'This is not same as password')
  })
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: 'onTouched', resolver: yupResolver(formSchema) })

  const token = searchParams.get('token')

  const onSubmit = ({ password }) => {
    axios
      .post(
        `https://admin.smartstartnow.com/api/${
          location.pathname === '/pages/change-password' ? 'update' : 'create'
        }-password`,
        { token, password }
      )
      .then(res => {
        if (res.status === 200) navigate('/login')
      })
      .catch(err => console.log(err))
  }

  const illustration = skin === 'dark' ? 'reset-password-v2-dark.svg' : 'reset-password-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0 bg-primary'>
        <Link className='brand-logo' to='/'>
          <img src={themeConfig.app.appLogoImage} alt='logo' />
          <h2 className='brand-text text-primary ms-1'>SmartStart</h2>
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login Cover' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='fw-bold mb-1'>
              Create Password 🔒
            </CardTitle>
            <CardText className='mb-2'>Create new password and enter to the login</CardText>
            <Form className='auth-reset-password-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-1'>
                <Label className='form-label' for='password'>
                  New Password
                </Label>
                <Controller
                  id='password'
                  name='password'
                  // rules={{ required: 'Please enter a valid password' }}
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle
                      // {...register('password')}
                      className='input-group-merge'
                      autoFocus
                      invalid={errors.password && true}
                      {...field}
                    />
                  )}
                />
                {errors.password ? <FormFeedback>{errors.password.message}</FormFeedback> : null}
              </div>
              <div className='mb-1'>
                <Label className='form-label' for='register-confirm-password'>
                  Confirm Password
                </Label>
                <Controller
                  id='confirm-password'
                  name='confirmPassword'
                  // rules={{ required: 'Please enter a valid confirm password' }}
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle
                      // {...register('confirmPassword')}
                      className='input-group-merge'
                      invalid={errors.confirmPassword && true}
                      {...field}
                    />
                  )}
                />
                {errors.confirmPassword ? (
                  <FormFeedback>{errors.confirmPassword.message}</FormFeedback>
                ) : null}
              </div>
              {/* <div className='mb-1'>
                <Label className='form-label' for='confirm-password'>
                  Confirm Password
                </Label>
                <InputPassword className='input-group-merge' id='confirm-password' />
              </div> */}
              <Button color='primary' block>
                Set New Password
              </Button>
            </Form>
            {/* <p className='text-center mt-2'>
              <Link to='/pages/login-cover'>
                <ChevronLeft className='rotate-rtl me-25' size={14} />
                <span className='align-middle'>Back to login</span>
              </Link>
            </p> */}
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default ResetPasswordCover
