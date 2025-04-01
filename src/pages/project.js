import TextInput from '../components/textDisplay';
import { Navigate, useParams } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';
import './project.css';
import VideoPage from '../components/VideoPlayer';
import ListItem from '../components/List';
import DownloadVTTButton from '../components/storage';
import FileUpload from '../components/fileupload';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const Project = () => {
    let { id } = useParams();
    const playerRef = useRef(null);

    const navigate = useNavigate();
    const [selectedText, setSelectedText] = useState("");
    const [videoid, setVideoid] = useState(null);
    const [filePath, setFilePath] = useState(null);

    const handleFileUpload = (path) => {
        setFilePath(path); // 파일 경로를 상태로 저장
    };

    const handleItemClick = (item) => {
        setSelectedText(item.text);
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

    useEffect(() => {// video subtitle을 저장된 파일 경로를 사용해 읽어서 가져오기
        const fetchData = async () => {
            try {
                const content = localStorage.getItem(id);
                if (content) {
                    const content_json = JSON.parse(content);
                    const file_path = content_json.path;
    
                    const response = await fetch(file_path);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
    
                    content_json.video.subtitle = data.segments;
                    content_json.video.source_lang = data.language;
                    setVideoid(content_json.video.id);
                    localStorage.setItem(id, JSON.stringify(content_json));
                }
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };
    
        fetchData();
    }, [id]);

    const handleSetDebugCaptions = () => {
        const debugUrl = "http://localhost:5000/uploads/1725696216629.vtt";
        setFilePath(debugUrl);
    };

    const handleSave = () => { // 저장시 누른 시각을 기준으로 프로젝트 업데이트 시간 변경
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
                        <><VideoPage
                            options={videoJsOptions}
                            videoID={videoid}
                            captionsSrc={filePath}
                            onReady={handlePlayerReady} /><button onClick={handleSetDebugCaptions} style={{ marginTop: "1rem" }}>
                                Set Debug Captions
                            </button></>
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
