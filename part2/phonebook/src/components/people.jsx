const Person = ({ person, deleteHandler }) => {
  const applyPadding = (length, value)=>{
    if(value.length >= length) {return value}
    else{
        return value.padEnd(length-value.length)
    }
  }
  return (
    <p className="person">
      <span>{applyPadding(20,person.name)} </span>
      <span>{applyPadding(20,person.number)}</span>
      <button onClick={() => deleteHandler(person.id)}>Delete</button>
    </p>
  )
}

const Persons = ({ people, deleteHandler }) => {
  return (
    <>
      <h2>Numbers</h2>
      {people.map((person) => (
        <Person key={person.id} person={person} deleteHandler={deleteHandler} />
      ))}
    </>
  )
}
export {Person, Persons}