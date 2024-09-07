import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Popup from '../pages/projectPopup';

function renderRow({
  index,
  key,
  style,
  item,
  onClick,
  onTextChange,
  onTimeChange,
  editingIndex,
  onEditStart,
  editingStartTimeIndex,
  onEditStartTime,
  editingEndTimeIndex,
  onEditEndTime,
}) {
  return (
    <div
      className="column"
      key={key}
      style={{
        ...style,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        marginRight: '10px',
      }}
      onClick={() => onClick(index)}
    >
      <div
        className="timestamp"
        style={{
          width: '220px',
          display: 'flex',
          justifyContent: 'space-between',
          color: 'white',
        }}
      >
        {editingStartTimeIndex === index ? (
          <input
            type="text"
            value={item.start}
            onChange={(e) => onTimeChange(index, 'start', e.target.value)}
            onBlur={() => onEditStartTime(null)}
            autoFocus
            style={{ color: 'black', textAlign: 'center', width: '90px' }}
          />
        ) : (
          <div onClick={() => onEditStartTime(index)}>{item.start}</div>
        )}
        {editingEndTimeIndex === index ? (
          <input
            type="text"
            value={item.end}
            onChange={(e) => onTimeChange(index, 'end', e.target.value)}
            onBlur={() => onEditEndTime(null)}
            autoFocus
            style={{ color: 'black', textAlign: 'center', width: '90px' }}
          />
        ) : (
          <div onClick={() => onEditEndTime(index)}>{item.end}</div>
        )}
      </div>
      <div className="content" style={{ textAlign: 'center' }}>
        {editingIndex === index ? (
          <input
            type="text"
            value={item.text}
            onChange={(e) => onTextChange(index, e.target.value)}
            onBlur={() => onEditStart(null)}
            autoFocus
            style={{
              fontWeight: 'bold',
              marginBottom: '5px',
              color: 'black',
              textAlign: 'center',
              width: '200px',
            }}
          />
        ) : (
          <div
            style={{ fontWeight: 'bold', marginBottom: '5px', color: 'white' }}
            onClick={() => onEditStart(index)}
          >
            {item.text}
          </div>
        )}
      </div>
      <Popup index={index} />
    </div>
  );
}

