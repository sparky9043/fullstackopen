import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personServices from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterInput, setFilterInput] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    personServices
      .fetchPersons()
      .then((initialPersons) => setPersons(initialPersons));
  }, []);

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filterInput.toLowerCase())
  );

  function handleSubmit(e) {
    e.preventDefault();

    if (persons.map((person) => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    };

    personServices
      .createPerson(personObject)
      .then((returnedPerson) =>
        setPersons((persons) => [...persons, returnedPerson])
      );

    setNewName("");
    setNewNumber("");
  }

  function handleNameInput(e) {
    setNewName(e.target.value);
  }

  function handleNumberInput(e) {
    setNewNumber(e.target.value);
  }

  function handleFilterInput(e) {
    setFilterInput(e.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filterInput={filterInput}
        onFilterInputChange={handleFilterInput}
      />

      <h3>add a new</h3>
      <PersonForm
        onSubmit={handleSubmit}
        newName={newName}
        onNameChange={handleNameInput}
        newNumber={newNumber}
        onNumberChange={handleNumberInput}
      />

      <h3>Numbers</h3>
      <Persons persons={personsToShow} setPersons={setPersons} />
    </div>
  );
};

export default App;
