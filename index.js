const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

morgan.token("body", (req, res) => JSON.stringify(req.body));
const app = express();

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(express.json());
app.use(cors());
app.use(express.static("build"));

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  }).catch((error) => next(error));
});

app.get("/info", (request, response) => {
  Person.count({}, function(error, numOfDocs) {
    response.send(
      `<p>Phonebook has info for ${numOfDocs} people.</p><p>${new Date()}</p>`
    );
  }).catch((error) => next(error)); 
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      next(error)
    });
});


app.put("/api/persons/:id", (request, response) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson)
    })
    .catch((error) => {
      next(error)
    });
});

app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  console.log(body)
  if (!body.name) {
    next("Name is missing");
  }
  if (!body.number) {
    next("Number is missing");
  }

  // Person.find({}).then(result => {
  //   result.forEach(person => {
  //     if(person.name === body.name){
  //       return response.status(400).json({
  //         error: body.name + ' already exists! name must be unique'
  //       })}
  //     })
  // })

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  }).catch((error) => next(error));
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

