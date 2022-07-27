

import './css/app.css';
import './css/Autocad.css'
import './css/toolkit.css';
import './lib/font-awesome/css/font-awesome.min.css';
import { useEffect, useState } from 'react';
export default function Autocad(props) {

  useEffect(()=>{
    
  },[])
 
  return (
    
    <div id="Autocad-wrapper" className={`fake-class small-typography create-step-map ${props.show ? '' : 'hideme'}`}>
      <a id="downloader" className="hide" ></a>
      <div className="panel b-bot " id="panel-b-bot" >
        {/* <span className="logo " id="logo" >Solar pro <sup> 2D</sup></span> */}
        <div id="top-toolbar"></div>
      </div>
      <div id="dock-parent " >

        <div id="dock" className="panel b-right scroll hide" ></div>

        <div id="viewer-container" >
          <div className="tool-hint" ></div>
          <canvas width="1625" height="793" id="viewer"></canvas>
          <div id="react-controls" ></div>
        </div>
        <div id="right-toolbar" className="panel b-left scroll hide" ></div>

      </div>

      <div id="status" className="panel b-top" >
        <div className="button-group">
        </div>
        <div    className="status-item coordinates-info">0.000:0.000</div>
        <div className="status-item tool-info"></div>
      </div>

      <div id="global-windows">
      </div>


      <div id="commands" className="win hide" >
        <div className="tool-caption" >COMMANDS</div>
        <div id="commands-content" className="content panel no-padding" >
          <div className='terminal-output-area scroll'>
            <div className='terminal-pusher'></div>
            <div className='terminal-output'></div>
          </div>
          <div className='terminal-input'>
            <input type="text" placeholder="(type a command)" />
          </div>
        </div>
      </div>

      <div id="constrFilter" className="win hide" >
        <div className="tool-caption" >CONSTRAINT&nbsp;FILTER</div>
        <div className="content panel scroll no-padding" >
        </div>
      </div>


    </div>
  )
}

