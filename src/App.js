import React, {useState, useEffect} from 'react';
import {isMobile} from 'react-device-detect';
import './App.css';
import useWindowSize from './tools/dimensions';
import PlayGround from './components/playGround';

function App() {

  const [dimensions, setDimensions] = useState(useWindowSize());

  //Get windows size
	const size = useWindowSize();

  useEffect(() => {
    setDimensions(size);
  },[size])

  return (
    <div className="App">
    {isMobile ? <div> Sorry! this content is unavailable on mobile</div>
    : <PlayGround dimensions={dimensions}/>}
    </div>
  );
}

export default App;
