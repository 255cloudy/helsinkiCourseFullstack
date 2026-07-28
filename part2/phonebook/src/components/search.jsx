const Search = ({ search, handleFilter }) => {
  return (
    <>
      <h2>Search</h2>
      <p>
        filter shown with : <input type="text" value={search} onChange={handleFilter} />
      </p>
    </>
  )
}
export {Search}