// ** React Imports
import { lazy } from 'react'
import { User } from 'react-feather'
import { Navigate } from 'react-router-dom'
import AddHomework from '../../views/apps/user/view/homework'
import AddLecture from '../../views/apps/user/view/class/addlecture'
import StudentsHomework from '../../views/apps/user/view/homework/StudentsHomework'

const Chat = lazy(() => import('../../views/apps/chat'))
const Todo = lazy(() => import('../../views/apps/todo'))
const Email = lazy(() => import('../../views/apps/email'))
const Kanban = lazy(() => import('../../views/apps/kanban'))
const Calendar = lazy(() => import('../../views/apps/calendar'))

const InvoiceAdd = lazy(() => import('../../views/apps/invoice/add'))
const InvoiceList = lazy(() => import('../../views/apps/invoice/list'))
const InvoiceEdit = lazy(() => import('../../views/apps/invoice/edit'))
const InvoicePrint = lazy(() => import('../../views/apps/invoice/print'))
const InvoicePreview = lazy(() => import('../../views/apps/invoice/preview'))

const EcommerceShop = lazy(() => import('../../views/apps/ecommerce/shop'))
const EcommerceDetail = lazy(() => import('../../views/apps/ecommerce/detail'))
const EcommerceWishlist = lazy(() => import('../../views/apps/ecommerce/wishlist'))
const EcommerceCheckout = lazy(() => import('../../views/apps/ecommerce/checkout'))
const SuccessPayment = lazy(() => import('../../views/apps/ecommerce/checkout/steps/successPayment'))

const UserList = lazy(() => import('../../views/apps/user/list'))
const ClassTutor = lazy(() => import('../../views/apps/user/list/class/ClassTutor'))
const ClassItemTutor = lazy(() => import('../../views/apps/user/list/class/index'))

const UserView = lazy(() => import('../../views/apps/user/view'))

const Roles = lazy(() => import('../../views/apps/roles-permissions/roles'))
const Permissions = lazy(() => import('../../views/apps/roles-permissions/permissions'))
const Subject = lazy(() => import('../../views/pages/subjecthomework'))
const Lecture = lazy(() => import('../../views/pages/subjecthomework/lecture'))
const Pdf = lazy(() => import('../../views/apps/pdf'))

