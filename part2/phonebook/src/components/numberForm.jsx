const NumberForm = ({ data, formHandler, nameHandler, numberHandler }) => {
  return (
    <form onSubmit={formHandler}>
      <div>
        name: <input value={data.name} onChange={nameHandler} />
      </div>
      <div>
        number: <input value={data.phone} onChange={numberHandler} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export {NumberForm}