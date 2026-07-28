import { useEffect, useState } from 'react'
import './App.css'
import { getAllCountries } from './services/countries'
import { Search } from './components/Search'
import { CountryList } from './components/CountryList'
import { CountryDetail } from './components/CountryDetail'

function App() {
  const [countries, setCountries] =  useState([])
  const [countriesToShow, setCountriesToShow] = useState([])
  
  const handleSearch = (value)=>{
    const trimmedValue = value.trim().toLowerCase()
   const filteredCountries= countries.filter((country)=>{
    return country.name.common.toLowerCase().includes(trimmedValue)
   })
    const res = filteredCountries.length<=10? filteredCountries: []
    setCountriesToShow(res)
  }
  const handleViewChange = (ct)=>{
    setCountriesToShow([ct])
  }

  useEffect(()=>{
    if(countries.length==0){
      getAllCountries()
      .then((data)=> {setCountries(data); console.log(data)})
      .catch(err=>console.log(err));
    }
  }, [])
  return (
    <>
    <Search searchHandler={handleSearch}/>
    {
      countriesToShow.length==1?
      (<CountryDetail country={countriesToShow[0]}/>): 
      <CountryList countries={countriesToShow} viewHandler={handleViewChange}/>   
    } 
    </>
  )
}

export default App
