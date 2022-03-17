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
        1648185000000,
        1648194900000
      ]
    }
  },
  {
    method: 'GET',
    url: api.bookingTimeAvailability,
    params: {
      timestamp: 1648185000000
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
  }
]
