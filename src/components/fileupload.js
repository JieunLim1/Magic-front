import React, { useState } from 'react';
import axios from 'axios';

function FileUpload({onUploadComplete}) {
    const [file, setFile] = useState(null);

    const onFileChange = (e) => {
        console.log(e.target.files[0]);
        setFile(e.target.files[0]);
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
            const response = await axios.post("http://localhost:5000/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("File uploaded successfully", response.data);

            onUploadComplete(response.data.filePath);
        } catch (error) {
            console.error("Error uploading the file", error);
        }
    };

    return (
        
        <div>
            <input type="file" accept='.vtt' onChange={onFileChange} />
            <button onClick={onFileUpload}>Upload</button>
        </div>
    );
}

export default FileUpload;