const AppRoutes = [
  // {
  //   element: <Email />,
  //   path: '/apps/email',
  //   meta: {
  //     appLayout: true,
  //     className: 'email-application'
  //   }
  // },
  // {
  //   element: <Email />,
  //   path: '/apps/email/:folder',
  //   meta: {
  //     appLayout: true,
  //     className: 'email-application'
  //   }
  // },
  // {
  //   element: <Email />,
  //   path: '/apps/email/label/:label',
  //   meta: {
  //     appLayout: true,
  //     className: 'email-application'
  //   }
  // },
  // {
  //   element: <Email />,
  //   path: '/apps/email/:filter'
  // },
  {
    path: '/apps/chat',
    element: <Chat />,
    meta: {
      appLayout: true,
      className: 'chat-application'
    }
  },
  {
    element: <Todo />,
    path: '/apps/todo',
    meta: {
      appLayout: true,
      className: 'todo-application'
      
    }
  },
  {
    element: <Todo />,
    path: '/apps/todo/:filter',
    meta: {
      appLayout: true,
      className: 'todo-application'
    }
  },
  {
    element: <Todo />,
    path: '/apps/todo/tag/:tag',
    meta: {
      appLayout: true,
      className: 'todo-application'
    }
  },
  {
    element: <Calendar />,
    path: '/apps/calendar'
  },
  {
    element: <Calendar />,
    path: '/schedule',
    meta: { publicRoute: true },
    sidebar: true
    
  },
  {
    element: <Kanban />,
    path: '/apps/kanban',
    meta: {
      appLayout: true,
      className: 'kanban-application'
    }
  },
  {
    element: <InvoiceList />,
    path: '/apps/invoice/list'
  },
  {
    element: <InvoicePreview />,
    path: '/apps/invoice/preview/:id'
  },
  {
    path: '/apps/invoice/preview',
    element: <Navigate to='/apps/invoice/preview/4987' />
  },
  {
    element: <InvoiceEdit />,
    path: '/apps/invoice/edit/:id'
  },
  {
    path: '/apps/invoice/edit',
    element: <Navigate to='/apps/invoice/edit/4987' />
  },
  {
    element: <InvoiceAdd />,
    path: '/apps/invoice/add'
  },
  {
    path: '/apps/invoice/print',
    element: <InvoicePrint />,
    meta: {
      layout: 'blank'
    }
  },
  {
    element: <EcommerceShop />,
    path: '/apps/ecommerce/shop',
    meta: {
      className: 'ecommerce-application'
    }
  },
  {
    element: <EcommerceWishlist />,
    path: '/apps/ecommerce/wishlist',
    meta: {
      className: 'ecommerce-application'
    }
  },
  {
    path: '/apps/ecommerce/product-detail',
    element: <Navigate to='/course/apple-i-phone-11-64-gb-black-26' />,
    meta: {
      className: 'ecommerce-application'
    }
  },
  {
    path: '/course/:slug',
    element: <EcommerceDetail />,
    meta: {
      className: 'ecommerce-application',
       publicRoute: true
     
    }
  },
  {
    path: '/apps/ecommerce/checkout',
    element: <EcommerceCheckout />,
    meta: {
      className: 'ecommerce-application',
        publicRoute: true
    }

  },

  {
    path: '/apps/ecommerce/checkout/successPayment',
    element: <SuccessPayment />,
    meta: {
      className: 'ecommerce-application',
        publicRoute: true
    }

  },
 
    // {
    //   element: <UserList />,
    //   path: '/apps/child/list',
    //   meta: {
    //     className: 'ecommerce-application',
    //     publicRoute: true
    //   },
    //   sidebar: true
    // },
  {
    element: <UserList />,
    path: '/apps/user/list',
    meta: {
      className: 'ecommerce-application',
      publicRoute: true
    },
    sidebar: true
  },
  {
    path: '/apps/user/view',
    element: <Navigate to='/apps/user/view' />,  
     meta: {
      publicRoute: true
     }
  },
  {
    element: <UserView />,
    path: '/apps/user/list/:id',
    meta: {
      publicRoute: true
     },
     sidebar: true
  },
  {
    element: <Roles />,
    path: '/apps/roles'
  },
  {
    element: <Permissions />,
    path: '/apps/permissions',
    meta: {
      publicRoute: true
     }
  },
  // classes
  {
    element: <ClassTutor />,
    path: '/class/list',
    meta: {
      className: 'ecommerce-application',
      publicRoute: true
    },
    sidebar: true
  },
  {
    element: <ClassItemTutor />,
    path: '/class/list/:id/',
    meta: {
      publicRoute: true
     },
     sidebar: true
  },
  {
    element: <AddLecture />,
    path: '/class/list/edit/:id',
    meta: {
      publicRoute: true
     },
     sidebar: true
  },
  {
    element: <AddHomework />,
    path: '/class/list/homeworkEdit/:id',
    meta: {
      publicRoute: true
     },
     sidebar: true
  },
  {
    element: <StudentsHomework />,
    path: '/class/list/studentsHomework/:id',
    meta: {
      publicRoute: true
     },
     sidebar: true
  },
  {
    element: <Pdf />,
    path: '/file/:id',
    meta: {
      publicRoute: true,
      layout: 'blank',
    }
  },
  {
    element: <AddHomework />,
    path: '/class/list/addHomework/:id',
    meta: {
      publicRoute: true
     },
     sidebar: true
  },
 
  {
    element: <UserView />,
    path: '/profile/:id',
    meta: {
      publicRoute: true
     },
     sidebar: true
  },
   //Homework
   {
    element: <Subject />,
    path: '/subject',
    meta: {
      publicRoute: true
     },
     sidebar: true
  },
  {
    id:"child",
    element: <Lecture />,
    path: '/class/list/subject/:id',
    meta: {
      publicRoute: true
     },
     sidebar: true
  }

]

export default AppRoutes
