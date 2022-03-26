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
      success: true,
      message: 'Success Fetch Data',
      data: {
        token: 'asdfzxcvqwerasdfzxcv',
        user: {
          id: 'user-id',
          name: 'Dany',
          role: 'ADMIN'
        }
      }
    }
  },
  {
    method: 'DELETE',
    url: api.user.logout,
    response: {
      success: true,
      message: 'Success Fetch Data',
      data: true
    }
  },
  {
    method: 'GET',
    url: api.user.base,
    response: {
      success: true,
      message: 'Success Fetch Data',
      data: {
        id: 'user-id',
        name: 'Dany',
        role: 'ADMIN'
      }
    }
  }
]

export default routes
