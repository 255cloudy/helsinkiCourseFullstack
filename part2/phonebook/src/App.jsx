import { useState, useEffect } from 'react'
import { getAll, addPerson, deletePerson, updatePerson } from "./services/backend"
import "./index.css"
import { Persons } from './components/people'
import { NumberForm } from './components/numberForm'
import { Search } from './components/search'
import { Notification } from './components/notifications'
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [phone, setPhone] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [showNotification, setShowNotification] = useState(false)
  const [notification, setNotification] = useState({message: null, type:null}) 
  useEffect(() => {
    console.log("getting data")
    getAll().then((data) => {
      setPersons(data)
      console.log(`data received`, data)
    })
  }, [])

  const nameHandler = (e) => setNewName(e.target.value)
  const numberHandler = (e) => setPhone(e.target.value)
  const filterHandler = (e) => setSearchQuery(e.target.value)
  const handleNOtifications = (notification)=>{
      setNotification(notification)
      setShowNotification(true)
      setTimeout(()=>{setNotification({message:null, type: null}); setShowNotification(false); console.log("removing the notification")}, 8000)
  }
  const handleForm = (e) => {
    e.preventDefault()
    
    const trimmedName = newName.trim()
    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === trimmedName.toLowerCase()
    )

    if (existingPerson) {
      if (existingPerson.number === phone) {
        const msg = `${trimmedName} is already on the list with this exact number.`
        handleNOtifications({message:msg, type:"error"})
        return
      }
      const conf = confirm(`${trimmedName} is already added to the phonebook. Replace the old number with the new one?`)
      
      if (conf) {
        const updatedPersonData = { ...existingPerson, number: phone }

        updatePerson(existingPerson.id, updatedPersonData)
          .then((returnedPerson) => {
            setPersons(persons.map(p => p.id !== existingPerson.id ? p : returnedPerson))
            const msg = `${trimmedName} number has been updated`
            handleNOtifications({message:msg, type:"success"})
            setNewName('')
            setPhone('')
          })
          .catch(error => {
            console.error("Failed to update contact:", error)
            const msg = `Could not update the number for ${trimmedName}.`
            handleNOtifications({message:msg, type:"error"})
          })
      }
    } else {
      const newPerson = {
        name: trimmedName,
        number: phone,
      }

      addPerson(newPerson)
        .then((newGuy) => {
          setPersons(persons.concat(newGuy))
          const msg = `succesfully added ${newGuy.name}`
          handleNOtifications({message:msg, type: "success" })
          setNewName('')
          setPhone('')
        })
        .catch(error => {
          console.error("Failed to add contact:", error)
          const msg = `failed to add ${newPerson}`
          handleNOtifications({message:msg, type: "error" })
        })
    }
  }

  
  const deleteP = (id) => {
    const person = persons.find((p) => p.id === id)
    if (!person) return

    const confirmation = confirm(`Delete ${person.name}?`)
    if (confirmation) {
      setPersons(prevPersons => prevPersons.filter(item => item.id !== id))
      deletePerson(id)
        .then((data)=>{
          console.log(` this is the returned data ${data}`)
          const msg = `${person.name} deleted from the server`
          handleNOtifications({message:msg, type:"success"})
        })
        .catch(error => {
          console.error("Failed to delete contact on server:", error)
          const msg = `Could not delete ${person.name} from the server. Restoring list...`
          handleNOtifications({message:msg, type:"error"})
          getAll().then(data => setPersons(data))
        })
    }
  }    

  const peopleToShow = searchQuery === ''
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
  return (
    <div>
      <h2>Phonebook</h2>
       {showNotification && notification?.message && (
          <Notification type={notification.type} notification={notification.message} />
        )}
      <Search search={searchQuery} handleFilter={filterHandler} />
      <hr />
      <NumberForm
        data={{ name: newName, phone: phone }}
        numberHandler={numberHandler}
        formHandler={handleForm}
        nameHandler={nameHandler}
      />
      <Persons people={peopleToShow} deleteHandler={deleteP}/>
    </div>
  )
}

export default App