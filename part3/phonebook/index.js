const express = require("express");
const morgan = require("morgan");

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const app = express();

app.use(express.json());
// app.use(
//   morgan.token("combined", function (req, res) {
//     return req.headers["content-type"];
//   })
// );
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
  response.json(persons);
});

const getCurrentTime = () => new Date();

app.get("/info", (request, response) => {
  response.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${getCurrentTime()}</p>`);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((p) => p.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((p) => p.id !== id);

  response.status(204).end();
});

const generateId = () => {
  const random1 = Math.floor(Math.random() * 50);
  const random2 = Math.floor(Math.random() * 50) + 50;
  const newId = random1 * random2;

  return String(newId);
};

const postErrorMessages = {
  repeatName: "name must be unique",
  emptyName: "did not provide a name",
  emptyPhone: "did not provide phone number",
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  const matching = persons.find(
    (person) => person.name.toLowerCase() === body.name.toLowerCase()
  );

  if (matching) {
    response.status(400).json({
      error: postErrorMessages.repeatName,
    });
  } else if (!body.name) {
    response.status(400).json({
      error: postErrorMessages.emptyName,
    });
  } else if (!body.number) {
    response.status(400).json({
      error: postErrorMessages.emptyPhone,
    });
  }

  const newPerson = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(newPerson);

  response.json(newPerson);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Your server is ready at http://localhost:${PORT}/api/persons`);
});
