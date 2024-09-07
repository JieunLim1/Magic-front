import TextInput from '../components/textDisplay';
import { Navigate, useParams } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';
import './project.css';
import Multi from "../components/multiSelect";
import VideoPage from '../components/VideoPlayer';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import ListItem from '../components/List';
import DownloadVTTButton from '../components/storage';
import FileUpload from '../components/fileupload';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

// const Project = () => {
//     let { id } = useParams();
//     console.log(`this is id in project: ${id}`);
//     const playerRef = React.useRef(null);
//     const options = [
//         { value: 'option1', label: 'KO' },
//         { value: 'option2', label: 'EN' },
//         { value: 'option3', label: 'CH' }
//     ]
//         const [selectedItem, setSelectedItem] = useState({ index: null, text: "" });
//         const [selectedText, setSelectedText] = useState("");
//         const [index, setIndex] = useState(null);
//         const [uploadedFile, setUploadedFile] = useState(null);
      
//         // 유저가 리스트 아이템 클릭시
//         const handleItemClick = (item) => {
//             setSelectedItem(item);
//             setSelectedText(item.text);
//             setIndex(item.index);
//             console.log("item index: " + item.index);
//         };
    
//         const handleTextChange = (event) => {
//             setSelectedText(event.target.value);
//         };

//         // 비디오 플레이 옵션
//         const videoJsOptions = {
//             autoplay: true,
//             controls: true,
//             responsive: true,
//             fluid: true,
//             sources: [{
//             src: '',
//             type: 'video/mp4'
//             }]
//         };

//         const handlePlayerReady = (player) => {
//             playerRef.current = player;
        
//             player.on('waiting', () => {
//               videojs.log('player is waiting');
//             });
        
//             player.on('dispose', () => {
//               videojs.log('player will dispose');
//             });
//           };
//         const handleFileSelect = (file) => {
//             const fileURL = URL.createObjectURL(file);  // 파일을 URL로 변환
//             setUploadedFile(fileURL); // 파일 URL을 상태로 저장
//         }
        
//         const [ciderData, setCiderData] = useState(null);
//         const [videoid, setVideoid] = useState(null);

//         // 처음 마운트될때, local storage에 subtitle 저장
//         useEffect(()=>{
//             fetch('/cider_json.json')  // JSON 파일의 경로를 설정
//             .then((response) => {
//             if (!response.ok) {
//             throw new Error('Network response was not ok');
//             }
//             return response.json();
//             })
//             .then((data) => {
//                 setCiderData(data); // 데이터를 상태에 저장
//                 const content = localStorage.getItem(id);
//                 const content_json = JSON.parse(content);
//                 content_json.video.subtitle = data.segments;
//                 content_json.video.source_lang = data.language;
//                 console.log(`${content_json.video.id}`)
//                 setVideoid(content_json.video.id);
//                 console.log(`this is video id 라인 82: ${videoid}`);
//                 localStorage.setItem(id,JSON.stringify(content_json));
//             })
//             .catch((error) => {
//                 console.error('There was a problem with the fetch operation:', error);
//             });
//         },[videoid]);
        
        
//     return (
//     <div>
//         <div className="content-container">
//             <div className='video-container'>
//                 <FileUpload onFileSelect={handleFileSelect}/>
//                 {/* <VideoPage
//                 options={{ ...videoJsOptions, sources: [{ src: `https://www.youtube.com/watch?v=${videoid}`, type: 'video/youtube' }] }}
//                 onReady={handlePlayerReady} videoID={videoid}
//                 /> */}
//                 {/* videoid가 null이 아닐 때만 VideoPage 렌더링 */}
//                 {/* 처음에는 setVideoid 하기도 전에 project component rendering되서 비디오 아이디 값이 null이였음 <-- 문제 */}
//                 {videoid ? (
//                         <VideoPage
//                             options={videoJsOptions}
//                             videoID={videoid}
//                             captionsSrc={uploadedFile}
//                         />
//                     ) : (
//                         <p>Loading video...</p>
//                     )}
//             </div>
//             <div className='text-container'>
//                 <TextInput value={selectedText} onChange={handleTextChange} />
//             </div> 
//             <div className="button-container">
//                 <button>save</button>  
//             </div>
//         </div>
//         <div className="language-option">
//             <Multi className='add-language' options={options} title='Select language'/>
//         </div>
//         <div className="x-line"/>
//         <div>
//             <ListItem onItemClick={handleItemClick}/>
//         </div>
//         <div>
//             <DownloadVTTButton id={id}/>
//         </div>
        
//     </div>
    
//     );
// }
// export default Project;

const Project = () => {
    let { id } = useParams();
    const playerRef = useRef(null);

    const navigate = useNavigate();
    const [selectedItem, setSelectedItem] = useState({ index: null, text: "" });
    const [selectedText, setSelectedText] = useState("");
    const [index, setIndex] = useState(null);
    const [videoid, setVideoid] = useState(null);
    const [ciderData, setCiderData] = useState(null);
    const [uploadedFile, setUploadedFile] = useState(null); // 파일을 저장할 상태 추가
    const [videoReady, setVideoReady] = useState(false); // 비디오 로드 상태 관리

    // 파일이 업로드될 때 호출되는 함수
    const handleFileSelect = (file) => {
        const fileURL = URL.createObjectURL(file);  // 파일을 URL로 변환
        console.log('Uploaded file URL:', fileURL);
        setUploadedFile(fileURL); // 파일 URL을 상태로 저장
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
        if (uploadedFile) {
            setVideoReady(true); // 파일이 업로드되면 비디오 로드 상태를 true로 설정
        }
    }, [uploadedFile]);

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
                    <FileUpload onFileSelect={handleFileSelect}/>

                    { videoid ? (
                        <VideoPage
                            options={videoJsOptions}
                            videoID={videoid}
                            captionsSrc={uploadedFile}
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
            {/* <div className="language-option">
                <Multi className='add-language' options={options} title='Select language'/>
            </div> */}
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
