const Search = ({ value, handleChange, submitHandler }) => {
  return (
    <form onSubmit={submitHandler} >
      <input
        value={value}
        onChange={handleChange}
        placeholder="Search for an Album..."
        enterKeyHint="search"
        required />
    </form>
  );
};

export default Search;