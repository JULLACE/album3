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

  // Temporarily set as the 2nd result's album image
  let imageTexture = data.length > 1 
    ? `${data[1].cover_image}`
    : '/logo.png';


  return (
    <div className="search-bar">
      <h1> Search for an Album </h1>
      <Search 
        value={searchValue} 
        handleChange={handleChange} 
        submitHandler={searchHandler} 
      />
      {data.length === 0 
      ? '' 
      : <div className="result-list">
          {data.map(song =>
            <Results key={song.id} songInfo={song} />
          )}
        </div>
      }
      <div className="canvas-container">
        <Canvas>
          <Viewport imageUrl={imageTexture}/>
        </Canvas>
      </div>
    </div>
  );
}

export default App