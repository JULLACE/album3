const Search = ({value, handleChange, submitHandler}) => {
  return (
    <form onSubmit={submitHandler}>
      <input value={value} onChange={handleChange} />
    </form>
  );
}

export default Search