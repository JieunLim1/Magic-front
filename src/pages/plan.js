import React from "react";

const Plan  = () => {
    return(
        <div style={{backgroundColor: 'black', width: '100vw', minHeight: '100vh', position: 'relative', paddingBottom: '200px'}}>
            <h style={{color: '#F2E0E0', fontSize: '3rem'}}>Our Plans</h>
            <p style={{color: '#F2E0E0', fontSize: '2rem'}}>Add “MAGIC” on your videos with our plans</p>
            <p style={{color: '#F2E0E0', fontSize: '1.5rem'}}>Upgrade your plan to premium for unlimited video conversions</p>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '50px', width: '100%', paddingTop: '150px', height: 'auto'}}>
                <div style={{borderRadius: '40px', backgroundColor:'#437642', width: '350px', height: '700px'}}>
                    <img style={{paddingTop: '40px'}} src='/basicPlan.png' alt='basicPlan'></img>
                </div>
                <div style={{borderRadius: '40px', backgroundColor:'#88A67F', width: '390px', height: '700px', paddingTop: '30px'}}>
                    <img style={{ width: '380px'}} src='/standard.png' alt='basicPlan'></img>
                </div>
                <div style={{borderRadius: '40px', backgroundColor:'#48624A', width: '350px', height: '700px'}}>
                    <img style={{ paddingTop: '40px', width: '340px'}} src='/premium.png' alt='basicPlan'></img>
                </div>
            </div>
            <img style={{position: 'absolute', top: '770px', left: '90px', width: '290px'}} src='/planAcc1.png' alt="planAcc1"></img>
            <img style={{position: 'absolute', top: '870px', left: '550px', width: '360px'}} src='/planAcc2.png' alt="planAcc1"></img>
            <img style={{position: 'absolute', top: '895px', left: '1000px', width: '300px'}} src='/planAcc3.png' alt="planAcc1"></img>

        </div>
    );
}
export default Plan;