const ListItem = ({ onItemClick }) => {
  let { id } = useParams();

  const [segments, setSegments] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingStartTimeIndex, setEditingStartTimeIndex] = useState(null); // 시작 시간 편집을 위한 인덱스 상태
  const [editingEndTimeIndex, setEditingEndTimeIndex] = useState(null); // 종료 시간 편집을 위한 인덱스 상태

  // Local storage에서 데이터 가져오기
  useEffect(() => {
    const fetchDataAndStore = async () => {
      try {
        const response = localStorage.getItem(id);
        const jsondata = JSON.parse(response) || [];
        if (Array.isArray(jsondata.video.subtitle)) {
          setSegments(jsondata.video.subtitle);
          console.log('data fetch success!');
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
    console.log('index' + index);
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

  const handleTimeChange = (index, field, newValue) => {
    const updatedSegments = segments.map((segment, i) =>
      i === index ? { ...segment, [field]: newValue } : segment
    );
    //updatedSegments = updatedSegments.sort(function(a,b) {return a.start-b.start})
    console.log(`${typeof(updatedSegments)}`);
    setSegments(updatedSegments);

    // 업데이트된 데이터를 localStorage에 저장
    const storedData = JSON.parse(localStorage.getItem(id));
    if (storedData) {
      storedData.video.subtitle = updatedSegments;
      localStorage.setItem(id, JSON.stringify(storedData));
    }
  };
//   const handleTimeChange = (index, field, newValue) => {
//     let updatedSegments = segments.map((segment, i) =>
//       i === index ? { ...segment, [field]: newValue } : segment
//     );

//     // start 값을 문자열로 변환 후 비교하여 정렬
//     updatedSegments.sort((a, b) => String(a.start).localeCompare(String(b.start)));

//     console.log(Array.isArray(updatedSegments));  // true일 경우, updatedSegments는 배열입니다.
//     setSegments(updatedSegments);

//     // 업데이트된 데이터를 localStorage에 저장
//     const storedData = JSON.parse(localStorage.getItem(id));
//     if (storedData) {
//       storedData.video.subtitle = updatedSegments;
//       localStorage.setItem(id, JSON.stringify(storedData));
//     }
// };


  return (
    <div>
      <div
        className="list"
        style={{
          display: 'flex',
          overflowX: 'auto',
          height: rowHeight,
          backgroundColor: 'black',
          alignItems: 'center',
          marginTop: '5px',
        }}
      >
        {segments.map((item, index) =>
          renderRow({
            index,
            key: index,
            style:
              selectedIndex === index
                ? { backgroundColor: 'rgba(255, 255, 255, 0.2)' }
                : {},
            item,
            onClick: handleSelect,
            onTextChange: handleTextChange,
            onTimeChange: handleTimeChange,
            editingIndex,
            onEditStart: setEditingIndex,
            editingStartTimeIndex,
            onEditStartTime: setEditingStartTimeIndex,
            editingEndTimeIndex,
            onEditEndTime: setEditingEndTimeIndex,
          })
        )}
      </div>
      <div></div>
    </div>
  );
};

export default ListItem;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import Popup from '../pages/projectPopup';

// function renderRow({
//   index,
//   key,
//   style,
//   item,
//   onClick,
//   onTextChange,
//   onTimeChange,
//   editingIndex,
//   onEditStart,
//   editingTimeIndex,
//   onEditTimeStart,
// }) {
//   return (
//     <div
//       className="column"
//       key={key}
//       style={{
//         ...style,
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         cursor: 'pointer',
//         marginRight: '10px',
//       }}
//       onClick={() => onClick(index)}
//     >
//       <div
//         className="timestamp"
//         style={{
//           width: '220px',
//           display: 'flex',
//           justifyContent: 'space-between',
//           color: 'white',
//         }}
//       >
//         {editingTimeIndex === index ? (
//           <>
//             <input
//               type="text"
//               value={item.start}
//               onChange={(e) => onTimeChange(index, 'start', e.target.value)}
//               onBlur={() => onEditTimeStart(null)}
//               autoFocus
//               style={{ color: 'black', textAlign: 'center', width: '90px' }}
//             />
//             <input
//               type="text"
//               value={item.end}
//               onChange={(e) => onTimeChange(index, 'end', e.target.value)}
//               onBlur={() => onEditTimeStart(null)}
//               style={{ color: 'black', textAlign: 'center', width: '90px' }}
//             />
//           </>
//         ) : (
//           <>
//             <div onClick={() => onEditTimeStart(index)}>{item.start}</div>
//             <div onClick={() => onEditTimeStart(index)}>{item.end}</div>
//           </>
//         )}
//       </div>
//       <div className="content" style={{ textAlign: 'center' }}>
//         {editingIndex === index ? (
//           <input
//             type="text"
//             value={item.text}
//             onChange={(e) => onTextChange(index, e.target.value)}
//             onBlur={() => onEditStart(null)}
//             autoFocus
//             style={{
//               fontWeight: 'bold',
//               marginBottom: '5px',
//               color: 'black',
//               textAlign: 'center',
//               width: '200px',
//             }}
//           />
//         ) : (
//           <div
//             style={{ fontWeight: 'bold', marginBottom: '5px', color: 'white' }}
//             onClick={() => onEditStart(index)}
//           >
//             {item.text}
//           </div>
//         )}
//       </div>
//       <Popup index={index} />
//     </div>
//   );
// }

// const ListItem = ({ onItemClick }) => {
//   let { id } = useParams();

//   const [segments, setSegments] = useState([]);
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [editingTimeIndex, setEditingTimeIndex] = useState(null); // 시간 편집을 위한 인덱스 상태

//   // Local storage에서 데이터 가져오기
//   useEffect(() => {
//     const fetchDataAndStore = async () => {
//       try {
//         const response = localStorage.getItem(id);
//         const jsondata = JSON.parse(response) || [];
//         if (Array.isArray(jsondata.video.subtitle)) {
//           setSegments(jsondata.video.subtitle);
//           console.log('data fetch success!');
//         } else {
//           console.error('Fetched data is not an array:', jsondata);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchDataAndStore();
//   }, [id]); // id를 의존성으로 추가

//   const [selectedIndex, setSelectedIndex] = useState(null);
//   const rowHeight = 200;

//   const handleSelect = (index) => {
//     setSelectedIndex(index);
//     onItemClick({ index, text: segments[index].text });
//     console.log('index' + index);
//   };

//   const handleTextChange = (index, newText) => {
//     const updatedSegments = segments.map((segment, i) =>
//       i === index ? { ...segment, text: newText } : segment
//     );
//     setSegments(updatedSegments);

//     // 업데이트된 데이터를 localStorage에 저장
//     const storedData = JSON.parse(localStorage.getItem(id));
//     if (storedData) {
//       storedData.video.subtitle = updatedSegments;
//       localStorage.setItem(id, JSON.stringify(storedData));
//     }
//   };

//   const handleTimeChange = (index, field, newValue) => {
//     const updatedSegments = segments.map((segment, i) =>
//       i === index ? { ...segment, [field]: newValue } : segment
//     );

//     // 시간을 수정한 후 정렬
//     const sortedSegments = updatedSegments.sort((a, b) =>
//       JSON.stringify(a.start).localeCompare(JSON.stringify(b.start))
//     );
//     setSegments(sortedSegments);

//     // 정렬된 데이터를 localStorage에 저장
//     const storedData = JSON.parse(localStorage.getItem(id));
//     if (storedData) {
//       storedData.video.subtitle = sortedSegments;
//       localStorage.setItem(id, JSON.stringify(storedData));
//     }
//   };

//   return (
//     <div>
//       <div
//         className="list"
//         style={{
//           display: 'flex',
//           overflowX: 'auto',
//           height: rowHeight,
//           backgroundColor: 'black',
//           alignItems: 'center',
//           marginTop: '5px',
//         }}
//       >
//         {segments.map((item, index) =>
//           renderRow({
//             index,
//             key: index,
//             style:
//               selectedIndex === index
//                 ? { backgroundColor: 'rgba(255, 255, 255, 0.2)' }
//                 : {},
//             item,
//             onClick: handleSelect,
//             onTextChange: handleTextChange,
//             onTimeChange: handleTimeChange,
//             editingIndex,
//             onEditStart: setEditingIndex,
//             editingTimeIndex,
//             onEditTimeStart: setEditingTimeIndex,
//           })
//         )}
//       </div>
//       <div></div>
//     </div>
//   );
// };

// export default ListItem;
