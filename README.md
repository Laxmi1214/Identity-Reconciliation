# Identity Reconciliation API

A backend service built using Node.js, Express, and MongoDB that identifies and links multiple contacts belonging to the same user using email and phone number.

## Features
- Creates primary and secondary contacts
- Links contacts with same email or phone
- Returns consolidated contact information

## Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose

## API Endpoint

POST /identify

Request Body:

{
 "email": "example@gmail.com",
 "phoneNumber": "123456"
}

Response:

{
 "contact": {
  "primaryContactId": "...",
  "emails": [],
  "phoneNumbers": [],
  "secondaryContactIds": []
 }
}
