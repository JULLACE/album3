import { useState } from 'react'
import axios from 'axios'

const Search = ({value, handleChange, submitHandler}) => {
  return (
    <form onSubmit={submitHandler}>
      <input value={value} onChange={handleChange} />
    </form>
  );
}

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState([])

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  }

  const searchHandler = (event) => {
    event.preventDefault();
    console.log('Searching for... ', searchValue);

    const headers = {
      "User-Agent":
        "MyFooBarPersonalApp/0.1"
    }

    axios
      .get('https://api.discogs.com/releases/249504')
      .then(res => {
        console.log('promise fulfilled')
        console.log(res)
      })
  }

  return (
    <div className="search-bar">
      <h1> Search for an artist here </h1>
      <Search 
        value={searchValue} 
        handleChange={handleChange} 
        submitHandler={searchHandler} 
      />
    </div>
  );
}

export default App