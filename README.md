# Backend for @Mesto

Interactive page where you can add photos, delete them and to like them 
Backend part.
 
*latest ver. v 0.1.1*

## Used technologies

- HTML, CSS, JS 
- REST, API, BEM
- node.js, express 
- Webpack
- MONGO, mongoose

## Links
### BackEnd Api
https://84.201.173.59
http://api.olehadash.xyz/
http://www.api.olehadash.xyz/
### Frontend demo
http://olehadash.xyz/
http://www.olehadash.xyz/

## Local deploy
1. Clone repository
2. Install official node.js from here https://nodejs.org/en/
3. npm init (entry point: app.js)
4. npm install express
5. npm install nodemon
6. install the required dependencies
7. npm run start || npm run dev (hot reload)

## Avaliable API functions
POST: (/signin, /signup), (/cards)
GET: (/cards, /cards/*possible_card_Id*), (/users, /users/*possible_user_Id*)
PUT: (/cards/*possible_card_Id*/likes)
PATCH: (/users/me, users/me/avatar)
DELETE: (/cards), (/cards/*possible_card_Id*/likes)

