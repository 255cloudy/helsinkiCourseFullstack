const CountryList = ({countries, viewHandler}) =>{
  if(countries.length==0) return (<p> Too many matches specify another filter </p>)
  return (
    <div>
        <ul className='countries'>
            {
              countries.map((country)=>(
                <li key={country.name.common}>
                  <span>{country.name.common}</span>
                  <button onClick={()=>viewHandler(country) }>Show</button>
                </li>
              ))
            }
        </ul>
    </div>
  )
}
export {CountryList}