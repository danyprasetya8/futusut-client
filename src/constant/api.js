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
  bookingTimeAvailability: '/booking-time-availability'
}
