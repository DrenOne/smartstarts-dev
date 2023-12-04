import "@styles/react/pages/page-profile.scss"
import { Fragment, useEffect } from "react"
import CarouselBasic from "../../components/carousel/CarouselBasic"
// import { carouselBasic } from '../../components/carousel/CarouselSourceCode'
import Card from "@components/card-snippet"
import BestBrand from "./bestBrand"
import TopCourses from "./topCourses"
import Approach from "./approach"
import Program from "./program"
import WhyUs from "./WhyUs"
import { Navigate, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
//

const index = () => {
  const navigate = useNavigate()
  const userDate = JSON.parse(localStorage.getItem('userData'))
  const store = useSelector((state) => state.ecommerce)

  if (store.checkout) {
    <Navigate to="/login" />
  }

  useEffect(() => {
    if (userDate?.role === 'student' || userDate?.role === 'tutor') navigate('/schedule')
    window.scrollTo(0, 0)
  }, [userDate])

  return (
    <Fragment>
      <div>
        <CarouselBasic />
      </div>
      <div>
        <BestBrand />
      </div>
      <div>
        <Approach />
      </div>
      <Program />
      <WhyUs />
      <TopCourses />
    </Fragment>
  )
}

export default index
