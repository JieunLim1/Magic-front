import Starter from "../components/starter";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import ProjectList from "../components/ProjectList";
// const Dashboard = () => {
//     return(
//         <div>
//             <div>
//                 <h2>New Project</h2>
//                 <Starter/>
//             </div>
//             <div>
//                 <h2>Recent Projects</h2>
//                 <ProjectList/>
//             </div>
//         </div>
//     );
// }
// export default Dashboard;

import React from "react";

const Dashboard = () => {
  // Style object
  // const styles = {
  //   container: {
  //     padding: "20px",
  //     backgroundColor: "#D9BE96",
  //     borderRadius: "8px",
  //     maxWidth: "400px",
  //     fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif"
  //   },
  //   heading: {
  //     fontSize: "24px",
  //     fontWeight: "bold",
  //     marginBottom: "20px",
  //     color: "#333333"
  //   },
  //   proButton: {
  //     backgroundColor: "#6200ee",
  //     color: "white",
  //     border: "none",
  //     padding: "12px",
  //     borderRadius: "4px",
  //     fontWeight: "bold",
  //     width: "100%",
  //     marginBottom: "30px",
  //     cursor: "pointer",
  //     transition: "background-color 0.2s"
  //   },
  //   proButtonHover: {
  //     backgroundColor: "#7c29ff"
  //   },
  //   title: {
  //     fontSize: "18px",
  //     fontWeight: "600",
  //     marginBottom: "8px",
  //     color: "#333333"
  //   },
  //   date: {
  //     color: "#666666",
  //     fontSize: "14px",
  //     margin: "0"
  //   }
  // };

  const navigate = useNavigate();
  const onClick = () =>  {
    navigate('/plan');
  };
  const [isHovered, setIsHovered] = useState(false);
  const [isExpand, setIsExpand] = useState(false);

  const viewClick = () => {
    setIsExpand(!isExpand);
  }
  return (
        <div style={{backgroundColor: "#455844", height: "100vh", width: "100%",}}> 
            <div style={{position: "absolute", backgroundColor: "#D9BE96", width: "500px", height: "200px", padding: "50px 0px 100px 50px", marginTop: "60px", marginLeft: "60px", borderRadius: "10px", fontSize: "40px", textAlign: "left", }}>Let's start a new <br/>project</div>
            <Starter/>
            <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={onClick} style={{position: "absolute",backgroundColor: isHovered ? "#934C5E" : "#B06C8B", width: "700px", height: "200px", borderRadius: "10px", marginLeft: "660px", marginTop: "160px", paddingTop: "50px",paddingLeft:"45px", fontSize: "30px", cursor: "pointer", transition: "background-color 0.3s ease"}}>
                Upgrade your account to PRO+
                <p style={{fontSize: '0.9rem', paddingLeft: '150px'}}>With a PRO+ subscription you get many additional and convenient <br/>magical features to edit your videos.</p>
              </div>
            <div style={{textAlign: 'left', overflow: 'hidden', position: 'absolute', backgroundColor: '#576D56', width: '1200px', height: isExpand ? 'auto' : '300px', overflowY: isExpand ? 'visible' : 'hidden', transition: 'height 0.3s ease', margin: "500px 80px 0", borderRadius: "10px", padding: "20px 40px 0"}}>
                <div style={{display: 'flex', flexDirection: 'row', gap: '60px'}}>
                    <h2 style={{color: '#CBD8C4', margin: 0,padding: 0,textAlign: 'left', fontSize: '24px',}}> Latest Projects</h2> 
                    <button onClick={viewClick} style={{ textAlign: 'center',backgroundColor: '#D9D9D9', opacity: 0.7, borderRadius: '50px', width: '150px', alignItems: 'center'}}>
                    view more / collapse
                    </button>
                </div>
                <ProjectList/>
                <img style={{position: 'absolute', top: '210px', left: '0px', width: '200px', height: '140px',}} src="/dashAcc1.png" alt="dashAcc1"/>
                <img style={{position: 'absolute', top: '200px', left: '970px', width: '100px', height: '200px',}} src="/dashAcc2.png" alt="dashAcc2"/>
                <img style={{position: 'absolute', top: '390px', left: '370px', width: '100px', height: '200px',}} src="/dahsAcc3.png" alt="dashAcc3"/>
            </div>
            <img src="/dashStart.png" alt="Dashboard background" style={{
            position: 'absolute', top: '320px', left: '60px', width: '200px', height: '200px',
            objectFit: 'cover',}}/>
        <img style={{position: 'absolute', top: '320px', left: '610px',
            width: '300px',
            height: '190px',}} src="/rocket.png" alt='rocket'/>
        </div>
        
  );
}
export default Dashboard;