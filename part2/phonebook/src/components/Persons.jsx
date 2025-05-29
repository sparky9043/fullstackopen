import Person from "./Person";

const Persons = ({ persons, setPersons }) => {
  return (
    <ul>
      {persons.map((person) => (
        <Person key={person.id} person={person} setPersons={setPersons} />
      ))}
    </ul>
  );
};

export default Persons;
