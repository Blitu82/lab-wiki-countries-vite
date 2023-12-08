import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';

function CountryDetails() {
  let { countryId } = useParams();
  const [fetching, setFetching] = useState(true);
  const [singleCountry, setSingleCountry] = useState(null);

  useEffect(() => {
    axios
      .get(`https://ih-countries-api.herokuapp.com/countries/${countryId}`)
      .then(response => {
        console.log(response.data.name.common);
        setSingleCountry(response.data);
        setFetching(false);
      });
  }, [countryId]);

  // console.log(countryId);

  return (
    <div className="container">
      <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Country Details</p>
      {singleCountry ? null : <h1>Loading...</h1>}
      {singleCountry && (
        <>
          <img
            src={`https://flagpedia.net/data/flags/icon/72x54/${singleCountry.alpha2Code.toLowerCase()}.png`}
            alt={singleCountry.alpha2Code}
          />
          <h1>{singleCountry.name.common}</h1>
          <table className="table">
            <thead></thead>
            <tbody>
              <tr>
                <td style={{ width: '30%' }}>Capital</td>
                <td>{singleCountry.capital}</td>
              </tr>
              <tr>
                <td>Area</td>
                <td>
                  {singleCountry.area} km
                  <sup>2</sup>
                </td>
              </tr>
              <tr>
                <td>Borders</td>
                <td>
                  {singleCountry.borders.map(border => {
                    return (
                      <ul key={border} style={{ listStyleType: 'none' }}>
                        <li>
                          <Link to={`/${border}`}>{border}</Link>
                        </li>
                      </ul>
                    );
                  })}
                </td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default CountryDetails;
