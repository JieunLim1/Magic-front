import React, { useState } from 'react';


const initialData = [
  {
    text: " 똑같은 하루에서 답답함을 빼면",
    start: 0.13,
    end: 4.329,
    image: './thumbnails/thumbnail-01.jpg',
  },
  {
    text: " 더 청량해 질 거야 제로처럼 ",
    start: 4.329,
    end: 10.330,
    image: './thumbnails/thumbnail-03.jpg',
  },
  {
    text: " 우리 없어도 되는 건 빼고 살자",
    start: 17.09,
    end: 22.17,
    image: './thumbnails/thumbnail-06.png',
  },
  {
    text: " 칠성사이다 제로",
    start: 27.202,
    end: 30.702,
    image: './thumbnails/thumbnail-07.jpg',
  }
];

function renderRow({ index, key, style, item, onClick }) {
  return (
    <div 
      className="column" 
      key={key} 
      style={{...style, display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', width: '230px'}} 
      onClick={() => onClick(item.text)}
    >
      <div className='timestamp' style={{width: '220px', display: 'flex', justifyContent: 'space-between', color: 'white'}}>
        <div>{item.start}</div>
        <div>{item.end}</div>
      </div>
      <div className="image" style={{marginBottom: '10px'}}>
        <img src={item.image} alt="" style={{width: '228.5px', height: '130px'}} />
      </div>
      <div className="content" style={{textAlign: 'center'}}>
        <div style={{fontWeight: 'bold', marginBottom: '5px', color: 'white'}}>{item.text}</div>
      </div>
    </div>
  );
}

const Sublist = ({ onItemClick }) => {
  const [list, setList] = useState(initialData);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const rowHeight = 200;

  const handleSelect = (index) => {
    setSelectedIndex(index);
    onItemClick(list[index].text);
  };

  return (
    <div>
      <div className="list" style={{display: 'flex', overflowX: 'auto', height: rowHeight, backgroundColor: 'black', alignItems: 'center', marginTop: '5px'}}>
        {list.map((item, index) => (
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

export default Sublist;

