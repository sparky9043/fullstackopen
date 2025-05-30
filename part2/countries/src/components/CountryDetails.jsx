const CountryDetails = ({ country }) => {
  console.log(country);
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital {country.capital.join(", ")}</p>
      <p>Area {country.area}</p>
    </div>
  );
};

export default CountryDetails;
