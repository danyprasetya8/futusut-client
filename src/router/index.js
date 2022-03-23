import { createRouter, createWebHistory } from 'vue-router'
import AboutPage from '@/pages/AboutPage'
import AdminBookingPage from '@/pages/admin/AdminBookingPage'
import AdminBookingDetailPage from '@/pages/admin/AdminBookingDetailPage'
import AdminHomePage from '@/pages/admin/AdminHomePage'
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

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: page.base,
      redirect: page.home
    },
    {
      path: page.home,
      name: 'Home',
      component: HomePage
    },
    {
      path: page.about,
      name: 'About',
      component: AboutPage
    },
    {
      path: page.contact,
      name: 'Contact',
      component: ContactPage
    },
    {
      path: page.bookForm,
      name: 'BookForm',
      component: BookFormPage
    },
    {
      path: page.bookOnline,
      name: 'BookOnline',
      component: BookOnlinePage
    },
    {
      path: page.bookTime,
      name: 'BookTime',
      component: BookTimePage
    },
    {
      path: page.bookDetail,
      name: 'BookDetail',
      component: BookDetailPage
    },
    {
      path: page.pricelist,
      name: 'Pricelist',
      component: PricelistPage
    },
    {
      path: page.faq,
      name: 'Faq',
      component: FaqPage
    },
    {
      path: page.reschedulePolicy,
      name: 'ReschedulePolicy',
      component: ReschedulePolicyPage
    },
    {
      path: page.studioPolicy,
      name: 'StudioPolicy',
      component: StudioPolicyPage
    },
    {
      path: page.successCheckout,
      name: 'SuccessCheckout',
      component: SuccessCheckoutPage
    },
    {
      path: page.adminBooking,
      name: 'AdminBooking',
      component: AdminBookingPage
    },
    {
      path: page.adminBookingDetail,
      name: 'AdminBookingDetail',
      component: AdminBookingDetailPage
    },
    {
      path: page.adminHome,
      name: 'AdminHome',
      component: AdminHomePage
    },
    {
      path: '/:notFound(.*)*',
      abstract: true,
      name: 'NotFound',
      component: NotFoundPage
    }
  ]
})

export default router
