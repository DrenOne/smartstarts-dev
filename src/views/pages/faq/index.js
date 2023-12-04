// ** Reactstrap Imports
import { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// ** Third Party Imports
import axios from 'axios'

// ** Demo Components
import Faqs from './Faqs'
import FaqFilter from './FaqFilter'
import FaqContact from './FaqContact'

// ** Custom Component
import Breadcrumbs from '@components/breadcrumbs'

// ** Styles
import '@styles/base/pages/page-faq.scss'
import img from "@src/assets/images/slider/1.jpg"

const Faq = () => {
  // ** States
  const [data, setData] = useState(null),
    [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()
  const userDate = JSON.parse(localStorage.getItem('userData'))


  const getFAQData = query => {
    axios.get('https://admin.smartstartnow.com/api/faq-category', { params: { q: query } }).then(response => {
     setData(response.data.data.data)
    }).catch(err => console.log(err))
    // console.log(x)
    // return axios.get('/faq/data', { params: { q: query } }).then(response => {
    //   setData(response.data)
    // })
  }

  useEffect(() => {
    if (userDate?.role === 'student' || userDate?.role === 'tutor') navigate('/schedule')
  }, [userDate])

  useEffect(() => {
    getFAQData(searchTerm)
  }, [])

  return (
    <Fragment>
      <div className='mt-5 pt-1 pt-md-0 mt-md-0'>
        <img src={img} width="100%"/>
      </div>
      <div className='container-xxl p-5'>
        <h1>FAQ</h1>
      {/* <FaqFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} getFAQData={getFAQData} /> */}
      {data !== null ? <Faqs data={data} searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> : null}
      {/* <FaqContact /> */}
      </div>
    </Fragment>
  )
}

export default Faq
