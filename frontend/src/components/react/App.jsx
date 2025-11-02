import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';

import Search from './Search';
import Results from './Results';
import Viewport from './Viewport';

import API from '../../services/api';
import '../../styles/search.css';

const App = ({ searchParam, selectedParam }) => {
  const [searchValue, setSearchValue] = searchParam ? useState(searchParam) : useState('');
  const [data, setData] = useState([]);
  const [texture, setTexture] = useState(['/favicon.png', '/favicon.png']);
  const [selectedIndex, setselectedIndex] = selectedParam ? useState(selectedParam) : useState(-1);
  const [searched, setSearched] = useState(false);

  // Wait for renders, then set search text + selected image from URL
  useEffect(() => {
    if (searchParam)
      searchHandler(null);
  }, []);

  useEffect(() => {
    if (selectedParam)
      imageTexture(selectedParam);
  }, [data]);

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const searchHandler = (event) => {
    if (event)
      event.preventDefault();
    console.log('Searching for... ', searchValue);

    setselectedIndex(-1);

    API.querySearch(searchValue)
      .then(response => {
        setData(response.data.results);
        console.log(response.data.results);
        setSearched(true);
        updateURL(`?search=${searchValue}`);
      });
  };

  const imageTexture = (choice = 0) => {
    console.log('Received choice...', choice);
    setselectedIndex(choice);

    if (data.length > 0 && data[choice] && data[choice].id) {
      console.log('Grabbing images...');
      let imageArray = [`${import.meta.env.PUBLIC_LINK_HANDLER}/cover/${data[choice].id}/0`, `${import.meta.env.PUBLIC_LINK_HANDLER}/cover/${data[choice].id}/1`];
      setTexture(imageArray);
      updateURL(`?search=${searchValue}&selected=${choice}`);
    }
  };

  const updateURL = (append) => {
    window.history.pushState("searched", '', append);
  };

  const emptyResults = () => {
    return (
      <div className="empty-list">
        <p>could not find album... :(</p>
      </div>
    );
  };

  return (
    <div className="layout">
      <div className="search-area">
        <div className="title-area">
          <svg fill="#fff" width="65px" height="65px" viewBox="-3.2 -3.2 38.40 38.40" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#000000" strokeWidth="0.00032" transform="matrix(-1, 0, 0, 1, 0, 0)rotate(180)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.512"></g><g id="SVGRepo_iconCarrier"> <path d="M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM30 16c0 2.072-0.456 4.039-1.268 5.81l-8.851-4.736c0.095-0.343 0.149-0.702 0.149-1.075 0-2.226-1.805-4.032-4.032-4.032-0.457 0-0.895 0.079-1.303 0.22l-5.3-8.528c1.969-1.058 4.217-1.659 6.604-1.659 7.72 0 14 6.28 14 14zM16 13.969c1.12 0 2.032 0.911 2.032 2.032s-0.912 2.031-2.031 2.031-2.031-0.912-2.031-2.031 0.911-2.031 2.031-2.031zM7.705 4.73l5.318 8.557c-0.024 0.026-0.048 0.052-0.072 0.079l-8.849-4.735c0.944-1.518 2.168-2.843 3.602-3.901zM2 16c0-1.99 0.42-3.883 1.172-5.599l8.886 4.755c-0.058 0.273-0.090 0.554-0.090 0.844 0 2.226 1.805 4.031 4.032 4.031 0.387 0 0.761-0.058 1.116-0.16l5.319 8.556c-1.927 1.002-4.114 1.572-6.434 1.572-7.72 0-14-6.28-14-14zM24.139 27.38l-5.297-8.521c0.015-0.015 0.030-0.032 0.046-0.048l8.884 4.755c-0.961 1.488-2.195 2.784-3.633 3.815z"></path> </g></svg>
          <h2> album3 </h2>
        </div>

        <Search
          value={searchValue}
          handleChange={handleChange}
          submitHandler={searchHandler}
        />
      </div>

      <div className="view-area">
        <div className="canvas-container" id="cc-box" >
          <div id="gui-box"></div>
          <Canvas>
            <Viewport imageUrl={texture} />
          </Canvas>
        </div>
        {data.length === 0
          ? (searched ? emptyResults() : '')
          : <div className="result-list">
            {data.map((song, index) =>
              <Results
                key={song.id}
                songInfo={song}
                chooseCover={imageTexture}
                selected={index === selectedIndex}
                index={index}
              />
            )}
          </div>
        }
      </div>
    </div>
  );
};

export default App;