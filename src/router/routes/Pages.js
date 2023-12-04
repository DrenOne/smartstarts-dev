import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Faq = lazy(() => import('../../views/pages/faq'))
const ApiKey = lazy(() => import('../../views/pages/api-key'))
const Profile = lazy(() => import('../../views/pages/home'))
const Pricing = lazy(() => import('../../views/pages/pricing'))
const License = lazy(() => import('../../views/pages/license'))
const Error = lazy(() => import('../../views/pages/misc/Error'))
const BlogList = lazy(() => import('../../views/pages/blog/list'))
const BlogEdit = lazy(() => import('../../views/pages/blog/edit'))
const BlogDetails = lazy(() => import('../../views/pages/blog/details'))
const ComingSoon = lazy(() => import('../../views/pages/misc/ComingSoon'))
const ModalExamples = lazy(() => import('../../views/pages/modal-examples'))
const Maintenance = lazy(() => import('../../views/pages/misc/Maintenance'))
const AccountSettings = lazy(() => import('../../views/pages/account-settings'))
const NotAuthorized = lazy(() => import('../../views/pages/misc/NotAuthorized'))
const KnowledgeBase = lazy(() => import('../../views/pages/aboutUs/index'))
const KnowledgeBaseCategory = lazy(() => import('../../views/apps/ecommerce/shop/index'))
const KBCategoryQuestion = lazy(() => import('../../views/pages/knowledge-base/KnowledgeBaseCategoryQuestion'))
const SuccessPayment = lazy(() => import('../../views/apps/ecommerce/checkout/steps/successPayment'))
const MyCourses = lazy(() => import('../../views/pages/my-courses'))
const UserList = lazy(() => import('../../views/apps/user/list'))
const UserView = lazy(() => import('../../views/apps/user/view'))
// const UserList = lazy(() => import('../../views/apps/user/list'))


const PagesRoutes = [
  {
    path: "/",
    element: <Profile />,
    meta: {
      publicRoute: true
      // restricted: true
    }
  },
  {
    path: "/FAQ",
    element: <Faq />,
    meta: {
      publicRoute: true
      // restricted: true
    }
  },
  {
    path: "/about",
    element: <KnowledgeBase />,
     meta: {
      publicRoute: true
      // restricted: true
    }
  },
  {
    path: "/homeschooling",
    element: <KnowledgeBase />,
     meta: {
      publicRoute: true
      // restricted: true
    }
  },
  {
    path: "/courses",
    element: <KnowledgeBaseCategory />,
     meta: {
      publicRoute: true
      // restricted: true
    }
  },
  {
    path: "/contact",
    element: <KBCategoryQuestion />,
     meta: {
      publicRoute: true
      // restricted: true
    }
  },
  {
    path: '/dashboard/mycourse',
    element: <MyCourses />,
    meta: {
     publicRoute: true
    },
    sidebar: true
  }
]

export default PagesRoutes
