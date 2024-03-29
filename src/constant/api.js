const PREFIX = '/.netlify/functions'

export default {
  subscription: PREFIX + '/subscription',
  feedback: PREFIX + '/feedback',
  services: PREFIX + '/services',
  service: PREFIX + '/services',
  addOns: PREFIX + '/addons',
  reservedBookingTime: PREFIX + '/booking',
  bookingTimeAvailability: PREFIX + '/booking',
  book: PREFIX + '/booking',
  bookingDetail: PREFIX + '/checkout-detail',
  admin: {
    booking: PREFIX + '/booking-list',
    bookingDetail: PREFIX + '/booking-detail',
    reschedule: PREFIX + '/update-booking'
  },
  user: {
    base: PREFIX + '/current-user',
    login: PREFIX + '/login'
  }
}
