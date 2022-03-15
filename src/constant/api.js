export default {
  banner: '/banner',
  subscription: '/subscription',
  feedback: '/feedback',
  services: '/service',
  service(serviceId) {
    return `${this.services}/${serviceId}`
  }
}
