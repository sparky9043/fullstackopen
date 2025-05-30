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
    </div>
  );
};

export default App;
