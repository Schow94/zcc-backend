# ZCC - Backend

- Runs on localhost:3000

### Credentials

- Currently my (Stephen's) credentials are used
- My credentials are in a .env file that is not committed to Github
- If you wish to add your own credentials, create a .env file in the root directory & add the following to it:
  - TOKEN={YOUR_TOKEN}
  - API_URL={YOUR_API_URL}
  - EMAIL={YOUR_EMAIL}
  - \*\* Replace YOUR_TOKEN with your token
  - \*\* Do not include curly brackets
- If you require my credentials, send me an email and I can get them to you

### Required Dependencies:

- Express.js
- Axios
- node-zendesk
- dotenv
- cors
- nodemon

### Install dependencies

- npm install

### How to start

- npm start

### How to run Express tests

- npm install jest supertest --save-dev
- npm run test

ZCC - Backend needs to be running on localhost:5000 while ZCC - Frontend needs to be running on localhost:3000 in order to retrieve ticket data from Zendesk API
