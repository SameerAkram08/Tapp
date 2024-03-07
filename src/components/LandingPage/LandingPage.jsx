import React from 'react';
import './LP.css';
import Navbar from './Navbar';
import { VscMenu } from "react-icons/vsc";


function App() {
  return (
    <>
      <div className="bg2 " style={{ background: 'linear-gradient(to bottom right,#0f1012,#181b90)' }}>
        <Navbar />
        <div className="cntr-text">
          <div className="midBtn">
            <button type="button" className='men-btn'><span>Menu <VscMenu className='men-line' />
            </span></button>
          </div>
          <div className='text-data'>
            <h1 className='text1'>Sameer's</h1>
            <h2 className='text2'>&nbsp;  Todo App</h2>
            <p className='para1'>
              &nbsp;  Making productivity cool again - introducing our groovy Todo app!
            </p>
          </div>
        </div>

        <div className="bton">
          <button type="button" className='exp-btn container'>
            <span className='text-center mx-auto'>Explore</span>
          </button>
        </div>


      </div>
    </>
  );
}

export default App;
