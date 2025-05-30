import CountryItem from "./CountryItem";

const CountriesList = ({ countries }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (countries.length === 1) {
    return <p>{countries[0].name.common} YEAHHHH</p>;
  }

  return (
    <ul>
      {countries.map((country) => (
        <CountryItem key={country.name.common} country={country} />
      ))}
    </ul>
  );
};

export default CountriesList;
