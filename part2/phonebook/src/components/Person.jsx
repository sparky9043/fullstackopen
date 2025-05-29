import personServices from "../services/persons";

function Person({ person, setPersons }) {
  const { id } = person;
  function handleDelete() {
    personServices
      .deletePerson(id)
      .then((returnedPerson) =>
        setPersons((persons) =>
          persons.filter((person) => person.id !== returnedPerson.id)
        )
      );
  }

  return (
    <li>
      {person.name} {person.number}
      <button onClick={handleDelete}>delete</button>
    </li>
  );
}

export default Person;
