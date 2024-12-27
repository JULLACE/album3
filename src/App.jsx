import { useState } from 'react'
import axios from 'axios'
import { Canvas } from '@react-three/fiber'

import Search from './components/Search'
import Results from './components/Results'
import Viewport from './components/Viewport'

import API from './services/api'

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState([]);
  const [texture, setTexture] = useState('/logo.png')

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  }

  const searchHandler = (event) => {
    event.preventDefault();
    console.log('Searching for... ', searchValue);

    API.querySearch(searchValue)
      .then(response => {
        setData(response.data.results);
        console.log(response.data.results);
      });
  }


  const imageTexture = (choice = 0) => {
    console.log('Received choice...', choice)

    if (data.length > 0 && choice) {
      let matchedResult = data.find(result => result.id === choice)
      setTexture(`${import.meta.env.VITE_LINK_HANDLER}${matchedResult.cover_image}`)
    }
  }

  return (
    <div className="search-bar">
      <h1> Search for an Album </h1>
      <Search 
        value={searchValue} 
        handleChange={handleChange} 
        submitHandler={searchHandler} 
      />
      <div className='separator'>
        { data.length === 0 
        ? '' 
        : <div className="result-list">
            {data.map(song =>
              <Results key={song.id} songInfo={song} chooseCover={imageTexture}/>
            )}
          </div>
        }
        <div className="canvas-container">
          <Canvas>
            <Viewport imageUrl={texture}/>
          </Canvas>
        </div>
      </div>
    </div>
  );
}

export default App