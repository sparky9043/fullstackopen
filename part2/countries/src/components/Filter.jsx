const Filter = ({ labelText, inputValue, onChange }) => {
  return (
    <label>
      {labelText}
      <input type="text" value={inputValue} onChange={onChange} />
    </label>
  );
};

export default Filter;
