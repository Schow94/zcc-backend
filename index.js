const axios = require("axios");
const express = require("express");
var zendesk = require("node-zendesk");
var cors = require("cors");
require("dotenv").config();

const seedTickets = require("./tickets.json");

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
app.get("/tickets", async (req, res, next) => {
	try {
		const tickets = client.tickets.list((err, req, result) => {
			// Error occured while fetching API data
			if (err) {
				console.log("ERROR: ", err);
				const statusCode = err.statusCode;
				res.status(statusCode).send({ error: err });
			} else {
				// Successfully fetched data
				res.send({ tickets: result });
			}
		});
	} catch (e) {
		res.status(500).send(e);
	}
});

// ------------------ Seed routes to generate a bunch of tickets at once ------------------
// app.get("/tickets/addOne", async (req, res, next) => {
// 	try {
// 		const ticket = {
// 			ticket: {
// 				requester_id: 1,
// 				assignee_id: 5,
// 				subject: "velit eiusmod reprehenderit officia cupidatat",
// 				description:
// 					"Aute ex sunt culpa ex ea esse sint cupidatat aliqua ex consequat sit reprehenderit. Velit labore proident quis culpa ad duis adipisicing laboris voluptate velit incididunt minim consequat nulla. Laboris adipisicing reprehenderit minim tempor officia ullamco occaecat ut laborum.\n\nAliquip velit adipisicing exercitation irure aliqua qui. Commodo eu laborum cillum nostrud eu. Mollit duis qui non ea deserunt est est et officia ut excepteur Lorem pariatur deserunt.",
// 				tags: ["est", "nisi", "incididunt"],
// 			},
// 		};

// 		const tickets = client.tickets.create(ticket, (err, req, result) => {
// 			if (err) {
// 				console.log("ERROR: ", err);
// 				return;
// 			}
// 			res.send({ tickets: tickets });
// 		});
// 	} catch (e) {
// 		res.status(500).send(e);
// 	}
// });

// app.get("/tickets/addMany", async (req, res, next) => {
// 	try {
// 		const result = client.tickets.createMany(seedTickets, (err, req, result) => {
// 			if (err) {
// 				console.log("ERROR: ", err);
// 				return;
// 			}
// 			res.send({ tickets: result });
// 		});
// 	} catch (e) {
// 		res.status(500).send(e);
// 	}
// });

// ----------------------- Error middleware -----------------------
app.use((err, req, res, next) => {
	console.log(
		`Unhandled error ${err}. URL = ${req.originalUrl}, method = ${req.method}`
	);
	res.status.send(`500 - Server Error`);
});

// JEST tries to use these ports in testing
if (process.env.NODE_ENV !== "test") {
	app.listen(PORT, () => {
		console.log(`Server is listening on port: ${PORT}`);
	});
}

module.exports = app;
