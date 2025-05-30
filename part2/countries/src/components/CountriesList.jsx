import CountryDetails from "./CountryDetails";
import CountryItem from "./CountryItem";

const CountriesList = ({ countries }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (countries.length === 1) {
    return <CountryDetails country={countries[0]} />;
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
