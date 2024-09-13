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
            return new Date(b.created) - new Date(a.created);
        });
        console.log(`this is sorted list: ${JSON.stringify(sortedData)}`);
        setSorted(sortedData);
    };

    const onClickItem = (item) => {
        const key = item.id;
        navigate(`/project/${key}`);
    }

    function renderRow(item){
        return(
            <div key={item} onClick={()=>onClickItem(item)} style={{display: 'flex', backgroundColor: 'white', marginLeft: '10px', marginBottom: '40px', width: '100px', height: '70px', borderColor: 'black', borderWidth: '1px', borderRadius: '2px', borderStyle: 'solid', justifyContent: 'center'}}>{item.created}</div>
        )
    };


    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {sorted.map((item)=>(
                renderRow(item)
            ))}
        </div>
    )
}
export default ProjectList;