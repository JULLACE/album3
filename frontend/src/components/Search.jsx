const Search = ({value, handleChange, submitHandler}) => {
  return (
    <form onSubmit={submitHandler}>
      <input 
        value={value} 
        onChange={handleChange}
        placeholder="Search for an Album..."
        enterKeyHint="search"/>
    </form>
  );
}

export default Search