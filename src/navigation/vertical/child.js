// ** Icons Import
import { Circle, Calendar, User, Settings, Briefcase } from 'react-feather'
import Lecture from '../../views/pages/subjecthomework/lecture'

const getUserData = JSON.parse(localStorage.getItem("userData"))
export default [
    {
      id: 'child',
      title: 'Schedule',
      icon: <Calendar size={12} />,
      navLink: '/schedule'
    },
    {
      id: 'child',
      title: 'Profile',
      icon: <User size={12}/>,
      navLink: `/profile/${getUserData?.id}`,
      meta: {
        publicRoute: true
       }
    },
    {  
      id: 'child',
      navLink: '/subject',
      // path:'/subject',
      icon: <Briefcase />,
      title: 'Subject'
      // component: <Lecture/>,
      // children: [{id:"child", navLink: '/subject', title: 'user', component: <Calendar/>,  meta: { publicRoute: true }}]
      // meta: {
      //   publicRoute: true
      //  }
    }
    // {
    //   id: 'child',
    //   title: 'Subject2',
    //   icon: <User size={12}/>,
    //   navLink: `/subject`,
    //   meta: {
    //     publicRoute: true
    //    }
    // }
]
