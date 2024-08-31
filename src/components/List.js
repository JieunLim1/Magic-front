// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// function renderRow({ index, key, style, item, onClick }) {
//   return (
//     <div 
//       className="column" 
//       key={key} 
//       style={{...style, display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', marginRight: '10px'}} 
//       onClick={() => onClick(item.text)}
//     >
//       <div className='timestamp' style={{width: '220px', display: 'flex', justifyContent: 'space-between', color: 'white'}}>
//         <div>{item.start}</div>
//         <div>{item.end}</div>
//       </div>
//       {/* <div className="image" style={{marginBottom: '10px'}}>
//         <img src={item.image} alt="" style={{width: '228.5px', height: '130px'}} />
//       </div> */}
//       <div className="content" style={{textAlign: 'center'}}>
//         <div style={{fontWeight: 'bold', marginBottom: '5px', color: 'white'}}>{item.text}</div>
//       </div>
//     </div>
//   );
// }

// const ListItem = ({ onItemClick }) => {
//   let { id } = useParams();

//   const [segments, setSegments] = useState([]);
//   // local storage에서 데이터 가져오기
//   useEffect(() => {
//     const fetchDataAndStore = async () => {
//         try {
//           const response = localStorage.getItem(id);
//           const jsondata = JSON.parse(response) || [];
//           if (Array.isArray(jsondata.video.subtitle)) { 
//             setSegments(jsondata.video.subtitle);
//             console.log("data fetch success!");
//           } else {
//             console.error('Fetched data is not an array:', jsondata);
//           }
//         } catch (error) {
//           console.error('Error fetching data:', error);
//         }
//       };


//     fetchDataAndStore();
//   }, [id]); // Empty dependency array means this runs once when the component mounts

//   const [selectedIndex, setSelectedIndex] = useState(null);
//   const rowHeight = 200;

//   const handleSelect = (index) => {
//     setSelectedIndex(index);
//     onItemClick({ index, text: segments[index].text });
//     console.log("index"+ index);
//   };

//   return (
//     <div>
//       <div className="list" style={{display: 'flex', overflowX: 'auto', height: rowHeight, backgroundColor: 'black', alignItems: 'center', marginTop: '5px'}}>
//         {segments.map((item, index) => (
//           renderRow({
//             index,
//             key: index,
//             style: selectedIndex === index ? { backgroundColor: 'rgba(255, 255, 255, 0.2)' } : {},
//             item,
//             onClick: () => handleSelect(index)
//           })
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ListItem;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Popup from '../pages/projectPopup';

function renderRow({ index, key, style, item, onClick, onTextChange, editingIndex, onEditStart }) {
  return (
    <div 
      className="column" 
      key={key} 
      style={{...style, display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', marginRight: '10px'}} 
      onClick={() => onClick(index)}
    >
      <div className='timestamp' style={{width: '220px', display: 'flex', justifyContent: 'space-between', color: 'white'}}>
        <div>{item.start}</div>
        <div>{item.end}</div>
      </div>
      <div className="content" style={{textAlign: 'center'}}>
        {editingIndex === index ? (
          <input 
            type="text" 
            value={item.text} 
            onChange={(e) => onTextChange(index, e.target.value)} 
            onBlur={() => onEditStart(null)} // 종료 시 인덱스 리셋
            autoFocus
            style={{ fontWeight: 'bold', marginBottom: '5px', color: 'black', textAlign: 'center', width: '200px' }}
          />
        ) : (
          <div 
            style={{fontWeight: 'bold', marginBottom: '5px', color: 'white'}} 
            onClick={() => onEditStart(index)}
          >
            {item.text}
          </div>
        )}
      </div>
      <Popup index={index}/>
    </div>
  );
}

const ListItem = ({ onItemClick }) => {
  let { id } = useParams();

  const [segments, setSegments] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  // Local storage에서 데이터 가져오기
  useEffect(() => {
    const fetchDataAndStore = async () => {
      try {
        const response = localStorage.getItem(id);
        const jsondata = JSON.parse(response) || [];
        if (Array.isArray(jsondata.video.subtitle)) { 
          setSegments(jsondata.video.subtitle);
          console.log("data fetch success!");
        } else {
          console.error('Fetched data is not an array:', jsondata);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataAndStore();
  }, [id]); // id를 의존성으로 추가

  const [selectedIndex, setSelectedIndex] = useState(null);
  const rowHeight = 200;

  const handleSelect = (index) => {
    setSelectedIndex(index);
    onItemClick({ index, text: segments[index].text });
    console.log("index" + index);
  };

  const handleTextChange = (index, newText) => {
    const updatedSegments = segments.map((segment, i) => 
      i === index ? { ...segment, text: newText } : segment
    );
    setSegments(updatedSegments);

    // 업데이트된 데이터를 localStorage에 저장
    const storedData = JSON.parse(localStorage.getItem(id));
    if (storedData) {
      storedData.video.subtitle = updatedSegments;
      localStorage.setItem(id, JSON.stringify(storedData));
    }
  };

  return (
    <div>
      <div className="list" style={{display: 'flex', overflowX: 'auto', height: rowHeight, backgroundColor: 'black', alignItems: 'center', marginTop: '5px'}}>
        {segments.map((item, index) => (
          renderRow({
            index,
            key: index,
            style: selectedIndex === index ? { backgroundColor: 'rgba(255, 255, 255, 0.2)' } : {},
            item,
            onClick: handleSelect,
            onTextChange: handleTextChange,
            editingIndex,
            onEditStart: setEditingIndex
          })
        ))}
      </div>
      <div>
      </div>
    </div>
  );
}

export default ListItem;

