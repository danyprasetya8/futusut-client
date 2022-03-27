import api from '@/constant/api'

export default [
  {
    method: 'GET',
    url: api.services,
    response: [
      {
        id: 'SESSION_TYPE_ONE',
        name: 'Session 1',
        sessionDuration: 15,
        selectionDuration: 10,
        pax: 2,
        price: 120000,
        printedPhotos: 2,
        time: 1
      },
      {
        id: 'SESSION_TYPE_TWO',
        name: 'Session 2',
        sessionDuration: 30,
        selectionDuration: 20,
        pax: 4,
        price: 240000,
        printedPhotos: 4,
        time: 2
      }
    ]
  },
  {
    method: 'GET',
    url: api.service,
    params: {
      serviceId: 'SESSION_TYPE_ONE'
    },
    response: {
      id: 'SESSION_TYPE_ONE',
      name: 'Session 1',
      sessionDuration: 15,
      selectionDuration: 10,
      pax: 2,
      price: 120000,
      printedPhotos: 2,
      time: 1
    }
  },
  {
    method: 'GET',
    url: api.service,
    params: {
      serviceId: 'SESSION_TYPE_TWO'
    },
    response: {
      id: 'SESSION_TYPE_TWO',
      name: 'Session 2',
      sessionDuration: 30,
      selectionDuration: 20,
      pax: 4,
      price: 240000,
      printedPhotos: 4,
      time: 2
    }
  },
  {
    method: 'GET',
    url: api.addOns,
    response: [
      {
        id: 'PEOPLE_ADDONS',
        name: 'People',
        price: 40000,
        type: 'PEOPLE'
      },
      {
        id: 'SOFTCOPY_ADDONS',
        name: 'Softcopy',
        price: 40000,
        type: 'SOFTCOPY'
      },
      {
        id: 'PRINT_ADDONS',
        name: 'Printed Photo\'s',
        price: 20000,
        type: 'PRINT'
      }
    ]
  }
]
