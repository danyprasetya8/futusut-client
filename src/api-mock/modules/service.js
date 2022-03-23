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
          id: 'one-session',
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
          id: 'two-session',
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
    url: api.service,
    params: {
      serviceId: 'one-session'
    },
    response: {
      success: true,
      message: 'Success Fetch Data',
      data: {
        id: 'one-session',
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
    url: api.service,
    params: {
      serviceId: 'two-session'
    },
    response: {
      success: true,
      message: 'Success Fetch Data',
      data: {
        id: 'two-session',
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
  },
  {
    method: 'GET',
    url: api.addOns,
    response: {
      success: true,
      message: 'Success Fetch Data',
      data: [
        {
          id: 'people',
          name: 'People',
          price: 40000
        },
        {
          id: 'softcopy',
          name: 'Softcopy',
          price: 40000
        },
        {
          id: 'printedPhotos',
          name: 'Printed Photo\'s',
          price: 20000
        }
      ]
    }
  }
]
