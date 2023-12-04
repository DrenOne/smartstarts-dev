import Sidebar from '@components/sidebar'
import { useForm, Controller } from 'react-hook-form'

// ** Reactstrap Imports
import { Button, Label,  Form, Input, FormFeedback } from 'reactstrap'

// ** Store & Actions
import { useDispatch } from 'react-redux'
import { getChildList } from '../../ecommerce/store'
import axios from 'axios'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

const defaultValues = {
  login: '',
  contact: '',
  first_name: '',
  last_name: '',
  password: '',
  country: ''
}

// const countryOptions = [
//   { label: 'Australia', value: 'Australia' },
//   { label: 'Bangladesh', value: 'Bangladesh' },
//   { label: 'Belarus', value: 'Belarus' },
//   { label: 'Brazil', value: 'Brazil' },
//   { label: 'Canada', value: 'Canada' },
//   { label: 'China', value: 'China' },
//   { label: 'France', value: 'France' },
//   { label: 'Germany', value: 'Germany' },
//   { label: 'India', value: 'India' },
//   { label: 'Indonesia', value: 'Indonesia' },
//   { label: 'Israel', value: 'Israel' },
//   { label: 'Italy', value: 'Italy' },
//   { label: 'Japan', value: 'Japan' },
//   { label: 'Korea', value: 'Korea' },
//   { label: 'Mexico', value: 'Mexico' },
//   { label: 'Philippines', value: 'Philippines' },
//   { label: 'Russia', value: 'Russia' },
//   { label: 'South', value: 'South' },
//   { label: 'Thailand', value: 'Thailand' },
//   { label: 'Turkey', value: 'Turkey' },
//   { label: 'Ukraine', value: 'Ukraine' },
//   { label: 'United Arab Emirates', value: 'United Arab Emirates' },
//   { label: 'United Kingdom', value: 'United Kingdom' },
//   { label: 'United States', value: 'United States' }
// ]

const formSchema = Yup.object().shape({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  login: Yup.string().email('This is not email').required('Login is required'),
  contact: Yup.string().required('Contact is required'),
  country: Yup.string().required('Country is required'),
  password: Yup.string().required('Password is required'),
})

const SidebarNewUsers = ({ open, toggleSidebar, name, page }) => {
  // ** Store Vars
  const dispatch = useDispatch()
  const [addChildLoading, setAddChildLoading] = useState(false)

  // ** Vars
  const {
    control,
    setValue,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onTouched', resolver: yupResolver(formSchema),
  })

  // ** Function to handle form submit
  const onSubmit = async data => {
    // dispatch(postNewChild(data))
    setAddChildLoading(true)
    await axios.post(`https://admin.smartstartnow.com/api/assign-child`, data)
      .then(() => {
        setAddChildLoading(false)
        dispatch(getChildList({ name, page }))
        handleSidebarClosed()
        toggleSidebar()
      })
      .catch(err => {
        setAddChildLoading(false)
        let errors = err?.response?.data?.errors
        if (Object.keys(errors).length) {
          Object.keys(errors).map(key => setError(key, { type: 'custom', message: errors[key][0] }))
        }
      })
  }

  const handleSidebarClosed = () => {
    for (const key in defaultValues) {
      setValue(key, '')
    }
    clearErrors()
    // setRole('subscriber')
    // setPlan('basic')
  }

  return (
    <Sidebar
      size='lg'
      open={open}
      title='Add New Child'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-1'>
          <Label className='form-label' for='first_name'>
          First Name <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='first_name'
            control={control}
            render={({ field }) => (
              <Input id='first_name' placeholder='John ' invalid={errors?.first_name?.message} {...field} />
            )}
          />
          <FormFeedback>{errors?.first_name?.message}</FormFeedback>
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='last_name'>
            Last Name <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='last_name'
            control={control}
            render={({ field }) => (
              <Input id='last_name' placeholder='Doe' invalid={errors?.last_name?.message} {...field} />
            )}
          />
          <FormFeedback>{errors?.last_name?.message}</FormFeedback>
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='login'>
            Login <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='login'
            control={control}
            render={({ field }) => (
              <Input
                type='email'
                id='login'
                placeholder="Enter your child's login"
                invalid={errors?.login?.message}
                {...field}
              />
            )}
          />
          <FormFeedback>{errors?.login?.message}</FormFeedback>
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='password'>
            Password <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='password'
            control={control}
            render={({ field }) => (
              <Input id='password' placeholder="Enter your child's password" invalid={errors?.password?.message} {...field} />
            )}
          />
          <FormFeedback>{errors?.password?.message}</FormFeedback>
        </div>

        <div className='mb-1'>
          <Label className='form-label' for='contact'>
            Contact <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='contact'
            control={control}
            render={({ field }) => (
              <Input id='contact' placeholder='(397) 294-5153' invalid={errors?.contact?.message} {...field} />
            )}
          />
          <FormFeedback>{errors?.contact?.message}</FormFeedback>
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='country'>
            Country <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='country'
            control={control}
            render={({ field }) => (
              <Input id='country' placeholder='Your country' invalid={errors?.country?.message} {...field} />
            )}
          />
          <FormFeedback>{errors?.country?.message}</FormFeedback>
        </div>
        {/* <div className='mb-1'>
          <Label className='form-label' for='country'>
            Country <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='country'
            control={control}
            render={({ field }) => (
              // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
              <Select
                isClearable={false}
                classNamePrefix='select'
                options={countryOptions}
                theme={selectThemeColors}
                className={classnames('react-select', { 'is-invalid': data !== null && data.country === null })}
                {...field}
              />
            )}
          />
        </div> */}
        {/* <div className='mb-1'>
          <Label className='form-label' for='user-role'>
            User Role
          </Label>
          <Input type='select' id='user-role' name='user-role' value={role} onChange={e => setRole(e.target.value)}>
            <option value='subscriber'>Subscriber</option>
            <option value='editor'>Editor</option>
            <option value='maintainer'>Maintainer</option>
            <option value='author'>Author</option>
            <option value='admin'>Admin</option>
          </Input>
        </div> */}
        {/* <div className='mb-1' value={plan} onChange={e => setPlan(e.target.value)}>
          <Label className='form-label' for='select-plan'>
            Select Plan
          </Label>
          <Input type='select' id='select-plan' name='select-plan'>
            <option value='basic'>Basic</option>
            <option value='enterprise'>Enterprise</option>
            <option value='company'>Company</option>
            <option value='team'>Team</option>
          </Input>
        </div> */}
        <Button type='submit' className='me-1' color='primary' disabled={addChildLoading}>
          Submit
        </Button>
        <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
          Cancel
        </Button>
      </Form>
    </Sidebar>
  )
}

export default SidebarNewUsers
