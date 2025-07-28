const Country = ({ country }) => {
  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  const width = {
    maxWidth: '30%'
  }

  return (
    <div>
      <h3>{country.name}</h3>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <img src={country.flag} alt={`flag of ${country.name}`} style={width} />
    </div>
  )
}


export default Country