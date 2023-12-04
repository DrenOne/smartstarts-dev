// ** React Imports
// import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'
import useJwt from '@src/auth/jwt/useJwt'

// ** Third Party Components
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { Facebook, Twitter, Coffee, X, Instagram } from 'react-feather'

// ** Actions
import { handleLogin } from '@store/authentication'
import themeConfig from '@configs/themeConfig'

// ** Context
// import { AbilityContext } from '@src/utility/context/Can'

// ** Custom Components
import Avatar from '@components/avatar'
import InputPasswordToggle from '@components/input-password-toggle'

// ** Utils
import { getHomeRouteForLoggedInUser } from '@utils'

// ** Reactstrap Imports
import { Row, Col, Form, Input, Label, Alert, Button, CardText, CardTitle, UncontrolledTooltip, FormFeedback } from 'reactstrap'

// ** Styles
import '@styles/react/pages/page-authentication.scss'
import { useEffect, useState } from 'react'

const ToastContent = ({ t, name, role }) => {
  return (
    <div className='d-flex'>
      <div className='me-1'>
        <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
      </div>
      <div className='d-flex flex-column'>
        <div className='d-flex justify-content-between'>
          <h6>{name}</h6>
          <X size={12} className='cursor-pointer' onClick={() => toast.dismiss(t.id)} />
        </div>
        <span>You have successfully logged in as an {role} to SmartStart. Now you can start to explore. Enjoy!</span>
      </div>
    </div>
  )
}

// const defaultValues = {
//   password: 'admin',
//   loginEmail: 'admin@demo.com'
// }

const Login = () => {
  // ** Hooks
  const { skin } = useSkin()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const ability = useContext(AbilityContext)
  const [errText, setErrText] = useState(false)
  let user = JSON.parse(localStorage.getItem('userData'))

  useEffect(() => {
    if (user) navigate('/')
  }, [user])

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm()
  // const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
  //   source = require(`@src/assets/images/pages/${illustration}`).default
  const source = require(`@src/assets/images/pages/login-small.jpg`).default
  const logoTransparent = require(`@src/assets/images/pages/Logo-transparent.png`).default

  const onSubmit = data1 => {
    if (Object.values(data1).every(field => field.length > 0)) {
      useJwt
        .login({ email: data1.loginEmail, password: data1.password })
        .then(res => {
          setErrText(false)
          const data = { ...res?.data?.user, accessToken: res.data?.token, refreshToken: res.data?.refreshToken }
          dispatch(handleLogin(data))
          // ability.update(res?.data?.userData?.ability)
          navigate(getHomeRouteForLoggedInUser(data.role))
          toast(t => (
            <ToastContent t={t} role={data.role} name={`${data.first_name}  ${data.last_name}` || 'John Doe'} />
          ))
        }).catch(err => {
          const objectkeys = { ...err.response.data.errors }
          Object.keys(objectkeys).forEach(objectkey => setError(objectkey, {type: 'manual', message: objectkeys[objectkey][0]}))
          setErrText(true)
        })
        setTimeout(() => {
          const getUserData = JSON.parse(localStorage.getItem("userData"))
        getUserData ? setErrText() : setErrText(true)
        }, 800)
    } else {
      for (const key in data1) {
        if (data1[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  }

  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0 bg-primary'>
        <Link className='brand-logo w-auto' to='/'>
          <img src={logoTransparent} alt="logo" style={{height: "150px"}} />
          {/* <h2 className='brand-text text-primary ms-1'>SmartStart</h2> */}
        </Link>
        <Col className='d-none d-lg-flex align-items-center px-0 h-100' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center h-100'>
            <img className='img-fluid h-100 w-100' style={{ objectFit: 'cover' }} src={source} alt='Login Cover' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='fw-bold mb-1'>
              Welcome to Smart Start USA! 👋
            </CardTitle>
            <CardText className='mb-0'>Please sign-in to your account and start the adventure!</CardText>
            <CardText className='mb-0' style={{display : errText ? "block" : "none", color:"#BA1524"}}>
              Your email, or password is incorrect.
            </CardText>
            {/* <Alert color='primary'>
              <div className='alert-body font-small-2'>
                <p>
                  <small className='me-50'>
                    <span className='fw-bold'>Admin:</span> admin@demo.com | admin
                  </small>
                </p>
                <p>
                  <small className='me-50'>
                    <span className='fw-bold'>Client:</span> client@demo.com | client
                  </small>
                </p>
              </div>
              <HelpCircle
                id='login-tip'
                className='position-absolute'
                size={18}
                style={{ top: '10px', right: '10px' }}
              />
              <UncontrolledTooltip target='login-tip' placement='left'>
                This is just for ACL demo purpose.
              </UncontrolledTooltip>
            </Alert> */}
            <Form className='auth-login-form mt-1' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-1'>
                <Label className='form-label' for='login-email'>
                  Email
                </Label>
                <Controller
                  id='loginEmail'
                  name='loginEmail'
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      type='email'
                      placeholder='john@example.com'
                      invalid={errors.loginEmail && true}
                      {...field}
                    />
                  )}
                />
                {errors.loginEmail ? (
                  <FormFeedback>{errors.loginEmail.message}</FormFeedback>
                ) : null}
              </div>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Password
                  </Label>
                  <Link to='/forgot-password'>
                    <small>Forgot Password?</small>
                  </Link>
                </div>
                <Controller
                  id='password'
                  name='password'
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle className='input-group-merge' invalid={errors.password && true} {...field} />
                  )}
                />
                {errors.password ? (
                  <FormFeedback>{errors.password.message}</FormFeedback>
                ) : null}
              </div>
              <div className='form-check mb-1'>
                <Input type='checkbox' id='remember-me' />
                <Label className='form-check-label' for='remember-me'>
                  Remember Me
                </Label>
              </div>
              <Button type='submit' color='primary' block>
                Sign in
              </Button>
            </Form>
            <p className='text-center mt-2'>
              <span className='me-25'>New on our platform?</span>
              <Link to='/register'>
                <span>Create an account</span>
              </Link>
            </p>
            {/* <div className='divider my-2'>
              <div className='divider-text'>or</div>
            </div>
            <div className='auth-footer-btn d-flex justify-content-center'>
              <Button color='facebook'>
                <Facebook size={14} />
              </Button>
              <Button color='twitter'>
                <Twitter size={14} />
              </Button>
              <Button className='instagram'>
                <Instagram size={14} />
              </Button>
            </div> */}
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Login
