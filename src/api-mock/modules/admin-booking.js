import api from '@/constant/api'
import config from '@/constant/config'
import { getIncrementedDate } from '@/utils/date'

const { bookingHours } = config

const mockTimestamp2 = getIncrementedDate(3).getTime()
const _13_15 = mockTimestamp2 + bookingHours[5]
const _17_10 = mockTimestamp2 + bookingHours[14]
const _20_00 = mockTimestamp2 + bookingHours[19]

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
          id: 'booking-id-3',
          name: 'Dany Prasetya Angtoni',
          email: 'danyprasetyaangtoni@gmail.com',
          phone: '085156760534',
          serviceId: 'one-session',
          bookingTime: _13_15,
          pax: 2,
          totalPrice: 120000,
          paymentStatus: 'PENDING'
        },
        {
          id: 'booking-id-4',
          name: 'Dany Prasetya Angtoni',
          email: 'danyprasetyaangtoni@gmail.com',
          phone: '085156760534',
          serviceId: 'two-session',
          bookingTime: _20_00,
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
    url: api.admin.bookingDetail('booking-id-3'),
    response: {
      success: true,
      message: 'Success Fetch Data',
      data: {
        id: 'booking-id-3',
        name: 'Dany Prasetya Angtoni Angtoni Angtoni Angtoni',
        email: 'danyprasetyaangtoni@gmail.com',
        phone: '085156760534',
        message: 'I want to bring my pet',
        additionalPrintedPhotos: 0,
        backdrop: 'GRAY',
        withSoftCopy: true,
        serviceId: 'one-session',
        bookingTime: _13_15,
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
      bookingTime: _17_10
    },
    response: {
      success: true,
      message: 'Success Fetch Data',
      data: true
    }
  }
]
