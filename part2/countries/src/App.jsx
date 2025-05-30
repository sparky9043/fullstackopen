import { useEffect, useState } from "react";
import countriesServices from "./services/countries";

const App = () => {
  const [allCountries, setAllCountries] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const countriesData = countriesServices.getAll();

    countriesData.then((initialData) => setAllCountries(initialData));
  }, []);

  if (!allCountries) {
    return null;
  }

  // if (allCountries.length > 10) {
  //   return <p>Too many matches, specify another filter</p>;
  // }

  const countriesToShow = allCountries.filter((country) =>
    country.name.common.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div>
      <label>
        find countries
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </label>
      {countriesToShow.length <= 10 ? (
        <ul>
          {countriesToShow.map((country) => (
            <li key={country.name.common}>{country.name.common}</li>
          ))}
        </ul>
      ) : (
        <p>Too many matches, specify another filter</p>
      )}
    </div>
  );
};

export default App;
