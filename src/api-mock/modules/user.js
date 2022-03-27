import api from '@/constant/api'

const routes = [
  {
    method: 'POST',
    url: api.user.login,
    body: {
      email: 'dany@mail.com',
      password: 'secret'
    },
    response: {
      token: 'asdfzxcvqwerasdfzxcv',
      user: {
        email: 'user-id',
        role: 'ADMIN'
      }
    }
  },
  {
    method: 'DELETE',
    url: api.user.logout,
    response: true
  },
  {
    method: 'GET',
    url: api.user.base,
    response: {
      user: {
        email: 'dany@mail.com',
        role: 'ADMIN'
      }
    }
  }
]

export default routes
