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
- jest
- supertest

### Install dependencies

- npm install

### How to start

- npm start

### How to run unit tests

- npm install jest supertest --save-dev
- npm run

### API Endpoint

- localhost:5000/tickets

### Additional Information

- ZCC - Backend needs to be running on localhost:5000 while ZCC - Frontend needs to be running on localhost:3000 in order to retrieve ticket data from Zendesk API

- I made routes to quickly seed the Zendesk API with fake ticket data, but that is not part of my application which is why I did not write unit tests for that portion. That code is also commented out.

### Design Choices

- I chose to work with React, Node, and Express because I have experience using these technologies and am fairly competent with React.

- I decided to fetch all tickets in one request to save on API requests. Since I was using React on the frontend to display the tickets, it made it easier and quicker to toggle between different pages with pagination since all data had already been fixed. I could dynamically render different data on different "pages" much quicker with all the data loaded initially, than making a separate API request for each page. If there was significantly more data and it was more intensive to load all the data at once, I might have split it up into separate API requests. I'm also using a Node/Express server to initially fetch all the data from the Zendesk API, so I could see it being slow and bogged down more frequently with separate requests since the Node server is a middleman between the client and API. If React was fetching the data directly, I might have considered splitting it up into separate API requests.

- I opted to only show 10 tickets at a time in the UI and paginate when there's more than 10 tickets, because on my screen, it didn't look great with more than 10 tickets. 25 tickets would require a lot of scrolling and I didn't think an experience involving a lot of scrolling would have been as nice on smaller screens.
