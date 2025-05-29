// import personServices from '../services/persons';

function Person({ person }) {
  const { id } = person;
  function handleDelete() {
    console.log("delete", id);
  }

  return (
    <li>
      {person.name} {person.number}
      <button onClick={handleDelete}>delete</button>
    </li>
  );
}

export default Person;
