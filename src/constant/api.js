const PREFIX = '/.netlify/functions'

export default {
  banner: PREFIX + '/banner',
  subscription: PREFIX + '/subscription',
  feedback: PREFIX + '/feedback',
  services: PREFIX + '/session',
  service: PREFIX + '/service',
  addOns: PREFIX + '/addons',
  reservedBookingTime: PREFIX + '/reserved-booking-time',
  bookingTimeAvailability: PREFIX + '/booking-time-availability',
  book: PREFIX + '/book',
  bookingDetail: PREFIX + '/booking-detail',
  admin: {
    booking: PREFIX + '/admin-booking',
    bookingDetail: PREFIX + '/admin-booking/detail',
    reschedule: PREFIX + '/reschedule'
  },
  user: {
    base: PREFIX + '/user',
    login: PREFIX + '/user/login',
    logout: PREFIX + '/user/logout'
  }
}
