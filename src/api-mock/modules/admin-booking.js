import api from '@/constant/api'

export default [
  {
    method: 'GET',
    url: api.admin.booking,
    params: {
      page: 1,
      keyword: '',
      size: 10
    },
    response: {
      success: true,
      message: 'Success Fetch Data',
      data: [
        {
          id: 'booking-id',
          name: 'Dany Prasetya Angtoni',
          email: 'danyprasetyaangtoni@gmail.com',
          phone: '085156760534',
          serviceId: 'one-session',
          bookingTime: 1647857400000,
          pax: 2,
          totalPrice: 120000,
          paymentStatus: 'PENDING'
        },
        {
          id: 'booking-id-2',
          name: 'Dany Prasetya Angtoni',
          email: 'danyprasetyaangtoni@gmail.com',
          phone: '085156760534',
          serviceId: 'two-session',
          bookingTime: 1647857400000,
          pax: 4,
          totalPrice: 240000,
          paymentStatus: 'PENDING'
        }
      ],
      paging: {
        page: 1,
        totalPage: 10,
        size: 10
      }
    }
  },
  {
    method: 'GET',
    url: api.admin.bookingDetail('booking-id'),
    response: {
      success: true,
      message: 'Success Fetch Data',
      data: {
        id: 'booking-id',
        name: 'Dany Prasetya Angtoni Angtoni Angtoni Angtoni',
        email: 'danyprasetyaangtoni@gmail.com',
        phone: '085156760534',
        message: 'I want to bring my pet',
        additionalPrintedPhotos: 0,
        backdrop: 'GRAY',
        withSoftCopy: true,
        serviceId: 'one-session',
        bookingTime: 1648030200000,
        pax: 2,
        totalPrice: 120000,
        paymentStatus: 'PAID',
        createdDate: 1647857400000
      }
    }
  },
  {
    method: 'PUT',
    url: api.admin.reschedule,
    body: {
      bookingId: 'booking-id',
      bookingTime: 1648203000000
    },
    response: {
      success: true,
      message: 'Success Fetch Data',
      data: true
    }
  }
]
