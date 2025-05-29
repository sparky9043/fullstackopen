import Person from "./Person";

const Persons = ({ persons, setPersons, setMessage }) => {
  return (
    <ul>
      {persons.map((person) => (
        <Person
          key={person.id}
          person={person}
          setPersons={setPersons}
          setMessage={setMessage}
        />
      ))}
    </ul>
  );
};

export default Persons;
