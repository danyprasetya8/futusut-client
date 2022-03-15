import api from '@/constant/api'

export default [
  {
    method: 'GET',
    url: api.banner,
    response: {
      success: true,
      message: 'Success Fetch Data',
      data: [
        {
          id: 1,
          description: 'Image 1 description Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, laudantium.',
          title: 'Image 1 Name',
          url: 'https://i.imgur.com/5c4bWGL.jpeg'
        },
        {
          id: 2,
          description: 'Image 2 description Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis assumenda autem eos reiciendis enim. Optio?',
          title: 'Image 2 Name',
          url: 'https://i.imgur.com/5c4bWGL.jpeg'
        },
        {
          id: 3,
          description: 'Image 3 description Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo, saepe. Ipsa sit ipsum accusantium quod nisi saepe ratione quasi atque.',
          title: 'Image 3 Name',
          url: 'https://i.imgur.com/5c4bWGL.jpeg'
        },
        {
          id: 4,
          description: 'Image 4 description Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, laudantium.',
          title: 'Image 4 Name',
          url: 'https://i.imgur.com/5c4bWGL.jpeg'
        },
        {
          id: 5,
          description: 'Image 5 description Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis assumenda autem eos reiciendis enim. Optio?',
          title: 'Image 5 Name',
          url: 'https://i.imgur.com/5c4bWGL.jpeg'
        },
        {
          id: 6,
          description: 'Image 6 description Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo, saepe. Ipsa sit ipsum accusantium quod nisi saepe ratione quasi atque.',
          title: 'Image 6 Name',
          url: 'https://i.imgur.com/5c4bWGL.jpeg'
        }
      ]
    }
  },
  {
    method: 'POST',
    url: api.subscription,
    body: {
      email: 'my.email@mail.com'
    },
    response: {
      success: true,
      message: 'Success Fetch Data',
      data: true
    }
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
    response: {
      success: true,
      message: 'Success Fetch Data',
      data: true
    }
  }
]
