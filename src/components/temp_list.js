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

  useEffect(() => {
    const fetchDataAndStore = async () => {
      try {
        const response = await fetch('/cider_json.json');
        const jsonData = await response.json();
        const key = jsonData.language;
        const value = JSON.stringify(jsonData.segments);
        localStorage.setItem(key, value);
        setSegments(jsonData.segments);
        console.log('Data stored successfully');
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
    onItemClick(segments[index].text);

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

