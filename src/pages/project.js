import TextInput from '../components/textDisplay';
import { Navigate, useParams } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';
import './project.css';
import VideoPage from '../components/VideoPlayer';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import ListItem from '../components/List';
import DownloadVTTButton from '../components/storage';
import FileUpload from '../components/fileupload';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const Project = () => {
    let { id } = useParams();
    const playerRef = useRef(null);

    const navigate = useNavigate();
    const [selectedItem, setSelectedItem] = useState({ index: null, text: "" });
    const [selectedText, setSelectedText] = useState("");
    const [index, setIndex] = useState(null);
    const [videoid, setVideoid] = useState(null);
    const [ciderData, setCiderData] = useState(null);
    const [uploadedFile, setUploadedFile] = useState(null); 
    const [videoReady, setVideoReady] = useState(false);
    const [filePath, setFilePath] = useState(null);

    const handleFileUpload = (path) => {
        setFilePath(path); // 파일 경로를 상태로 저장
        console.log('Uploaded file path:', path);
    };

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setSelectedText(item.text);
        setIndex(item.index);
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
            src: '',
            type: 'video/mp4'
        }]
    };

    const handlePlayerReady = (player) => {
        playerRef.current = player;

        player.on('waiting', () => {
            console.log('player is waiting');
        });

        player.on('dispose', () => {
            console.log('player will dispose');
        });
    };

    useEffect(() => {
        fetch('/cider_json.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setCiderData(data);
                const content = localStorage.getItem(id);
                const content_json = JSON.parse(content);
                content_json.video.subtitle = data.segments;
                content_json.video.source_lang = data.language;
                setVideoid(content_json.video.id);
                localStorage.setItem(id, JSON.stringify(content_json));
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, [id]);

    // uploadedFile이 변경될 때 비디오 로드 상태를 업데이트
    useEffect(() => {
        if (filePath) {
            setVideoReady(true);
        }
    }, [filePath]);

    const handleSave = () => {
        const now = moment().format('YYYY/MM/DD HH:mm:ss');
        const content = localStorage.getItem(id);
        const content_json = JSON.parse(content);
        content_json.updated = now;
        localStorage.setItem(id, JSON.stringify(content_json));
        navigate('/dashboard');
    }

    return (
        <div>
            <div className="content-container">
                <div className='video-container'>
                    <FileUpload onUploadComplete={handleFileUpload}/>

                    { videoid ? (
                        <VideoPage
                            options={videoJsOptions}
                            videoID={videoid}
                            captionsSrc={filePath}
                            onReady={handlePlayerReady}
                        />
                    ) : (
                        <p>Loading video...</p>
                    )}
                </div>
                <div className='text-container'>
                    <TextInput value={selectedText} onChange={handleTextChange} />
                </div> 
                <div className="button-container">
                    <button onClick={handleSave}>save</button>  
                </div>
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
};

export default Project;
