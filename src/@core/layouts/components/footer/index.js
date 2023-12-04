import { Button, Col, Container, Input, Row } from 'reactstrap'

// ** Icons Import
import { Facebook, Instagram, Youtube } from 'react-feather'
import themeConfig from '@configs/themeConfig'
import { Link } from 'react-router-dom'

const Footer = () => {
  const visa = require(`@src/assets/images/visa.png`).default
  const mastercard = require(`@src/assets/images/mastercard.png`).default
  const discover = require(`@src/assets/images/discover.png`).default
  const american_express = require(`@src/assets/images/american-express.png`).default

  return (
    <div style={{ background: '#0A3161', minWidth: '100%', position: 'relative', zIndex: 9 }}>
      <Container fluid>
        <Row>
          <Col lg='3' sm='6' className='order-lg-1 border-sm-end align-items-center'>
            <div className='p-1 text-sm-start text-center'>
              <img src={themeConfig.app.appLogoImage} width='50%' />
              <p className='clearfix mb-0'>
                <span className='float-md-start d-block d-md-inline-block mt-25 text-white fs-lg-10'>
                  <span className='text-muted'>COPYRIGHT © {new Date().getFullYear()}</span>{' '}
                  SmartStart
                </span>
              </p>
            </div>
          </Col>
          <Col lg='6' sm='12' className='order-lg-2 order-sm-last border-lg-end px-1'>
            <Row className='align-items-center my-auto h-100'>
              <Col sm='3' className='col-12 text-sm-start text-center fs-20'>
                <p className='mb-1 mt-2'>
                  <Link to='/' className='text-white fw-bold'>
                    Home
                  </Link>
                </p>
                <p className='mb-1'>
                  <Link to='/about' className='text-white fw-bold'>
                    About Us
                  </Link>
                </p>
                <p className='mb-1'>
                  <Link to='/courses' className='text-white fw-bold'>
                    Courses
                  </Link>
                </p>
                <p className='mb-1'>
                  <Link to='/FAQ' className='text-white fw-bold'>
                    FAQs
                  </Link>
                </p>
                <p className='mb-1'>
                  <Link to='/contact' className='text-white fw-bold'>
                    Contact
                  </Link>
                </p>
              </Col>
              <Col sm='7' className='col-12 h-sm-100 pb-0'>
                <div className='d-sm-flex flex-sm-column text-center h-100'>
                  <div className='mt-auto'>
                    <h4 className='text-white fs-1rem fs-lg-14 fs-md-14'>
                      Sign in for newsletters
                    </h4>
                    <Input
                      type='email'
                      id='signInput'
                      bsSize='sm'
                      className='w-lg-100 w-md-50 w-sm-75 mx-auto'
                    />
                    <div className='text-center'>
                      <Button color='danger' size='sm' className='mt-1 mb-1'>
                        Submit
                      </Button>
                    </div>
                  </div>
                  <p>
                    <Link to='/' className='text-white fs-10'>
                      Terms of use | Privacy Policy
                    </Link>
                  </p>
                </div>
              </Col>
              <Col sm='2' className='col-12'>
                <div className='d-flex justify-content-around align-items-sm-end flex-sm-column'>
                  <a href='https://www.facebook.com/profile.php?id=61552284789598' className='text-white mb-2'>
                    <Facebook size={26} />
                  </a>
                  <a href='https://www.instagram.com/smartstart_usa/' className='text-white mb-2 d-sm-block'>
                    <Instagram size={26} />
                  </a>
                  <a href='https://www.youtube.com/channel/UCgVPOrnr86-wTLVhLCgeOQw' className='text-white d-sm-block'>
                    <Youtube size={26} />
                  </a>
                </div>
              </Col>
            </Row>
          </Col>
          {window.innerWidth <= 768 ? (
            <Col lg='3' sm='6' className='order-lg-3 d-flex align-items-center text-center'>
              <div className='w-100 ' id='textCenterRespon'>
                <h6 className='fs-12' style={{ color: 'red' }}>
                  Contact Us:
                </h6>
                <p className='text-white fw-bold fs-12'>
                  <a href='tel:8778780777' style={{ color: 'white' }}>
                    (877) 878-0777
                  </a>{' '}
                  <br></br>{' '}
                  <a href='tel:2129511181' style={{ color: 'white' }}>
                    (212) 951-1181
                  </a>{' '}
                </p>
                <h6 className='fs-12' style={{ color: 'red' }}>
                  Email Us:
                </h6>
                <p className='text-white fw-bold fs-12'>
                  <a href='email:info@smartstartnow.com' style={{ color: 'white' }}>
                    info@smartstartnow.com
                  </a>
                </p>
                {/* <h6 className='text-white text-muted fs-1.2vw'>Developed by Drensys</h6> */}
                <Row className='d-flex'>
                  <Col>
                    <img src={visa} alt='visa.png' className='object-fit-contain w-75' height='35px' />
                  </Col>
                  <Col>
                    <img src={mastercard} alt='mastercard.png' className='object-fit-contain w-75' height='35px' />
                  </Col>
                  <Col>
                    <img src={discover} alt='discover.png' className='object-fit-contain w-75' height='35px' />
                  </Col>
                  <Col>
                    <img src={american_express} alt='american-express.png' className='object-fit-contain w-75' height='35px' />
                  </Col>
                </Row>
              </div>
            </Col>
          ) : (
            <Col lg='3' sm='6' className='order-lg-3 d-flex align-items-center'>
              <div className='w-100 ' id='textCenterRespon'>
                <h6 className='fs-12' style={{ color: 'red' }}>
                  Contact Us:
                </h6>
                <p className='text-white fw-bold fs-12'>
                  <a href='tel:8778780777' className='h4' style={{ color: 'white' }}>
                    (877) 878-0777
                  </a>{' '}
                  <br></br>{' '}
                  <a href='tel:2129511181' className='h4' style={{ color: 'white' }}>
                    (212) 951-1181
                  </a>{' '}
                </p>
                <h6 className='fs-12' style={{ color: 'red' }}>
                  Email Us:
                </h6>
                <p className='text-white fw-bold fs-12'>
                  <a href='email:info@smartstartnow.com' className='h4' style={{ color: 'white' }}>
                    info@smartstartnow.com
                  </a>
                </p>
                {/* <h6 className='text-white text-muted fs-1.2vw'>Developed by Drensys</h6> */}
                <Row className='d-flex'>
                  <Col>
                    <img src={visa} alt='visa.png' className='object-fit-contain w-75' height='35px' />
                  </Col>
                  <Col>
                    <img src={mastercard} alt='mastercard.png' className='object-fit-contain w-75' height='35px' />
                  </Col>
                  <Col>
                    <img src={discover} alt='discover.png' className='object-fit-contain w-75' height='35px' />
                  </Col>
                  <Col>
                    <img src={american_express} alt='american-express.png' className='object-fit-contain w-75' height='35px' />
                  </Col>
                </Row>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  )
}

export default Footer
