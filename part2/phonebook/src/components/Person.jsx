import personServices from "../services/persons";

function Person({ person, setPersons, setMessage }) {
  const { name, id } = person;
  function handleDelete() {
    personServices
      .deletePerson(id)
      .then(() =>
        setPersons((persons) => persons.filter((person) => person.id !== id))
      )
      .catch((err) => {
        console.log("ERROR DETECTED", id);
        setMessage(
          `Information of ${name} has already been removed from server.`
        );
        setTimeout(() => {
          setMessage(null);
        }, 5000);
        setPersons((persons) => persons.filter((person) => person.id !== id));
      });
  }

  return (
    <li>
      {person.name} {person.number}
      <button onClick={handleDelete}>delete</button>
    </li>
  );
}

export default Person;
