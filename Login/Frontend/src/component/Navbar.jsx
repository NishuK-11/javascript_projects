import React from 'react'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom';
const Nav = styled.div`
    background-color:#43002D
`
const Container = styled.div`
  background-color:#43002D;
  display:flex;
  align-item:center;
  shadow:2px solid white;
  height:10%;
  width:100%;
  color:white;
  padding:20px 15px;
  shadow:2px solid white ;
  //box-shadow: [x-offset] [y-offset] [blur-radius] [spread-radius] [color];
  box-shadow: -2px 6px 18.8px 0px #670D5E;
`
const Title = styled.div`
  font-size:18px;
`

const Menu = styled.div`
    padding:0 400px;
    display:flex;
    justify-content:center;
    align-items:center;
    gap:80px;
`
const Button = styled.div`
    background-color:#88396B;
    border:1px solid #676262;
    color:white;
    padding:4px 14px;
    border-radius:8px;
    cursor:pointer;
`

const Navbar = () => {
    const navigate = useNavigate();
  return (
    <>
      <Nav>
         <Container>
          <Title>DreamLand</Title>
          <Menu>
            <ul>Home</ul>
            <ul>Read</ul>
            <ul>Buy</ul>
            <ul>Publish</ul>
          </Menu>
          <Button onClick={()=>navigate('/login')}>SignUp</Button>
      </Container>
      </Nav>
    </>
  )
}

export default Navbar
