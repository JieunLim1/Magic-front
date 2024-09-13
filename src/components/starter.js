import Modal from 'react-modal';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Starter() {
    const navigate = useNavigate();

    const [schema, setSchema ] = useState({
        "id": "",
        "created": "",
        "updated": "",
        "title": "",
        "owner_id": "",
        "path": "",
        "video": {
            "id": 0,
            "url": "",
            "source_lang": "",
            "subtitle": [],
        }
    });

    const [file, setFile] = useState(null);
    const [path, setPath] = useState(null);

    const [inputs, setInputs] = useState({
        title: "",
        url: ""
    });
    const { title, url } = inputs;

    const onChangeInput = (e) => {
        const {name, value} = e.target;       
        setInputs({...inputs, [name]: value});
    };

    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
       setIsOpen(true);
    };

    const [projectKey, setProjectKey] = useState(0);

    const closeModal = () => {
        const newProjectKey = uuidv4(); 
        const newCreatedTime = moment().format('YYYY/MM/DD HH:mm:ss');
        const currentTitle = inputs.title.trim();
        const currentUrl = inputs.url.trim();
    
        if (currentTitle && currentUrl) {
          setProjectKey(newProjectKey);
          setIsOpen(false);
          const videoIDIndex = currentUrl.indexOf('v=')
    
          setSchema((prevSchema) => ({
            ...prevSchema,
            id: newProjectKey,
            created: newCreatedTime,
            title: currentTitle,
            updated: newCreatedTime,
            path: path,
            video: {
              ...prevSchema.video,
              id: currentUrl.substring(videoIDIndex+2),
              url: currentUrl,
            },
          }));
          setInputs({ title: "", url: "" });
          navigate(`/project/${newProjectKey}`);
        } else {
          console.log("Title and URL are required!");
        }
      };

      const onFileChange = (e) => {
        console.log(e.target.files[0]);
        setFile(e.target.files[0]);
    };

    useEffect(() => {
      if (path) {
          setSchema((prevSchema) => ({
              ...prevSchema,
              path: path  // 파일 경로 업데이트
          }));
          localStorage.setItem(schema.id, JSON.stringify(schema));
      }
  }, [path]);

    
      useEffect(() => {
        if (schema.id) {
          console.log(`this is video id from starter ${schema.video.id}`);
          localStorage.setItem(schema.id, JSON.stringify(schema));
        }
      }, [schema]); 

      const handleClose = () => {
        setIsOpen(false);
    };
    
    const onFileUpload = async () => {
      if (!file) {
          console.log("Please select a file first!");
          return;
      }

      const formData = new FormData();
      formData.append("file", file);
      console.log(`appending successful`);

      try {
          const response = await axios.post("http://localhost:5000/init", formData, {
              headers: {
                  "Content-Type": "multipart/form-data",
              },
          });
          console.log("File uploaded successfully", response.data);
          console.log(`this is file path: ${response.data.filePath}`);
          setPath(response.data.filePath);
      } catch (error) {
          console.error("Error uploading the file", error);
      }
  };

    const inputStyle = {
        width: '50%', // Full width of the container
        maxWidth: '400px', // Max width of 400px
        padding: '10px', // Padding inside the input box
        marginBottom: '10px', // Space between input boxes
        fontSize: '16px' // Font size inside the input box
    };


    return (
        <div>
            <button style={{backgroundColor: 'white', width: '150px', height: '30px', borderBlockColor: 'black', borderRadius: '5px', borderWidth: '1px', fontSize: '20px', marginTop: '40px'}} onClick={openModal}>Start</button>

            <Modal isOpen={isOpen} onRequestClose={closeModal}>
                <h2>Getting started</h2>
                <div>
                    <h4>Name of the project: </h4>
                    <input style ={inputStyle} className='start-box' type="text" name="title" value={title} placeholder="title" onChange={onChangeInput}/> 
                </div>
                <div>
                    <h4>Youtube video url: </h4>
                    <input style ={inputStyle} className='end-box' type="text" name="url" value={url} placeholder="url" onChange={onChangeInput}/>
                </div>
                <div>
                  <button onClick={closeModal}>done</button>
                </div>
                <div style={{marginTop: '150px'}}>
                  <button onClick={handleClose}>close</button>
                </div>
                <div>
                    <input type="file" onChange={onFileChange}/>
                    <button onClick={onFileUpload}>Upload</button>
                </div>
            </Modal>
        </div>
    )
}
export default Starter;