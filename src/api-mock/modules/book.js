import api from '@/constant/api'

export default [
  {
    method: 'GET',
    url: api.reservedBookingTime,
    params: {
      timestamp: 1648141200000
    },
    response: {
      success: true,
      message: 'Success Fetch Data',
      data: [
        {
          id: 'booking-id',
          name: 'Dany Prasetya Angtoni Angtoni Angtoni Angtoni',
          email: 'danyprasetyaangtoni@gmail.com',
          phone: '085156760534',
          serviceId: '1-session',
          bookingTime: 1648185000000,
          pax: 2,
          totalPrice: 120000,
          paymentStatus: 'PENDING'
        },
        {
          id: 'booking-id-2',
          name: 'Dany Prasetya Angtoni Angtoni Angtoni Angtoni',
          email: 'danyprasetyaangtoni@gmail.com',
          phone: '085156760534',
          serviceId: '1-session',
          bookingTime: 1648194900000,
          pax: 2,
          totalPrice: 120000,
          paymentStatus: 'PENDING'
        }
      ]
    }
  },
  {
    method: 'GET',
    url: api.reservedBookingTime,
    params: {
      timestamp: 1647968400000
    },
    response: {
      success: true,
      message: 'Success Fetch Data',
      data: [
        {
          id: 'booking-id-3',
          name: 'Dany Prasetya Angtoni Angtoni Angtoni Angtoni',
          email: 'danyprasetyaangtoni@gmail.com',
          phone: '085156760534',
          serviceId: '1-session',
          bookingTime: 1648033200000,
          pax: 2,
          totalPrice: 120000,
          paymentStatus: 'PENDING'
        },
        {
          id: 'booking-id-4',
          name: 'Dany Prasetya Angtoni Angtoni Angtoni Angtoni',
          email: 'danyprasetyaangtoni@gmail.com',
          phone: '085156760534',
          serviceId: '1-session',
          bookingTime: 1648037400000,
          pax: 2,
          totalPrice: 120000,
          paymentStatus: 'PENDING'
        }
      ]
    }
  },
  {
    method: 'GET',
    url: api.bookingTimeAvailability,
    params: {
      timestamp: 1648201500000
    },
    response: {
      success: true,
      message: 'Success Fetch Data',
      data: false
    }
  },
  {
    method: 'GET',
    url: api.bookingTimeAvailability,
    params: {
      timestamp: 1648203000000
    },
    response: {
      success: true,
      message: 'Success Fetch Data',
      data: true
    }
  },
  {
    method: 'POST',
    url: api.book,
    body: {
      name: 'Dany P',
      email: 'mail.format@domain.com',
      phone: '123456789',
      pax: 4,
      message: '',
      backdrop: 'BLACK',
      softcopy: true,
      printedPhotos: 4,
      serviceId: '1-session',
      bookingDate: 1647277200000,
      bookingTime: 1647339000000,
      totalPrice: 300000
    },
    response: {
      success: true,
      message: 'Success Fetch Data',
      data: {
        booking: {
          id: 'booking-id'
        },
        paymentUrl: 'https://checkout-staging.xendit.co/web/6233105b80095de04d94e87f'
      }
    }
  }
]
