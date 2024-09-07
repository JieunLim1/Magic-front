import Starter from "../components/starter";

function Landing() {
    const backgroundStyle = {
        backgroundImage: 'url("/image.png")',  // public 폴더 안에 있는 이미지 경로
        backgroundSize: 'cover',  // 이미지가 요소를 가득 채우도록 설정
        backgroundPosition: 'center', // 이미지가 중앙에 위치하도록 설정
        height: '100vh', // 전체 화면 높이에 맞게 설정
        width: '100vw',  // 전체 화면 너비에 맞게 설정
        display: 'flex', // 내부 요소를 위한 flex 설정
        justifyContent: 'center', // 내부 콘텐츠 가운데 정렬
        alignItems: 'center' // 내부 콘텐츠 가운데 정렬
    };


    return (
        <div> 
        {/* <div style={backgroundStyle}>
        <Starter style={{position: 'absolute', top: '600px', left: '300px', zIndex: '2', width: '100%'}} />
        </div> */}
        <Starter style={{position: 'absolute', top: '600px', left: '300px', zIndex: '2', width: '100%'}} />


        {/* <div style={{position: 'relative', width: '100%', maxWidth: '100%', overflowX: 'hidden'}}>
          <div style={{position: 'relative', zIndex: '1'}}>
            <div style={{display: 'flex', flexDirection: 'row', justifyItems: 'center', marginLeft: '300px'}}>
              <img src='blueStar.png' style={{width: '200px',height: '200px', marginRight: '350px'}} />
              <img src='blueCylin.png' style={{width: '200px', height: '200px', marginBlockEnd: '30px'}}/>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', marginLeft: '120px'}}>
              <img src='pinkDia.png' style={{width: '200px', height: '200px', marginRight: '600px', marginTop: '20px'}} />
              <img src='purpleRing.png' style={{width: '200px', height: '200px'}} />
            </div>
            <div style={{display: 'flex', flexDirection: 'row', marginLeft: '300px'}}>
              <img src='greenMarsh.png' style={{width: '200px', height: '200px', marginRight: '30px'}} />
              
              <Starter style={{position: 'absolute', top: '700px', left: '100px', zIndex: '9999', width: '100%'}} />

              <div>
                <img src='orangeTri.png' style={{width: '200px', height: '200px'}} />
              </div>
            </div>
          </div>
          <div style={{position: 'absolute', top: '200px', left: '300px', zIndex: '2', width: '100%', textAlign: 'center'}}>
            <h1 style={{position: 'absolute', top: '10', fontSize: '200px', letterSpacing: '50px', height: '200px', margin: '0px'}}>MAGIC</h1>
          </div>
          <div  style={{position: 'absolute', top: '200px', left: '0px', zIndex: '2', width: '100%', textAlign: 'center'}}>
            <h1 style={{position: 'absolute', top: '10', fontSize: '200px', letterSpacing: '0px', height: '200px', margin: '0px'}}>C</h1>
          </div>
          <div style={{position: 'absolute', top: '200px', left: '1300px', zIndex: '2', width: '100%', textAlign: 'center', margin: '0px'}}>
            <h1 style={{position: 'absolute', top: '10', fontSize: '200px', letterSpacing: '50px', height: '200px', margin: '0px'}}>M</h1>
          </div>
        </div> */}

        </div>
    )
}
export default Landing;
