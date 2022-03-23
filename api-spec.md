### Get List of Banners (PENDING)
# Method: GET
# Url: 
# Response body
```json
  {
    "code": 200,
    "data": [
      {
        "id": 1,
        "description": "Image 1 description",
        "title": "Image 1 Name",
        "url": "https://www.pathtostaticasset/image-id"
      },
      {
        "id": 2,
        "description": "Image 2 description",
        "title": "Image 2 Name",
        "url": "https://www.pathtostaticasset/image-id"
      }
    ]
  }
```

### Subscription (PENDING)
# Method: POST
# Url: 
# Request body
```json
  {
    "email": "email.format123@domain.com"
  }
```
# Response body
```json
  {
    "code": 200,
    "data": true
  }
```

### Send Feedback
# Method: POST
# Url: 
# Request body
```json
  {
    "email": "email.format123@domain.com",
    "name": "Dany Prasetya",
    "message": "I want to this, that, and something else",
    "phone": "1234567890"
  }
```
# Response body
```json
  {
    "code": 200,
    "data": true
  }
```

### Get List of Services
# Method: GET
# Url: 
# Response body
```json
  {
    "code": 200,
    "data": [
      {
        "id": "one-session",
        "name": "1 Session",
        "duration": {
          "photoSession": 15,
          "photoSelection": 10
        },
        "pax": 2,
        "price": 120000,
        "printedPhotos": 2
      },
      {
        "id": "two-session",
        "name": "2 Session",
        "duration": {
          "photoSession": 30,
          "photoSelection": 20
        },
        "pax": 4,
        "price": 140000,
        "printedPhotos": 4
      }
    ]
  }
```

### Get Service
# Method: GET
# Url: 
# Request params
`
  serviceId: 'service-id'
`
# Response body
```json
  {
    "code": 200,
    "data": {
      "id": "one-session",
      "name": "1 Session",
      "duration": {
        "photoSession": 15,
        "photoSelection": 10
      },
      "pax": 2,
      "price": 120000,
      "printedPhotos": 2
    }
  }
```

### Get Add-ons
# Method: GET
# Url: 
# Response body
```json
  {
    "code": 200,
    "data": [
      {
        "id": "people",
        "name": "People",
        "price": 40000
      },
      {
        "id": "softcopy",
        "name": "Softcopy",
        "price": 40000
      },
      {
        "id": "printedPhotos",
        "name": "Printed Photo's",
        "price": 20000
      }
    ]
  }
```

### Get Reserved Booking's Time
# Method: GET
# Url: 
# Request params
`
  timestamp: 1647277200000
`
# Response body
```json
  {
    "code": 200,
    "data": [
      {
        "id": "booking-id",
        "name": "Dany Prasetya Angtoni Angtoni Angtoni Angtoni",
        "bookingTime": 1647315000000
      },
      {
        "id": "booking-id",
        "name": "Dany Prasetya Angtoni Angtoni Angtoni Angtoni",
        "bookingTime": 1647316500000
      }
    ]
  }
```

### Get Booking's Time Availability
# Method: GET
# Url: 
# Request params
`
  timestamp: 1647315000000,
`
# Response body
```json
  {
    "code": 200,
    "data": true | false
  }
```

### Create Booking
# Method: POST
# Url: 
# Request body
```json
  {
    "name": "Dany P",
    "email": "mail.format@domain.com",
    "phone": "123456789",
    "pax": 4,
    "message": "",
    "backdrop": "BLACK | WHITE | GRAY",
    "softcopy": true,
    "printedPhotos": 4,
    "serviceId": "one-session",
    "bookingDate": 1647277200000,
    "bookingTime": 1647316500000,
    "totalPrice": 300000
  }
```
# Response body
```json
  {
    "code": 200,
    "data": {
      "bookingId": "booking-id",
      "paymentUrl": "https://www.linktoxendit.com"
    }
  }
```

### Get Checkout Detail
# Method: GET
# Url: 
# Request params
`
  bookingId: "booking-id"
`
# Response body
```json
  {
    "code": 200,
    "data": {
      "id": "booking-id",
      "serviceId": "one-session",
      "bookingTime": 1647857400000,
      "paymentStatus": "PENDING"
    }
  }
```

### Get List of Bookings (ADMIN)
# Method: GET
# Url: 
# Request params
`
  page: 1
  status: PENDING | PAID | EXPIRED
  keyword: dany
  size: 10
`
# Response body
```json
  {
    "code": 200,
    "data": [
      {
        "id": "booking-id",
        "name": "Dany Prasetya Angtoni Angtoni Angtoni Angtoni",
        "email": "danyprasetyaangtoni@gmail.com",
        "phone": "085156760534",
        "serviceId": "one-session",
        "bookingTime": 1647857400000,
        "pax": 2,
        "totalPrice": 120000,
        "paymentStatus": "PENDING"
      }
    ],
    "paging": {
      "page": 1,
      "totalPage": 10,
      "size": 10
    }
  }
```

### Get Booking Detail (ADMIN)
# Method: GET
# Url: 
# Request params
`
  bookingId: "booking-id"
`
# Response body
```json
  {
    "code": 200,
    "data": {
      "id": "booking-id",
      "name": "Dany Prasetya Angtoni Angtoni Angtoni Angtoni",
      "email": "danyprasetyaangtoni@gmail.com",
      "phone": "085156760534",
      "message": "I want to bring my pet",
      "additionalPrintedPhotos": 0,
      "backdrop": "GRAY",
      "withSoftCopy": false,
      "serviceId": "one-session",
      "bookingTime": 1647857400000,
      "pax": 2,
      "totalPrice": 120000,
      "paymentStatus": "PENDING",
      "createdDate": 1647857400000
    }
  }
```

### Update Booking Time (ADMIN)
# Method: PUT
# Url: 
# Request Body
`
  bookingId: "booking-id",
  bookingTime: 1647857400000
`
# Response body
```json
  {
    "code": 200,
    "data": {
      "id": "booking-id"
    }
  }
```