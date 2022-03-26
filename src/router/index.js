import { createRouter, createWebHistory } from 'vue-router'
import { validateRoute } from '@/utils/route-guard'
import AboutPage from '@/pages/AboutPage'
import AdminBookingPage from '@/pages/admin/AdminBookingPage'
import AdminBookingDetailPage from '@/pages/admin/AdminBookingDetailPage'
import AdminHomePage from '@/pages/admin/AdminHomePage'
import AdminLoginPage from '@/pages/admin/AdminLoginPage'
import BookFormPage from '@/pages/BookFormPage'
import BookTimePage from '@/pages/BookTimePage'
import BookOnlinePage from '@/pages/BookOnlinePage'
import BookDetailPage from '@/pages/BookDetailPage'
import ContactPage from '@/pages/ContactPage'
import FaqPage from '@/pages/FaqPage'
import HomePage from '@/pages/HomePage'
import NotFoundPage from '@/pages/NotFoundPage'
import PricelistPage from '@/pages/PricelistPage'
import ReschedulePolicyPage from '@/pages/ReschedulePolicyPage'
import StudioPolicyPage from '@/pages/StudioPolicyPage'
import SuccessCheckoutPage from '@/pages/SuccessCheckoutPage'
import config from '@/constant/config'

const page = config.page
const { ADMIN } = config.role

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: page.base,
      redirect: page.home
    },
    {
      path: page.admin,
      redirect: page.adminHome
    },
    {
      path: page.home,
      name: 'Home',
      component: HomePage,
      meta: {
        roles: []
      }
    },
    {
      path: page.about,
      name: 'About',
      component: AboutPage,
      meta: {
        roles: []
      }
    },
    {
      path: page.contact,
      name: 'Contact',
      component: ContactPage,
      meta: {
        roles: []
      }
    },
    {
      path: page.bookForm,
      name: 'BookForm',
      component: BookFormPage,
      meta: {
        roles: []
      }
    },
    {
      path: page.bookOnline,
      name: 'BookOnline',
      component: BookOnlinePage,
      meta: {
        roles: []
      }
    },
    {
      path: page.bookTime,
      name: 'BookTime',
      component: BookTimePage,
      meta: {
        roles: []
      }
    },
    {
      path: page.bookDetail,
      name: 'BookDetail',
      component: BookDetailPage,
      meta: {
        roles: []
      }
    },
    {
      path: page.pricelist,
      name: 'Pricelist',
      component: PricelistPage,
      meta: {
        roles: []
      }
    },
    {
      path: page.faq,
      name: 'Faq',
      component: FaqPage,
      meta: {
        roles: []
      }
    },
    {
      path: page.reschedulePolicy,
      name: 'ReschedulePolicy',
      component: ReschedulePolicyPage,
      meta: {
        roles: []
      }
    },
    {
      path: page.studioPolicy,
      name: 'StudioPolicy',
      component: StudioPolicyPage,
      meta: {
        roles: []
      }
    },
    {
      path: page.successCheckout,
      name: 'SuccessCheckout',
      component: SuccessCheckoutPage,
      meta: {
        roles: []
      }
    },
    {
      path: page.adminBooking,
      name: 'AdminBooking',
      component: AdminBookingPage,
      meta: {
        roles: [ADMIN]
      }
    },
    {
      path: page.adminBookingDetail,
      name: 'AdminBookingDetail',
      component: AdminBookingDetailPage,
      meta: {
        roles: [ADMIN]
      }
    },
    {
      path: page.adminHome,
      name: 'AdminHome',
      component: AdminHomePage,
      meta: {
        roles: [ADMIN]
      }
    },
    {
      path: page.adminLogin,
      name: 'AdminLogin',
      component: AdminLoginPage,
      meta: {
        roles: []
      }
    },
    {
      path: '/:notFound(.*)*',
      abstract: true,
      name: 'NotFound',
      component: NotFoundPage,
      meta: {
        roles: []
      }
    }
  ]
})

router.beforeEach(validateRoute)

export default router
