import Starter from "../components/starter";
import { useNavigate } from "react-router-dom";
function Landing() {
  const navigate = useNavigate();
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

    const onClick = () =>  {
      navigate('/dashboard');
    };

    return (
        <div style={backgroundStyle}>
          <button onClick={onClick} style={{position: 'absolute', top: '603px', left: '500px', backgroundColor: 'white', width: '350px', height: '70px', borderBlockColor: 'black', borderRadius: '45px', borderWidth: '1px', fontSize: '20px', marginTop: '80px'}}>Get Started</button>
        </div>        
    )
}
export default Landing;
