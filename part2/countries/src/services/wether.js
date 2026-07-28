import axios from "axios";

const api_key = import.meta.env.VITE_WETHER_KEY

const baseCityWetherUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${api_key}&q=`

const getIconUrl = (icon)=>{
    return `https://openweathermap.org/payload/api/media/file/${icon}.png`
}

const getCityWether = (city)=>{
    const req = axios.get(`${baseCityWetherUrl}${city}`)
    return req.then((res)=>res.data)
}


export {getCityWether, getIconUrl}