export default {
  banner: '/banner',
  subscription: '/subscription',
  feedback: '/feedback',
  services: '/services',
  service: '/service',
  addOns: '/add-ons',
  reservedBookingTime: '/reserved-booking-time',
  bookingTimeAvailability: '/booking-time-availability',
  book: '/book',
  bookingDetail: '/booking-detail',
  admin: {
    booking: '/admin-booking',
    bookingDetail(id) {
      return `${this.booking}/${id}`
    },
    reschedule: '/reschedule'
  },
  user: {
    base: '/user',
    login: '/user/login',
    logout: '/user/logout'
  }
}
