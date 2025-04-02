import { useNavigate } from "react-router-dom";

const About = () => {
    const navigate = useNavigate();
    
    const onSubClick = () => {
        navigate('/plan');
    }
    const onStartClick = () => {
        navigate('/dashboard');
    }
    return (
      <div>
            <div style={{backgroundColor: 'white', height: '100vh', width: '100%'}}>
                <h1 style={{margin: '50px 50px 0', textAlign: 'left', fontSize: '90px',}}>Editing Made Easy, <br/>Re;Magic Made Real</h1>
                <div style={{backgroundColor: '#7B3A4A', position: 'absolute', width: '700px', height: '500px', zIndex: '1', margin: '300px 400px 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                    <img style={{marginTop: '5px', width: '400px'}} src='/videoconverter.png' alt='vieoConverter'></img>
                </div>
            </div>
            <div style={{backgroundColor: '#4F3434', width: '100%', height:'auto'}}>
                <div style={{paddingTop: '250px', display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '150px'}}>
                    <h1 style={{color: '#F2E0E0', fontSize: '5rem', display: 'flex', alignItems: 'flext-start', paddingLeft: '100px', textAlign: 'left'}}>All in one with <br/>Re;Magic!</h1>
                    <p1 style={{width: '600px', textAlign: 'left', color: '#F2E0E0', fontSize: '2rem', marginTop: '100px'}}>With Re;Magic, you can easily sync, edit, and export captions—just like a video editor, but smarter.</p1>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: '#4F3434', marginTop: '80px'}}>
                    <div style={{borderColor: '#FFE4E4', borderStyle: 'solid', borderWidth: '3px', backgroundColor: '#4F3434', width: '300px', height: '100px', fontSize: '1.5rem', color: 'white', alignContent: 'center'}}>Video</div>
                    <div style={{borderColor: '#FFE4E4', borderStyle: 'solid', borderWidth: '3px', backgroundColor: '#4F3434', width: '300px', height: '100px', fontSize: '1.5rem', color: 'white', alignContent: 'center'}}>Caption</div>
                    <div style={{borderColor: '#FFE4E4', borderStyle: 'solid', borderWidth: '3px', backgroundColor: '#4F3434', width: '300px', height: '100px', fontSize: '1.5rem', color: 'white', alignContent: 'center'}}>Editing</div>
                    <div style={{borderColor: '#FFE4E4', borderStyle: 'solid', borderWidth: '3px', backgroundColor: '#4F3434', width: '300px', height: '100px', fontSize: '1.5rem', color: 'white', alignContent: 'center'}}>VTT File</div>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', justifyItems: 'space-between', width: 'autoß'}}>
                    <div style={{backgroundColor: '#437642', width: '350px', height: '350px', borderWidth: '0', marginTop: '100px', marginLeft: '200px', borderRadius: '10px', marginRight: '130px'}}>
                        <div onClick={onStartClick} style={{cursor: 'pointer', backgroundColor: '#F2E0E0', width: '345px', height: '345px', borderRadius: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderWidth: '0', boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.5)', fontSize: '2rem', color: '#4F3434'}}>Get Started</div>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', width: '500px', paddingTop: '150px', marginRight: '30px'}}>
                            <img onClick={onSubClick} src='/goToSubBox.png' alt='goToSubscrip' style={{cursor: 'pointer', display: 'flex', height: '150px', width: '500px'}}/>
                            <div style={{backgroundColor: '#437642', width: '300px', height: '100px', borderRadius: '10px', marginLeft: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F2E0E0', fontSize: '1.5rem'}}>Explore More!</div>
                    </div>
                    <div style={{display: 'flex'}}>
                        <img style={{position: 'relative', width: '300px', height: '180px', marginTop: '420px'}} src='/aboutAcc1.png' alt='aboutAcc1'></img>
                    </div>
                </div>
            </div>
      </div>
    );
}

export default About;
