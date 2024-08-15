import TextInput from '../components/textDisplay';
import Button from "../components/Button";
import React, { useState, useRef } from 'react';
import './project.css';
import Multi from "../components/multiSelect";
import Popup from "./projectPopup";
import VideoJS from '../components/VideoPlayer';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import ListItem from '../components/temp_list';
const Project = () => {
    const playerRef = React.useRef(null);

    const options = [
        { value: 'option1', label: 'KO' },
        { value: 'option2', label: 'EN' },
        { value: 'option3', label: 'CH' }
    ]
        const [zoomLevel, setZoomLevel] = useState(0);
        const [selectedText, setSelectedText] = useState("");
        const [index, setIndex] = useState(0);
      
        const handleZoomIn = () => {
          setZoomLevel(prev => (prev < 100 ? prev + 10 : prev));
        };
      
        const handleZoomOut = () => {
          setZoomLevel(prev => (prev > 0 ? prev - 10 : prev));
        };

        const handleItemClick = (text) => {
            setSelectedText(text);
        };
    
        const handleTextChange = (event) => {
            setSelectedText(event.target.value);
        };
    
        const videoJsOptions = {
            autoplay: true,
            controls: true,
            responsive: true,
            fluid: true,
            sources: [{
            src: 'https://youtu.be/VBoZSbRcfJ4?si=sc0fpIk-kfzeVg-K',
            type: 'video/mp4'
            }]
        };

        const handlePlayerReady = (player) => {
            playerRef.current = player;
        
            player.on('waiting', () => {
              videojs.log('player is waiting');
            });
        
            player.on('dispose', () => {
              videojs.log('player will dispose');
            });
          };
        
        

    return (
    <div>
        <div className="content-container">
            <div className='video-container'>
                <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
            </div>

            <div className='text-container'>
                <TextInput value={selectedText} onChange={handleTextChange} />
            </div> 
            <div className="button-container">
                <button>edit</button>
                <button>save</button>  
            </div>
        </div>
        <div className="language-option">
            <Multi className='add-language' options={options} title='Select language'/>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px' }}>
            <button className='zoom-out-container' onClick={handleZoomOut} disabled={zoomLevel === 0}>
                <img className='zoom-out' src='./zoomout.png'></img>
            </button>
            <input type="text" value={`${zoomLevel}%`} readOnly style={{ textAlign: 'center', margin: '0 10px', width: '60px' }} />
            <button className='zoom-in-container' onClick={handleZoomIn} disabled={zoomLevel === 100}>
                <img className='zoom-in' src='./zoomin.png'></img>
            </button>   
        </div>
        <div className="x-line"/>
        <Popup />
        <div>
            <ListItem onItemClick={handleItemClick}/>
        </div>
        
    </div>
    
    );
}
export default Project;
