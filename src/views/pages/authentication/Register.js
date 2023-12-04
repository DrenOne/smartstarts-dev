// ** React Imports
// import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'
import useJwt from '@src/auth/jwt/useJwt'
import themeConfig from '@configs/themeConfig'

// ** Store & Actions
import { useDispatch } from 'react-redux'
import { handleLogin } from '@store/authentication'

// ** Third Party Components
import { useForm, Controller } from 'react-hook-form'
import { Facebook, Twitter, Mail, GitHub } from 'react-feather'

// ** Context
import { AbilityContext } from '@src/utility/context/Can'

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle'

// ** Reactstrap Imports
import { Row, Col, CardTitle, CardText, Label, Button, Form, Input, FormFeedback } from 'reactstrap'

// ** Utils
import { getHomeRouteForLoggedInUser } from '@utils'

// ** Styles
import '@styles/react/pages/page-authentication.scss'

const defaultValues = {
  email: '',
  terms: false,
  first_name: '',
  last_name: '',
  password: '',
  confirmPassword: ''
}

const Register = () => {
  // ** Hooks
  // const ability = useContext(AbilityContext)
  const { skin } = useSkin()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  // const illustration = skin === 'dark' ? 'register-v2-dark.svg' : 'register-v2.svg',
  //   source = require(`@src/assets/images/pages/${illustration}`).default
  const source = require(`@src/assets/images/pages/register.jpg`).default
  const logoTransparent = require(`@src/assets/images/pages/Logo-transparent.png`).default

  const onSubmit = data => {
    const tempData = { ...data }
    delete tempData.terms
    if (Object.values(tempData).every(field => field.length > 0) && data.terms === true) {
      const { first_name, last_name, email, password, confirmPassword } = data
      if (password === confirmPassword) {
        useJwt
          .register({ first_name, last_name, email, password })
          .then(res => {
            if (res.data.error) {
              for (const property in res.data.error) {
                if (res.data.error[property] !== null) {
                  setError(property, {
                    type: 'manual',
                    message: res.data.error[property]
                  })
                }
              }
            } else {
              const data = { ...res?.data?.user, accessToken: res.data?.token }
              // ability.update(res.data.user.ability)
              dispatch(handleLogin(data))
              navigate(getHomeRouteForLoggedInUser(data.role))
            }
          })
          .catch(err => {
            const objectkeys = { ...err.response.data.errors }
            Object.keys(objectkeys).forEach(objectkey => setError(objectkey, {type: 'manual', message: objectkeys[objectkey][0]}))
          })
      } else setError('confirmPassword', {type: 'manual', message: 'Not the same as password'})
    } else {
      for (const key in data) {
        if (data[key]?.length === 0) {
          setError(key, {
            type: 'manual',
            message: `Please enter a valid ${key}`
          })
        }
        if (key === 'terms' && data.terms === false) {
          setError('terms', {
            type: 'manual'
          })
        }
      }
    }
  }

  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0 bg-primary">
        <Link className="brand-logo w-auto" to="/">
          <img src={logoTransparent} alt="logo" style={{height: "150px"}} />

          {/* <h2 className="brand-text text-primary ms-1">Vuexy</h2> */}
        </Link>
        <Col className="d-none d-lg-flex align-items-center px-0 h-100" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center h-100">
            <img className="img-fluid h-100 w-100" style={{ objectFit: 'cover' }} src={source} alt="Login Cover" />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="fw-bold mb-1">
              Welcome to Smart Start USA
            </CardTitle>
            {/* <CardText className="mb-2">
              Make your app management easy and fun!
            </CardText> */}

            <Form
              action="/"
              className="auth-register-form mt-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mb-1">
                <Label className="form-label" for="register-first-name">
                  Firstname
                </Label>
                <Controller
                  id="first_name"
                  name="first_name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      placeholder="john"
                      invalid={errors.first_name && true}
                      {...field}
                    />
                  )}
                />
                {errors.first_name ? (
                  <FormFeedback>{errors.first_name.message}</FormFeedback>
                ) : null}
              </div>
              <div className="mb-1">
                <Label className="form-label" for="register-last-name">
                  Lastname
                </Label>
                <Controller
                  id="last_name"
                  name="last_name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      placeholder="doe"
                      invalid={errors.last_name && true}
                      {...field}
                    />
                  )}
                />
                {errors.last_name ? (
                  <FormFeedback>{errors.last_name.message}</FormFeedback>
                ) : null}
              </div>
              <div className="mb-1">
                <Label className="form-label" for="register-email">
                  Email
                </Label>
                <Controller
                  id="email"
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      invalid={errors.email && true}
                      {...field}
                    />
                  )}
                />
                {errors.email ? (
                  <FormFeedback>{errors.email.message}</FormFeedback>
                ) : null}
              </div>
              <div className="mb-1">
                <Label className="form-label" for="register-password">
                  Password
                </Label>
                <Controller
                  id="password"
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle
                      className="input-group-merge"
                      invalid={errors.password && true}
                      {...field}
                    />
                  )}
                />
                {errors.password ? (
                  <FormFeedback>{errors.password.message}</FormFeedback>
                ) : null}
              </div>
              <div className="mb-1">
                <Label className="form-label" for="register-confirm-password">
                  Confirm Password
                </Label>
                <Controller
                  id="confirm-password"
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle
                      className="input-group-merge"
                      invalid={errors.confirmPassword && true}
                      {...field}
                    />
                  )}
                />
                {errors.confirmPassword ? (
                  <FormFeedback>{errors.confirmPassword.message}</FormFeedback>
                ) : null}
              </div>
              <div className="form-check mb-1">
                <Controller
                  name="terms"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="terms"
                      type="checkbox"
                      checked={field.value}
                      invalid={errors.terms && true}
                    />
                  )}
                />
                <Label className="form-check-label" for="terms">
                  I agree to
                  <a
                    className="ms-25"
                    href="/"
                    onClick={(e) => e.preventDefault()}
                  >
                    privacy policy & terms
                  </a>
                </Label>
              </div>
              <Button type="submit" block color="primary">
                Sign up
              </Button>
            </Form>
            <p className="text-center mt-2">
              <span className="me-25">Already have an account?</span>
              <Link to="/login">
                <span>Sign in instead</span>
              </Link>
            </p>
            {/* <div className="divider my-2">
              <div className="divider-text">or</div>
            </div>
            <div className="auth-footer-btn d-flex justify-content-center">
              <Button color="facebook">
                <Facebook size={14} />
              </Button>
              <Button color="twitter">
                <Twitter size={14} />
              </Button>
              <Button color="google">
                <Mail size={14} />
              </Button>
              <Button className="me-0" color="github">
                <GitHub size={14} />
              </Button>
            </div> */}
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Register
