require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

const app = express();

app.use(express.json());
app.use(express.static("dist"));
app.use(cors());

app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      JSON.stringify(req.body),
    ].join(" ");
  })
);

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => response.json(persons));
});

// const getCurrentTime = () => new Date();

// app.get("/info", (request, response) => {
//   response.send(`<p>Phonebook has info for ${persons.length} people</p>
//     <p>${getCurrentTime()}</p>`);
// });

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
});

// app.delete("/api/persons/:id", (request, response) => {
//   const id = request.params.id;
//   persons = persons.filter((p) => p.id !== id);

//   response.status(204).end();
// });

// const postErrorMessages = {
//   repeatName: "name must be unique",
//   emptyName: "did not provide a name",
//   emptyPhone: "did not provide phone number",
// };

app.post("/api/persons", (request, response) => {
  const body = request.body;

  // if (matching) {
  //   response.status(400).json({
  //     error: postErrorMessages.repeatName,
  //   });
  // } else if (!body.name) {
  //   response.status(400).json({
  //     error: postErrorMessages.emptyName,
  //   });
  // } else if (!body.number) {
  //   response.status(400).json({
  //     error: postErrorMessages.emptyPhone,
  //   });
  // }

  const newPerson = new Person({
    name: body.name,
    number: body.number,
  });

  newPerson.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
