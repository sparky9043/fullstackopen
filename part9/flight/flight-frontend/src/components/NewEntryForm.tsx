const NewEntryForm = () => {
  return (
    <form>
      <ul>
        <li>
          <label htmlFor="date">Date</label>
          <input type="text" id='date' />
        </li>
        <li>
          <label htmlFor="visibility">Visibility</label>
          <input type="text" id='visibility' />
        </li>
        <li>
          <label htmlFor="weather">Weather</label>
          <input type="text" id='weather' />
        </li>
        <li>
          <label htmlFor="comment">Comment</label>
          <input type="text" id='comment' />
        </li>
        <li>
          <button type="submit">add</button>
        </li>
      </ul>
    </form>
  )
}

export default NewEntryForm;