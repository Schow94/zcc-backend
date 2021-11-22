const { default: axios } = require("axios");
const express = require("express");
var zendesk = require("node-zendesk");
var cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 5000;
app.use(express.json());
app.use(cors());

var client = zendesk.createClient({
	username: process.env.EMAIL,
	token: process.env.TOKEN,
	remoteUri: process.env.API_URL,
});

// When React frontend hits this endpoint we fetch data from Zendesk API using this Express server
// and send data back to React frontend to bypass CORS issue
app.get("/", async (req, res, next) => {
	try {
		const tickets = client.tickets.list((err, req, result) => {
			if (err) {
				console.log("ERROR: ", err);
				return;
			}
			res.send({ tickets: result });
		});
	} catch (e) {
		res.status(500).send(e);
	}
});

// Error middleware
app.use((err, req, res, next) => {
	console.log(
		`Unhandled error ${err}. URL = ${req.originalUrl}, method = ${req.method}`
	);
	res.status.send(`500 - Server Error`);
});

app.listen(PORT, () => {
	console.log(`Server is listening on port: ${PORT}`);
});
