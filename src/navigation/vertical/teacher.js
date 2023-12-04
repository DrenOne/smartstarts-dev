// ** Icons Import
import { Calendar, Circle, Edit, Menu, User, Users, Settings } from 'react-feather'
const getUserData = JSON.parse(localStorage.getItem("userData"))

export default [
    {
      id: 'teacher',
      title: 'Schedule',
      icon: <Calendar size={12} />,
      navLink: '/schedule',
      meta: {
        publicRoute: true
       }
    },
    {
      id: 'teacher',
      title: 'List of classes',
      icon: <Users size={12} />,
      navLink: '/class/list',
      meta: {
        publicRoute: true
       }
    },
   
    {
      id: 'teacher',
      title: 'Profile',
      icon: <User size={12} />,
      navLink: `/profile/${getUserData?.id}`,
      meta: {
        publicRoute: true
       }
    }   
  ]
