import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import axios from 'axios';

function HomePage() {

  const [fetching, setFetching] = useState(true);
  const [countries, setCountries] = useState(null);

  useEffect(() => {
    axios
      .get('https://ih-countries-api.herokuapp.com/countries/')
      .then(response => {
        // console.log(response.data[0].name.common);
        setCountries(response.data);
      });
  }, []);
  return (
    <div
      className="container"
      style={{ maxHeight: '90vh', overflow: 'scroll' }}
    >
      <h1 style={{ fontSize: '24px' }}>
        WikiCountries: Your Guide to the World
      </h1>
      {countries &&
        countries.map(country => {
          return (
            <div key={country._id} className="list-group">
              <Link
                className="list-group-item list-group-item-action"
                to={`/${country.alpha3Code}`}
              >
                <img
                  src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`}
                  alt={country.alpha2Code}
                />
                <br />
                {country.name.common}
              </Link>
            </div>
          );
        })}
    </div>
  );
}

export default HomePage;
