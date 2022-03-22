export default {
  banner: '/banner',
  subscription: '/subscription',
  feedback: '/feedback',
  services: '/service',
  service(serviceId) {
    return `${this.services}/${serviceId}`
  },
  addOns: '/add-ons',
  reservedBookingTime: '/reserved-booking-time',
  bookingTimeAvailability: '/booking-time-availability',
  book: '/book',
  admin: {
    booking: '/admin-booking',
    bookingDetail(id) {
      return `${this.booking}/${id}`
    },
    reschedule: '/reschedule'
  }
}
