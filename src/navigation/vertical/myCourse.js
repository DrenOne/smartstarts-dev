// ** Icons Import
import { Circle, Edit, Users } from 'react-feather'

export default [
//   {
//     header: 'Forms & Tables'
//   },
  {
    id: 'parent',
    title: 'My course',
    icon: <Edit  size={20} />,
    navLink: '/dashboard/mycourse'
  },
  // {
  //   id: 'parent',
  //   title: 'Child',
  //   icon: <User size={20} />,
  //   navLink: '/apps/child/list',
  //   meta: {
  //     publicRoute: true
  //    }
  //   },
    {
      id: 'parent',
      title: 'List of children',
      icon: <Users size={20} />,
      navLink: '/apps/user/list',
      meta: {
        publicRoute: true
       }
    }
    // {
    //   id: 'parent',
    //   title: 'View',
    //   icon: <Circle size={12} />,
    //   navLink: '/apps/user/view/:id',
    //   meta: {
    //     publicRoute: true
    //    }
    // }
  ]
