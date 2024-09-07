import Modal from 'react-modal';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
function Popup({index}) {
    const {id} = useParams();
    const [inputs, setInputs] = useState({
        start: "",
        end: "",
        subtitle: "",
    });

    const { start, end, subtitle } = inputs;

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        
        setInputs({...inputs, [name]: value,});
    };

    
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };
    const handleClose = () => {
        setIsOpen(false);
    }

    const closeModal = () => {
        
        if (start && end && subtitle) {
            const schema = localStorage.getItem(id);
            const json_schema = JSON.parse(schema);
            console.log(`${index}`);
            const newSubtitle = { text: subtitle, start: start, end: end };
            json_schema.video.subtitle.splice(index+1, 0, newSubtitle);

            localStorage.setItem(id,JSON.stringify(json_schema)); 
            setIsOpen(false);
            setInputs({ title: "", url: "" });
        } else {
          console.log("start end subtilte required!");
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
            <button onClick={openModal}>자막 추가하기</button>

            <Modal isOpen={isOpen} onRequestClose={closeModal}>
                <h2>자막추가하기</h2>
                <div>
                    <h4>starting time: </h4>
                    <input style ={inputStyle} className='start-box' type="text" name="start" value={start} placeholder="start time" onChange={onChangeInput}/> 
                </div>
                <div>
                    <h4>ending time: </h4>
                    <input style ={inputStyle} className='end-box' type="text" name="end" value={end} placeholder="end time" onChange={onChangeInput}/>
                </div>
                <div>
                    <h4>caption: </h4>
                    <input style ={inputStyle} className='sub-box' type="text" name="subtitle" value={subtitle} placeholder="subtitle" onChange={onChangeInput}/>
                </div>

                <button onClick={closeModal}>done</button>
                <button onClick={handleClose}>close</button>
            </Modal>
        </div>
    )
}
export default Popup;