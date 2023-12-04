// ** Reactstrap Imports
import {
  Row,
  Col,
  Form,
  Card,
  Label,
  Input,
  Button,
  CardBody,
  CardTitle,
  CardHeader
} from "reactstrap"
import {useState } from 'react'
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { contactPost } from "../../apps/ecommerce/store"
import toast from 'react-hot-toast'
import { Coffee, Info, Smartphone, Check, X } from 'react-feather'
import Avatar from '@components/avatar'

const VerticalForm = () => {
  const {
    handleSubmit
    // formState: { errors }
  } = useForm({})
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [text, setText] = useState('')

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
  const reset = () => {
    setName("")
    setEmail("")
    setSubject("")
    setText("")
  }
  return (
    <div className="bg-primary mt-2 rounded">
    <h4 className="text-white bg-danger p-1 text-center rounded-top">Inquire Today!</h4>
       <Card className="bg-primary ">
            <CardBody>
            <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col className="mb-1 col-12">
              <Label className="form-label text-white" for="nameVertical">
                Full Name
              </Label>
              <Input
                type="text"
                name="name"
                id="nameVertical"
                placeholder="First Name"
                required        
                value={name}
                onChange={e => setName(e.target.value)}

              />
            </Col>
            <Col className="mb-1 col-12">
              <Label className="form-label text-white" for="EmailVertical">
                Email
              </Label>
              <Input
                type="email"
                name="Email"
                id="EmailVertical"
                placeholder="Email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Col>
            <Col className="mb-1 col-12">
              <Label className="form-label text-white" for="mobileVertical">
                Contact Number
              </Label>
              <Input
                type="text"
                name="mobile"
                id="mobileVertical"
                placeholder="Mobile"
                required
                value={subject}
                onChange={e => setSubject(e.target.value)}
              />
            </Col>
            <Col className="mb-1 col-12">
              <Label className="form-label text-white" for="passwordVertical">
                Brief Description
              </Label>
              <Input
                type="textarea"
                name="password"
                id="passwordVertical"
                placeholder="Password"
                required
                value={text}
                onChange={e => setText(e.target.value)}

              />
            </Col>

            <Col className="col-12">
              <div className="d-flex justify-content-end">
                <Button
                  className="me-1"
                  color="danger"
                  type="submit"
                  required
                >
                  Submit
                </Button>
                <Button  color="success" type="button" onClick={reset}>
                  Reset
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
    </div>
  )
}
export default VerticalForm
