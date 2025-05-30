import { useEffect, useState } from "react";
import CountriesList from "./components/CountriesList";
import Filter from "./components/Filter";
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

  const countriesToShow = allCountries.filter((country) =>
    country.name.common.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="app">
      <Filter
        labelText="find countries"
        inputValue={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <CountriesList countries={countriesToShow} />
    </div>
  );
};

export default App;
