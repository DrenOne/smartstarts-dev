// ** React Imports
import { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// ** Third Party Components
// import axios from 'axios'
import { Coffee, Info, Smartphone, Check, X } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'

import themeConfig from '@configs/themeConfig'
import toast from 'react-hot-toast'

// ** Custom Components
// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  Form,
  Label,
  Input,
  ListGroup,
  ListGroupItem,
  Button,
  Container
} from 'reactstrap'
import { contactPost } from '../../apps/ecommerce/store'
import { useDispatch } from 'react-redux'
import PillsVertical from '../../components/tabPills/PillsVertical'
import Avatar from '@components/avatar'


// import illustration from '@src/assets/images/illustration/pricing-Illustration.svg'
const KnowledgeBaseCategoryQuestion = () => {
  const navigate = useNavigate()
  const defaultValues = { apiKeyName: '' }
  const dispatch = useDispatch()
  const {
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [text, setText] = useState('')
  const userDate = JSON.parse(localStorage.getItem('userData'))

  useEffect(() => {
    window.scrollTo(0, 0)
}, [])

  useEffect(() => {
    if (userDate?.role === 'student' || userDate?.role === 'tutor') navigate('/schedule')
  }, [userDate])

  const ToastContent = ({  }) => {
    return (
      <div className='d-flex'>
        <div className='me-1'>
          <Avatar size='sm' color='success' icon={<Check size={12} />} />
        </div>
        <div className='d-flex flex-column'>
          <div className='d-flex justify-content-between'>
            {/* <X size={12} className='cursor-pointer' onClick={() => toast.dismiss(t.id)} /> */}
          </div>
          <span>Your message was sent</span>
        </div>
      </div>
    )
  }

  const onSubmit = data => {
    data = { name, email, subject, text }
    dispatch(contactPost(data)).then(() => {
      setName("")
      setEmail("")
      setSubject("")
      setText("")
      toast(t => (
        <ToastContent t={t}  />
      ))
    })
    }

  return (
    <Fragment>
      <div className='mt-0 mt-md-4 my-80'>
        <Row>
          <Col md={{ size: 12, order: 1 }} xs={{ size: 12, order: 1 }}>
            <Card className='overflow-hidden'>
              <Row>
                <Col md='6'>
                  <div className='w-100 h-100' style={{ backgroundColor: '#0c3161' }}>
                    <img
                      className='img-fluid text-center w-100 h-100 d-none d-md-block'
                      src={themeConfig.app.appLogoImage}
                      alt='illustration'
                    />
                  </div>
                </Col>
                <Col md='6' className='d-flex align-items-center'>
                  <div className='w-100'>
                  <CardHeader className='pb-0 mt-md-0 mt-5'>
                    <CardTitle tag='h4'>Send us message</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                      <div className='mb-2 mt-2'>
                        <Label className='form-label'>Name</Label>
                        <Input
                          id='FormName'
                          value={name}
                          onChange={e => setName(e.target.value)}
                          placeholder='Enter your name'
                          required
                        />
                      </div>
                      <div className='mb-2'>
                        <Label className='form-label' for='apiKeyName'>
                          Email
                        </Label>
                        <Input
                          type='email'
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          id='FormEmail'
                          placeholder='Enter your email'
                          required
                        />
                        {errors && errors.apiKeyName && (
                          <FormFeedback>Please enter a valid API key name</FormFeedback>
                        )}
                      </div>
                      <div className='mb-2'>
                        <Label className='form-label' for='apiKeyName'>
                          Subject
                        </Label>
                        <Input
                          id='FormSubject'
                          value={subject}
                          onChange={e => setSubject(e.target.value)}
                          placeholder='Type your subjectsss'
                          required
                        />
                        {errors && errors.apiKeyName && (
                          <FormFeedback>Please enter a valid API key name</FormFeedback>
                        )}
                      </div>
                      <div className='mb-2'>
                        <Label className='form-label' for='apiKeyName'>
                          Text
                        </Label>
                        <Input
                          type='textarea'
                          name='password'
                          value={text}
                          id='passwordVertical'
                          placeholder='Your text'
                          onChange={e => setText(e.target.value)}
                          required
                        />
                        {errors && errors.apiKeyName && (
                          <FormFeedback>Please enter a valid API key name</FormFeedback>
                        )}
                      </div>
                      <div>
                        <Button block type='submit' color='primary'>
                          Submit
                        </Button>
                      </div>
                    </Form>
                  </CardBody></div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
      <div className='container-xxl mb-2' id='pillsvertical'>
        <PillsVertical type={3} />
      </div>
    </Fragment>
  )
}

export default KnowledgeBaseCategoryQuestion
