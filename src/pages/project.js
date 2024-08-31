import TextInput from '../components/textDisplay';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './project.css';
import Multi from "../components/multiSelect";
import VideoJS from '../components/VideoPlayer';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import ListItem from '../components/List';
import DownloadVTTButton from '../components/storage';

const Project = () => {
    let { id } = useParams();
    console.log(`this is id in project: ${id}`);
    const playerRef = React.useRef(null);
    const options = [
        { value: 'option1', label: 'KO' },
        { value: 'option2', label: 'EN' },
        { value: 'option3', label: 'CH' }
    ]
        const [selectedItem, setSelectedItem] = useState({ index: null, text: "" });
        const [selectedText, setSelectedText] = useState("");
        const [index, setIndex] = useState(null);
      
        // 유저가 리스트 아이템 클릭시
        const handleItemClick = (item) => {
            setSelectedItem(item);
            setSelectedText(item.text);
            setIndex(item.index);
            console.log("item index: " + item.index);
        };
    
        const handleTextChange = (event) => {
            setSelectedText(event.target.value);
        };

        // 비디오 플레이 옵션
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
        
         const [project, setProject] = useState(null);


        //   subtitleBlock의 text 수정하는 함수
          const updateSubtitleText = () => {
            const loadedProject = localStorage.getItem(id);
            if (loadedProject) {
                const org = JSON.parse(loadedProject);
                org.video.subtitle[index] = selectedText;
                const updatedProject = org;
                setProject(updatedProject);
                localStorage.setItem(id, JSON.stringify(updatedProject));
              };
          };

        const [ciderData, setCiderData] = useState(null);

        // 처음 마운트될때, local storage에 subtitle 저장
          useEffect(()=>{
            fetch('/cider_json.json')  // JSON 파일의 경로를 설정
            .then((response) => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json();
            })
            .then((data) => {
                console.log(`${JSON.stringify(data)}`);
                setCiderData(data); // 데이터를 상태에 저장
                const content = localStorage.getItem(id);
                const content_json = JSON.parse(content);
                content_json.video.subtitle = data.segments;
                content_json.video.source_lang = data.language;
                localStorage.setItem(id,JSON.stringify(content_json));
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
          },[]);
        
        

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
                <button>save</button>  
            </div>
        </div>
        <div className="language-option">
            <Multi className='add-language' options={options} title='Select language'/>
        </div>
        <div className="x-line"/>
        <div>
            <ListItem onItemClick={handleItemClick}/>
        </div>
        <div>
            <DownloadVTTButton id={id}/>
        </div>
        
    </div>
    
    );
}
export default Project;
