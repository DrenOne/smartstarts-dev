// ** React Imports
import { useEffect, useState } from 'react'
import axios from 'axios'
// ** Reactstrap Imports
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap'

const PillsVertical = ({ type }) => {
  // ** States
  const [active, setActive] = useState('')
  const [datas, setDatas] = useState([])
  let index = 0

  const toggle = tab => setActive(tab)

  useEffect(() => {
    axios
      .get(`https://admin.smartstartnow.com/api/highlight?type=${type}`)
      .then(response => setDatas(response.data.data.data))
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    if (datas.length) {
      setActive(datas[index].id)

    setInterval(() => {
      if (index < datas.length) {
        setActive(datas[index].id)
        ++index
      } else {
        index = 0
        setActive(datas[index].id)
      }
    }, 5000)
    }
  }, [datas])

  return (
    <Row>
      <Col md='3' sm='12' className='col-12'>
        <Nav pills vertical>
          {datas.map((data, index) => (
            <NavItem className='border rounded' key={index}>
              <NavLink
                style={{ fontSize: 19 }}
                active={active === data.id}
                onClick={() => toggle(data.id)}
              >
                {data?.name}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
      </Col>
      <Col md='9' sm='12'>
        <TabContent activeTab={active} className='bg-light p-2  border rounded'>
          {datas.map((data, index) => (
            <TabPane tabId={data.id} key={index}>
              <h4 style={{ fontSize: 24, fontWeight: 600 }}>
                <span className='text-danger'>"</span>
                {data?.text}
                <span className='text-danger'>"</span>
              </h4>
            </TabPane>
          ))}
        </TabContent>
      </Col>
    </Row>
  )
}
export default PillsVertical
