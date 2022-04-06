import api from '@/constant/api'
import config from '@/constant/config'
import { getIncrementedDate } from '@/utils/date'

const { bookingHours } = config

const mockTimestamp = getIncrementedDate(1).getTime()
const first_11_45 = mockTimestamp + bookingHours[3]
const first_17_10 = mockTimestamp + bookingHours[14]

const mockTimestamp2 = getIncrementedDate(3).getTime()
const second_12_10 = mockTimestamp2 + bookingHours[4]
const second_13_15 = mockTimestamp2 + bookingHours[5]
const second_13_40 = mockTimestamp2 + bookingHours[6]
const second_14_05 = mockTimestamp2 + bookingHours[7]
const second_16_20 = mockTimestamp2 + bookingHours[12]
const second_16_45 = mockTimestamp2 + bookingHours[13]
const second_17_10 = mockTimestamp2 + bookingHours[14]
const second_17_35 = mockTimestamp2 + bookingHours[15]
const second_18_00 = mockTimestamp2 + bookingHours[16]
const second_19_35 = mockTimestamp2 + bookingHours[18]
const second_20_00 = mockTimestamp2 + bookingHours[19]
const second_20_25 = mockTimestamp2 + bookingHours[20]

export default [
  {
    method: 'GET',
    url: api.reservedBookingTime,
    params: {
      timestamp: mockTimestamp
    },
    response: [
      {
        id: 'booking-id',
        name: 'Marco marco Marco marco Marco marco',
        bookingTime: [first_11_45]
      },
      {
        id: 'booking-id-2',
        name: 'Michelle Michelle Michelle Michelle Michelle Michelle ',
        bookingTime: [first_17_10]
      }
    ]
  },
  {
    method: 'GET',
    url: api.reservedBookingTime,
    params: {
      timestamp: mockTimestamp2
    },
    response: [
      {
        id: 'booking-id-3',
        name: 'Dany Prasetya Angtoni Angtoni Angtoni Angtoni',
        bookingTime: [second_13_15]
      },
      {
        id: 'booking-id-4',
        name: 'Dany Prasetya 2',
        bookingTime: [second_13_40, second_14_05]
      }
    ]
  },
  {
    method: 'GET',
    url: api.bookingTimeAvailability,
    params: {
      timestamp: second_12_10
    },
    response: true
  },
  {
    method: 'GET',
    url: api.bookingTimeAvailability,
    params: {
      timestamp: second_13_15
    },
    response: false
  },
  {
    method: 'GET',
    url: api.bookingTimeAvailability,
    params: {
      timestamp: second_16_20
    },
    response: true
  },
  {
    method: 'GET',
    url: api.bookingTimeAvailability,
    params: {
      timestamp: second_16_45
    },
    response: false
  },
  {
    method: 'GET',
    url: api.bookingTimeAvailability,
    params: {
      timestamp: second_17_10
    },
    response: true
  },
  {
    method: 'GET',
    url: api.bookingTimeAvailability,
    params: {
      timestamp: second_17_35
    },
    response: true
  },
  {
    method: 'GET',
    url: api.bookingTimeAvailability,
    params: {
      timestamp: second_18_00
    },
    response: true
  },
  {
    method: 'GET',
    url: api.bookingTimeAvailability,
    params: {
      timestamp: second_19_35
    },
    response: true
  },
  {
    method: 'GET',
    url: api.bookingTimeAvailability,
    params: {
      timestamp: second_20_00
    },
    response: true
  },
  {
    method: 'GET',
    url: api.bookingTimeAvailability,
    params: {
      timestamp: second_20_25
    },
    response: true
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
      serviceId: 'SESSION_TYPE_ONE',
      bookingDate: mockTimestamp2,
      bookingTime: [second_17_10],
      totalPrice: 300000
    },
    response: {
      bookingId: 'booking-id',
      paymentUrl: 'https://checkout-staging.xendit.co/web/6233105b80095de04d94e87f'
    }
  },
  {
    method: 'GET',
    url: api.bookingDetail,
    params: {
      bookingId: 'booking-id'
    },
    response: {
      id: 'booking-id',
      serviceId: 'SESSION_TYPE_ONE',
      bookingTime: [first_11_45],
      paymentStatus: 'PAID'
    }
  }
]
