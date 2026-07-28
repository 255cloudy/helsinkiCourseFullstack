import { useState } from "react"
const Search = ({searchHandler})=>{
  const [search, setSearch] = useState("")
  const handler = (e)=>{
      const newVal = e.target.value 
      setSearch(newVal)
      searchHandler(newVal)
  }
   return (
    <>
      <span>find countries</span>
      <input type="text" value={search} onChange={handler}></input>
    </>
   )
}
export {Search}