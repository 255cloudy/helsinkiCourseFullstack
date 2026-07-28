import { useState, useEffect } from "react"
import { getIconUrl } from "../services/wether"
import { getCityWether } from "../services/wether"

const CountryDetail = ({country}) => {
  const [weather, setWeather] = useState(null)
  useEffect(()=>{
    getCityWether(country.capital)
      .then((data)=> setWeather(data))
      .catch((error)=>{console.log(error)})
  },[])
  console.log(weather)
  return(
  <>
    <h1>{country.name.common}</h1>
    
    <section>
      <p><strong>Capital:</strong> {country.capital} </p>
      <p><strong>Area:</strong> {country.area} </p>
    </section>

     <section>
        <h2>Languages</h2>
        <ul>
          {
            Object.values(country.languages).map((value, index)=>(
                <li key={index}>{value}</li>
            ))
          }
        </ul>
     </section>
     <figure>
        <img 
          src={country.flags.svg} 
          alt={`flag of ${country.name.common}`}
          width="200"
          style={{ height: 'auto', objectFit: 'contain' }}
        />
        <figcaption>{country.name.common}</figcaption>
     </figure>
     {weather? 
     <section>
      <h2>Weather in {country.capital}</h2>
      <p><strong>Temperature</strong> {weather.main.temp - 273.15} celcius</p>
       <figure>
        <img 
          src={getIconUrl(weather.weather[0].icon)} 
          alt={` ${weather.weather[0].description}`}
          width="100"
          style={{ height: 'auto', objectFit: 'contain' }}
        />
        {/* <figcaption>{country.name.common}</figcaption> */}
        <p><strong>Wind</strong> {weather.wind.speed} m/s</p>
      </figure>
     </section>
     : <p>Loading weather data ........</p>
     }
  </>)
}

export {CountryDetail}