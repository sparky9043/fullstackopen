const CountryDetails = ({ country }) => {
  const languages = [...Object.values(country.languages)];
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital.join(", ")}</p>
      <p>Area {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {languages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} />
    </div>
  );
};

export default CountryDetails;
