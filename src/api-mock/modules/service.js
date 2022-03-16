import api from '@/constant/api'

export default [
  {
    method: 'GET',
    url: api.services,
    response: {
      success: true,
      message: 'Success Fetch Data',
      data: [
        {
          id: '1-session',
          name: '1 Session',
          duration: {
            photoSession: 15,
            photoSelection: 10
          },
          image: '',
          pax: 2,
          price: 120000,
          printedPhotos: 2
        },
        {
          id: '2-session',
          name: '2 Session',
          duration: {
            photoSession: 30,
            photoSelection: 20
          },
          image: '',
          pax: 4,
          price: 240000,
          printedPhotos: 4
        }
      ]
    }
  },
  {
    method: 'GET',
    url: api.service('1-session'),
    response: {
      success: true,
      message: 'Success Fetch Data',
      data: {
        id: '1-session',
        name: '1 Session',
        duration: {
          photoSession: 15,
          photoSelection: 10
        },
        image: '',
        pax: 2,
        price: 120000,
        printedPhotos: 2
      }
    }
  },
  {
    method: 'GET',
    url: api.service('2-session'),
    response: {
      success: true,
      message: 'Success Fetch Data',
      data: {
        id: '2-session',
        name: '2 Session',
        duration: {
          photoSession: 30,
          photoSelection: 20
        },
        image: '',
        pax: 4,
        price: 240000,
        printedPhotos: 4
      }
    }
  }
]
