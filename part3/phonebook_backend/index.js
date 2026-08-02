console.log("server started")

import express from "express"
import morgan from "morgan";
import cors from "cors"

import { readFile, writeFile, appendFile } from 'fs/promises'

function getRandomId(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const app = express()
app.use(cors())
app.use(express.json())

app.use(express.static('dist'))

const basePersonsRoute = "/api/persons"
const dataPath = "./phonebook.json"

morgan.token('body', (req) => {
  return req.method==="POST" && req.body && Object.keys(req.body).length > 0 
    ? JSON.stringify(req.body) 
    : '';
});
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))

const jsonTxt = await readFile(new URL(dataPath, import.meta.url), 'utf-8') 
let numbers = JSON.parse(jsonTxt)

const validId = ()=>{
    while (true) {
    const id = getRandomId(100, 8000000);
    const exists = numbers.some(num => num.id.toString() === id.toString());
    if (!exists) {
      return id; 
    }
  }
}

app.get("/info", (request, response)=>{
    const date = new Date().toString()
    const result = `<p> phonebook has info for ${numbers.length} people<p/> 
                    <p> ${date} <p/>`
    response.send(result)
})

app.get(basePersonsRoute, (request, response)=>{
    return response.json(numbers)
})

app.get(`${basePersonsRoute}/:id`, (request, response)=> {
    const number = numbers.find(num =>  num.id == request.params.id)
    if(number){
        return response.status(200).json(number)
    }
    return response.status(404).end()
})

app.delete(`${basePersonsRoute}/:id`, async (request, response)=> {
    const number = numbers.find(num =>  num.id == request.params.id)
    if(number){
        numbers = numbers.filter(num=> num.id != request.params.id)
        await writeFile(dataPath, JSON.stringify(numbers, null, 2), "utf-8")
        return response.status(204).end()
    }
    return response.status(404).end()
})

app.post(basePersonsRoute, async (request, response)=>{
    const bdy = request.body
    if( !bdy){
      return response.status(400).json({error: "request  body  cannot be empty "})
    }
    if(!bdy.name || !bdy.number){
        if(body.number ==="" || body.name ===""){
            return response.status(400).json({error: "name or phone cannot be empty "})
        }
    }
    const person = numbers.filter(num=> num.name.trim() === bdy.name)
    if(person.length>0){
        return response.status(400).json({error: "name already exists "})
    }
    let newId =  getRandomId(100, 8000000)
    const newPerson =  {
        id: validId().toString(),
        name: bdy.name,
        number: bdy.number
    }
    numbers.push(newPerson)
    await writeFile(dataPath, JSON.stringify(numbers, null, 2),"utf-8")
    return response.json(newPerson)
})
const PORT = process.env.PORT || 3001
app.listen(PORT, ()=> {
    console.log(`server running on port ${PORT}`)
})
