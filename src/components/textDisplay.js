import React from 'react';
import './textDisplay.css';

const TextInput = ({ value, onChange }) => {
    return (
        <div className='textContainer'>
            <input
                className='textInput'
                type="text" 
                value={value} 
                onChange={onChange} 
                placeholder="Enter text" 
            />
        </div>
    );
};

export default TextInput;
