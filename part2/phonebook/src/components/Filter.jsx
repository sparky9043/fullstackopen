const Filter = ({ filterInput, onFilterInputChange }) => {
  return (
    <div>
      filter shown with
      <input type="text" value={filterInput} onChange={onFilterInputChange} />
    </div>
  );
};

export default Filter;
