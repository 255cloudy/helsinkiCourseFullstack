import axios from "axios"

const baseUrl = "http://localhost:3001/persons"

const getAll = ()=>{
    const request = axios.get(baseUrl)
    return request.then(response=>response.data)
}
const addPerson = (newItem) =>{
    const request = axios.post(baseUrl, newItem)
    return request.then(response => response.data)
}
const updatePerson = (id, updatedGuy) => {
    const request = axios.put(`${baseUrl}/${id}`, updatedGuy)
    return request.then(response => response.data)
}
const deletePerson = (id)=>{
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response=> response.data)
}

export {getAll, addPerson, deletePerson, updatePerson}