const express = require("express");

const app = express();

app.use(express.json());

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

app.post("/api/persons", (request, response) => {
  const body = request.body;

  const matching = persons.find(
    (person) => person.name.toLowerCase() === body.name.toLowerCase()
  );

  if (matching) {
    response.status(400).json({
      error: "name must be unique",
    });
  } else if (!body.name) {
    response.status(400).json({
      error: "did not provide a name",
    });
  } else if (!body.number) {
    response.status(400).json({
      error: "did not provide phone number",
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
