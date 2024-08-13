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
// import React, { useEffect, useState } from 'react';

// const JsonDisplay = () => {
//   const [data, setData] = useState(null); // JSON 데이터를 저장할 상태
//   const [error, setError] = useState(null); // 에러 상태

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('/cider_json.json'); // public 폴더에서의 상대 경로
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const jsonData = await response.json();
//         setData(jsonData); // JSON 데이터를 상태에 저장
//       } catch (error) {
//         setError(error.message);
//         console.error('Error fetching the JSON file:', error);
//       }
//     };

//     fetchData();
//   }, []); // 컴포넌트가 마운트될 때 한 번만 실행

//   return (
//     <div>
//       <h1>JSON File Content</h1>
//       {error ? (
//         <p>Error: {error}</p> // 에러가 발생하면 에러 메시지를 표시
//       ) : data ? (
//         <pre>{JSON.stringify(data, null, 2)}</pre> // JSON 데이터를 예쁘게 출력
//       ) : (
//         <p>Loading...</p> // 데이터가 로드될 때까지 로딩 메시지 표시
//       )}
//     </div>
//   );
// };

// export default JsonDisplay;
