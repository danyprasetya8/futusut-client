### Get List of Banners
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

### Subscription
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
        "id": "1-session",
        "name": "1 Session",
        "duration": {
          "photoSession": 15,
          "photoSelection": 10
        },
        "image": "",
        "pax": 2,
        "price": 120000,
        "printedPhotos": 2
      },
      {
        "id": "2-session",
        "name": "2 Session",
        "duration": {
          "photoSession": 30,
          "photoSelection": 20
        },
        "image": "",
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
# Path variable
`
  serviceId: 'service-id'
`
# Response body
```json
  {
    "code": 200,
    "data": {
      "id": "1-session",
      "name": "1 Session",
      "duration": {
        "photoSession": 15,
        "photoSelection": 10
      },
      "image": "",
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
        "id": "id-1",
        "name": "People",
        "price": 40000
      },
      {
        "id": "id-2",
        "name": "Softcopy",
        "price": 40000
      },
      {
        "id": "id-3",
        "name": "Print",
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
      1647315000000,
      1647316500000
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
      "paymentLink": "https://www.linktoxendit.com"
    }
  }
```

### Cancel Booking
# Method: DELETE
# Url: 
# Request body
```json
  {
    "bookingId": "booking-id"
  }
```
# Response body
```json
  {
    "code": 200,
    "data": true
  }
```
