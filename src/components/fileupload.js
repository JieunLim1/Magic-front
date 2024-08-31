import React, { useRef } from "react";

const FileUpload = (props) => {
    const fileInput = useRef(null);
    
    const handleButtonClick = (e) => {
        fileInput.current.click();
    };

    const handleChange = (e) => {
        console.log(e.target.files[0]);
    };

    return(
        <React.Fragment>
            <button onClick={handleButtonClick}>file upload</button>

            <input type='file' ref={fileInput} onChange={handleChange} style={{display: "none"}}></input>
        </React.Fragment>
    ); 
}

export default FileUpload;