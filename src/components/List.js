import React, { useEffect, useState } from 'react';

function renderRow({ index, key, style, item, onClick }) {
  return (
    <div 
      className="column" 
      key={key} 
      style={{...style, display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', marginRight: '10px'}} 
      onClick={() => onClick(item.text)}
    >
      <div className='timestamp' style={{width: '220px', display: 'flex', justifyContent: 'space-between', color: 'white'}}>
        <div>{item.start}</div>
        <div>{item.end}</div>
      </div>
      {/* <div className="image" style={{marginBottom: '10px'}}>
        <img src={item.image} alt="" style={{width: '228.5px', height: '130px'}} />
      </div> */}
      <div className="content" style={{textAlign: 'center'}}>
        <div style={{fontWeight: 'bold', marginBottom: '5px', color: 'white'}}>{item.text}</div>
      </div>
    </div>
  );
}

const ListItem = ({ onItemClick }) => {

  const [segments, setSegments] = useState([]);
  // local storage에서 데이터 가져오기
  useEffect(() => {
    const fetchDataAndStore = async () => {
        try {
          const response = localStorage.getItem('seg');
          const jsondata = JSON.parse(response) || [];
          if (Array.isArray(jsondata)) { 
            setSegments(jsondata);
            console.log("data fetch success");
          } else {
            console.error('Fetched data is not an array:', jsondata);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };


    fetchDataAndStore();
  }, []); // Empty dependency array means this runs once when the component mounts

  const [selectedIndex, setSelectedIndex] = useState(null);
  const rowHeight = 200;

  const handleSelect = (index) => {
    setSelectedIndex(index);
    onItemClick({ index, text: segments[index].text });
    console.log("index"+ index);
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
            onClick: () => handleSelect(index)
          })
        ))}
      </div>
    </div>
  );
}

export default ListItem;

