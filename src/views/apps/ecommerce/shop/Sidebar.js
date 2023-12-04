// ** Custom Hooks
// import { useRTL } from '@hooks/useRTL'

// ** Third Party Components
// import wNumb from 'wnumb'
// import Nouislider from 'nouislider-react'
import discount from '@src/assets/images/discount.jpg'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { X } from 'react-feather'

import Select from 'react-select'
// ** Reactstrap Imports

import { Card, CardBody, Row, Col, Input, Button, Label } from 'reactstrap'
import { getFilterCourses } from './../store'

// ** Styles
import '@styles/react/libs/noui-slider/noui-slider.scss'

const Sidebar = props => {
  // ** Props
  const {
    sidebarOpen,
    grade_id,
    setGradeV,
    program_id,
    setProgramV,
    subject_id,
    setSubjectV,
    year,
    setYear,
    sort,
    setSort,
  } = props

  // ** Hooks
  // const [isRtl] = useRTL()
  const dispatch = useDispatch()
  const [arrYears, setArrYears] = useState([])
  // const [visible, setVisible] = useState(false)
  // const [isOpen, setIsOpen] = useState(true)
  const { filter } = useSelector(state => state.ecommerce)

  useEffect(() => {
    dispatch(getFilterCourses())
  }, [])

  // useEffect(() => {
  //   if (window) {
  //     window.addEventListener('scroll', () => {
  //       if (window.pageYOffset >= 300) setVisible(true)
  //       else setVisible(false)
  //     })
  //   }
  // }, [])

  useEffect(() => {
    if (filter?.years?.length) {
      filter?.years?.forEach(({ year }) => {
        if (!arrYears.find(yearA => year === yearA.value))
          arrYears.push({ value: year, label: year + ' - ' + (parseInt(year) + 1) })
      })

      setArrYears([...arrYears])
    }
  }, [filter.years])

  return (
    <div className='sidebar-detached sidebar-left mt-1'>
      <div className='sidebar'>
        <div className={classNames('sidebar-shop', { show: sidebarOpen })}>
          <Row>
            <Col sm='12'>{/* <h6 className='filter-heading d-none d-lg-block'>Filters</h6> */}</Col>
          </Row>
          <Card>
            <CardBody>
              {/* price Range */}
              {/* <div className='price-slider'>
                <h6 className='filter-title'>Price Range</h6>
                <div className='price-slider mt-3'>
                  <Nouislider
                    className='range-slider mt-2'
                    direction={isRtl ? 'rtl' : 'ltr'}
                    start={price}
                    onChange={e => setPrice(e)}
                    connect={true}
                    tooltips={[true, true]}
                    format={wNumb({ decimals: 0 })}
                    range={{ min: 50, max: 5000 }}
                  />
                </div>
              </div> */}
              {/* Sort */}
              {/* <div id='sort' className='mt-2'>
                <h6 className='filter-title'>Sort</h6>
                {['A-Z', 'Z-A'].map((sortText, index) => (
                  <div className='form-check' key={index}>
                    <Input
                      type='radio'
                      name='sort'
                      id={sortText}
                      value={sortText}
                      defaultChecked={sort}
                      checked={sortText === sort && true}
                      onChange={e => setSort(e.target.value)}
                    />
                    <Label className='form-check-label' for={sortText}>
                      {sortText}
                    </Label>
                  </div>
                ))}
              </div> */}
              {/* Year */}
              {filter?.years?.length && (
                <div id='years' className='mt-2'>
                  <h6 className='filter-title'>Choose Academic Year</h6>
                  <Select
                    className='react-select'
                    classNamePrefix='select'
                    options={arrYears}
                    isClearable={false}
                    // placeholder='Choose Academic Year'
                    defaultValue={year}
                    onChange={e => setYear(e.value)}
                  />
                </div>
              )}
              {/* grade */}
              <div id='grade' className='mt-2'>
                <h6 className='filter-title'>Grade</h6>
                {filter?.grades?.map((grade, index) => (
                  <div className='form-check' key={index}>
                    <Input
                      type='radio'
                      name='grade'
                      id={grade.name}
                      value={grade.id}
                      defaultChecked={grade_id}
                      checked={grade.id.toString() === grade_id && true}
                      onChange={e => setGradeV(e.target.value)}
                    />
                    <Label className='form-check-label' for={grade.name}>
                      {grade.name}
                    </Label>
                  </div>
                ))}
              </div>
              {/* program */}
              <div id='program' className='mt-2'>
                <h6 className='filter-title'>Program</h6>
                {filter?.programs?.map((program, index) => (
                  <div className='form-check' key={index}>
                    <Input
                      type='radio'
                      name='program'
                      id={program.name}
                      value={program.id}
                      defaultChecked={program_id}
                      checked={program.id.toString() === program_id && true}
                      onChange={e => setProgramV(e.target.value)}
                    />
                    <Label className='form-check-label' for={program.name}>
                      {program.name}
                    </Label>
                  </div>
                ))}
              </div>
              {/* subject */}
              <div id='subject' className='mt-2'>
                <h6 className='filter-title'>Subject</h6>
                {filter?.subjects?.map((subject, index) => (
                  <div className='form-check' key={index}>
                    <Input
                      type='radio'
                      name='subject'
                      id={subject.name}
                      value={subject.id}
                      checked={subject.id.toString() === subject_id && true}
                      onChange={e => setSubjectV(e.target.value)}
                    />
                    <Label className='form-check-label' for={subject.name}>
                      {subject.name}
                    </Label>
                  </div>
                ))}
              </div>
              {/* category */}
              {/* <div id='product-categories'>
                <h6 className='filter-title'>Categories</h6>
                <ul className='list-unstyled categories-list'>
                  {categories.map(category => {
                    return (
                      <li key={category.id}>
                        <div className='form-check'>
                          <Input
                            type='radio'
                            id={category.id}
                            name='category-radio'
                            defaultChecked={category.defaultChecked}
                          />
                          <Label className='form-check-label' for={category.id}>
                            {category.title}
                          </Label>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div> */}
              {/* rating */}
              {/* <div id='ratings' className='mt-2'>
                <h6 className='filter-title'>Ratings</h6>
              </div> */}
              <div id='clear-filters' className='mt-2'>
                <Button
                  color='primary'
                  block
                  onClick={() => {
                    setGradeV('')
                    setProgramV('')
                    setSubjectV('')
                    setYear('')
                    setSort('')
                    localStorage.removeItem('grade')
                    localStorage.removeItem('program')
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            </CardBody>
          </Card>
          <Card>
            <div className='p-1'>
              <img src={discount} className='img-fluid' />
            </div>
          </Card>
        </div>
      </div>

      {/* <div
        className={classNames('position-fixed end-0 start-0 end-auto mb-3 ms-5 ps-3 animated', {
          'mb--100': !visible && isOpen,
          'bottom-0': visible && isOpen
        })}
        style={{ zIndex: 99999 }}
      >
        <div className='w-100 text-start'>
          <X size={42} onClick={() => setIsOpen(false)} />
        </div>
        <div className='rounded border overflow-hidden' style={{ width: '300px' }}>
          <Link to='/courses'>
            <img src={discount} width={300} />
          </Link>
        </div>
      </div> */}
    </div>
  )
}

export default Sidebar
