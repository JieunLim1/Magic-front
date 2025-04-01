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
    const [submit, setSubmit] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [projectKey, setProjectKey] = useState(0);

    const onChangeInput = (e) => {
        const {name, value} = e.target;       
        setInputs({...inputs, [name]: value});
    };

    const openModal = () => {
       setIsOpen(true);
    };

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
            updated: newCreatedTime,
            title: currentTitle,
            path: path,
            video: {
              ...prevSchema.video,
              id: currentUrl.substring(videoIDIndex+2),
              url: currentUrl,
            },
          }));
          setInputs({ title: "", url: "" });
          setSubmit(true);
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
              path: path
          }));
          localStorage.setItem(schema.id, JSON.stringify(schema));
      }
  }, [path]);

    // any changes made within id obj will be updated immediately
    useEffect(() => {
        if (schema.id) {
          localStorage.setItem(schema.id, JSON.stringify(schema));
        }
      }, [schema]); 

      const handleClose = () => {
        setIsOpen(false);
    };
    // submit이 눌리면 schema를 업데이트 하고 navigate
    useEffect(() => {
      if (submit) {
        navigate(`/project/${projectKey}`);
        setSubmit(false);
      }
    }, [submit]);

    // connecting with server (file upload)
    const onFileUpload = async () => {
      if (!file) {
          console.log("Please select a file first!");
          return;
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
          const response = await axios.post("http://localhost:5000/init", formData, {
              headers: {
                  "Content-Type": "multipart/form-data",
              },
          });
          console.log("File uploaded successfully", response.data);
          setPath(response.data.filePath);
      } catch (error) {
          console.error("Error uploading the file", error);
      }
  };

    const inputStyle = {
        width: '50%',
        maxWidth: '400px',
        padding: '10px',
        marginBottom: '10px',
        fontSize: '16px'
    };


    return (
        <div>
            {/* <button style={{backgroundColor: 'white', width: '150px', height: '30px', borderBlockColor: 'black', borderRadius: '5px', borderWidth: '1px', fontSize: '20px', marginTop: '40px'}} onClick={openModal}>Start</button> */}
            <button onClick={openModal}
                style={{
                  position: "absolute",
                  left: "420px",
                  top: "330px",
                  backgroundColor: "#CBAF85",
                  borderRadius: "70px",
                  width: "130px",
                  height: "130px",
                  border: "none",
                  padding: 0,
                  cursor: "pointer", 
                  overflow: "hidden",
                }}
              >
                <img 
                  src="/dashboardArrow.png" 
                  alt="Start new project"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
            </button>
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
                    <input type="file" accept='.json' onChange={onFileChange}/>
                    <button onClick={onFileUpload}>Upload</button>
                </div>
                <div>
                  <button onClick={closeModal} style={{marginTop: '40px'}}>submit</button>
                </div>
                <div style={{marginTop: '150px'}}>
                  <button onClick={handleClose}>X</button>
                </div>
            </Modal>
        </div>
    )
}
export default Starter;