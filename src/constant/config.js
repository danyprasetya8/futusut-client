const BOOKING_HOURS = [
  ((10 * 60) + 30), // 10:30
  ((10 * 60) + 55), // 10:55
  ((11 * 60) + 20), // 11:20
  ((11 * 60) + 45), // 11:45
  ((12 * 60) + 10), // 12:10
  ((13 * 60) + 15), // 13:15
  ((13 * 60) + 40), // 13:40
  ((14 * 60) + 5), // 14:05
  ((14 * 60) + 30), // 14:30
  ((14 * 60) + 55), // 14:60
  ((15 * 60) + 20), // 15:20
  ((15 * 60) + 55), // 15:55
  ((16 * 60) + 20), // 16:20
  ((16 * 60) + 45), // 16:45
  ((17 * 60) + 10), // 17:10
  ((17 * 60) + 35), // 17:35
  ((18 * 60) + 0), // 18:00
  ((19 * 60) + 10), // 19:10
  ((19 * 60) + 35), // 19:35
  ((20 * 60) + 0) // 20:00
]

export default {
  page: {
    base: '/',
    home: '/home',
    about: '/about',
    contact: '/contact',
    bookForm: '/book/form',
    bookTime: '/book/time/:serviceId',
    bookOnline: '/book',
    bookDetail: '/book/:serviceId',
    pricelist: '/pricelist',
    faq: '/faq',
    studioPolicy: '/studio-policy',
    successCheckout: '/success-checkout/:bookingId',
    admin: '/admin',
    adminBooking: '/admin/booking',
    adminBookingDetail: '/admin/booking/:id',
    adminHome: '/admin/home',
    adminLogin: '/admin/login'
  },
  userBlackListedPage: [
    '/admin/login'
  ],
  role: {
    ADMIN: 'ADMIN'
  },
  languages: [
    {
      id: 'ID',
      text: 'Indonesia'
    },
    {
      id: 'EN',
      text: 'English'
    }
  ],
  bufferHourMillis: [
    ((12 * 60) + 10) * 60 * 1000, // 12:00
    ((18 * 60) + 0) * 60 * 1000 // 18:00
  ],
  bookingHours: BOOKING_HOURS.map(h => h * 60 * 1000),
  paymentStatus: {
    PENDING: 'Pending',
    PAID: 'Paid',
    EXPIRED: 'Expired'
  },
  addOns: {
    backdrop: [
      {
        id: 'GRAY',
        value: 'Gray'
      },
      {
        id: 'WHITE',
        value: 'White'
      },
      {
        id: 'BLACK',
        value: 'Black'
      }
    ]
  },
  service: {
    oneSession: 'SESSION_TYPE_ONE',
    twoSession: 'SESSION_TYPE_TWO'
  }
}
