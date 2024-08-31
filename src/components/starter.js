import Modal from 'react-modal';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
function Starter() {
    const navigate = useNavigate();

    const [schema, setSchema ] = useState({
        "id": "",
        "created": "",
        "updated": "",
        "title": "",
        "owner_id": "",
        "video": {
            "id": 0,
            "url": "",
            "source_lang": "",
            "subtitle": [],
        }
    });

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
    
      useEffect(() => {
        if (schema.id) {
          localStorage.setItem(schema.id, JSON.stringify(schema));
        }
      }, [schema]); 
      

    const inputStyle = {
        width: '50%', // Full width of the container
        maxWidth: '400px', // Max width of 400px
        padding: '10px', // Padding inside the input box
        marginBottom: '10px', // Space between input boxes
        fontSize: '16px' // Font size inside the input box
    };


    return (
        <div>
            <button onClick={openModal}>start</button>

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

                <button onClick={closeModal}>done</button>
            </Modal>
        </div>
    )
}
export default Starter;