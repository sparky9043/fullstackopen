const CountryItem = ({ country }) => {
  console.log(country);
  return (
    <li>
      {country.name.common}
      <button>Show</button>
    </li>
  );
};

export default CountryItem;
