import CountryDetails from "./CountryDetails";

const CountryItem = ({ country, countries }) => {
  if (countries.length === 1) {
    return <CountryDetails country={country} />;
  }

  return (
    <div className="country">
      {country.name.common}
      <button>show</button>
    </div>
  );
};

export default CountryItem;
