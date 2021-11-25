//tickets.spec.js

const supertest = require("supertest");
const app = require("./index.js");

describe("Testing the tickets API", () => {
	it("tests the base tickets route and returns true for status", async () => {
		const response = await supertest(app).get("/tickets").expect(200);
	});
});
