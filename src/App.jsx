import { useState } from 'react'
import axios from 'axios'

import Search from './components/Search'
import Results from './components/Results'
import API from './services/api'

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState([])

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  }

  const searchHandler = (event) => {
    event.preventDefault();
    console.log('Searching for... ', searchValue);

    API.querySearch(searchValue)
      .then(response => {
        setData(response.data.results)
      });
  }

  return (
    <div className="search-bar">
      <h1> Search for an artist here </h1>
      <Search 
        value={searchValue} 
        handleChange={handleChange} 
        submitHandler={searchHandler} 
      />
        {data.length === 0 
        ? null 
        : <div className="result-list">
            {data.map(song =>
              <Results key={song.id} songInfo={song} />
            )}
          </div>
        }
    </div>
  );
}

export default App