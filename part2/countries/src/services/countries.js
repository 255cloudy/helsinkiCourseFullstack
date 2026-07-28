import axios from 'axios'

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/"

const getAllCountries = ()=>{
    const req = axios.get(`${baseUrl}/all`)
    return req.then((response)=> response.data)
}

export {getAllCountries}