import { useEffect, useState } from "react";
import countriesServices from "./services/countries";

const App = () => {
  const [allCountries, setAllCountries] = useState(null);

  useEffect(() => {
    const countriesData = countriesServices.getAll();

    countriesData.then((initialData) => setAllCountries(initialData));
  }, []);

  if (!allCountries) {
    return null;
  }

  // console.log(allCountries.length);
  if (allCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  return <div>Hello</div>;
};

export default App;
