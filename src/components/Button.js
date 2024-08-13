import styled from 'styled-components';


const StyledButton = styled.button`
    background-color: #336FF1; 
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 4px;
    &:hover {
        background-color: #1F4189;
    `;
function Button({text}) {
    return (
        <StyledButton>{text}</StyledButton>
    )
}

export default Button;