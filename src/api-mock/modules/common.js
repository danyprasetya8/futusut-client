import api from '@/constant/api'

export default [
  {
    method: 'POST',
    url: api.subscription,
    body: {
      email: 'my.email@mail.com'
    },
    response: true
  },
  {
    method: 'POST',
    url: api.feedback,
    body: {
      email: 'my.email@mail.com',
      name: 'Dany Prasetya',
      message: 'I want to this, that, and something else',
      phone: '08123456789'
    },
    response: true
  }
]
