export default {
  page: {
    base: '/',
    about: '/about',
    contact: '/contact',
    bookOnline: '/book',
    bookService: '/book/:serviceId',
    pricelist: '/pricelist',
    faq: '/faq',
    reschedulePolicy: '/reschedule-policy',
    studioPolicy: '/studio-policy'
  },
  role: {
    ADMIN: 'ROLE_ADMIN',
    SUPER_ADMIN: 'ROLE_SUPER_ADMIN'
  },
  languages: [
    {
      id: 'ID',
      text: 'Indonesia'
    },
    {
      id: 'EN',
      text: 'English'
    }
  ],
  services: [
    {
      id: '1-session',
      name: '1 Session',
      duration: {
        photoSession: 15,
        photoSelection: 10
      },
      image: '',
      pax: 2,
      price: 120_000,
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
      price: 140_000,
      printedPhotos: 4
    }
  ]
}
