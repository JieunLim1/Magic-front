import {useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
const ProjectList = () => {
    const navigate = useNavigate();
    const [all_json_obj, setAllJsonObj] = useState([]);
    const [sorted, setSorted] = useState([]);

    useEffect(() => {
        const allKeys = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const item = localStorage.getItem(key);
            allKeys.push(JSON.parse(item));
        }
        setAllJsonObj(allKeys);
    }, []);

    useEffect(() => {
        if (all_json_obj.length > 0) {
            sort_by_update(all_json_obj);
        }
    }, [all_json_obj]);

    const sort_by_update = (data) => { // data (json)
        const sortedData = [...data].sort(function (a, b) {
            return new Date(b.updated) - new Date(a.updated);
        });
        setSorted(sortedData);
    };

    const onClickItem = (item) => {
        const key = item.id;
        navigate(`/project/${key}`);
    }

    function renderRow(item){
        return(
<div 
  key={item} 
  onClick={() => onClickItem(item)} 
  style={{
    display: 'flex',
    backgroundImage: 'url("/projectLists.png")',
    backgroundSize: 'contain',       
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    marginLeft: '50px',
    marginBottom: '40px',
    marginTop: '70px',
    width: '250px',
    height: '140px',
    justifyContent: 'center',
    alignItems: 'flex-start',
    fontWeight: 'bold',
    color: 'black',
    cursor: 'pointer',
    textAlign: 'center',
    paddingTop: '45px',
  }}
>
  {item.title}
</div>        )
    };


    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
            {sorted.map((item)=>(
                renderRow(item)
            ))}
        </div>
    )
}
export default ProjectList;