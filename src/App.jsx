import React, { useContext } from 'react';
import Sidebar from './Compo/Sidebar';
import Playesr from './Compo/Playesr';
import Display from './Compo/Display';
import {PlayerContext} from './Context/PlayerContext';

const App = () => {

const{ audioRef,track }=useContext(PlayerContext);


  return (
    <div className='h-screen bg-black'>
      <div className="h-[90%] flex">
        <Sidebar />
        <Display />
      </div>
      <Playesr />
      <audio ref={audioRef} src={track.file} preload='auto'></audio>
    </div>
  );
}

export default App;
