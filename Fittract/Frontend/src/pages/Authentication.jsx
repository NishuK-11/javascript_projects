import React, { useState } from 'react'
import styled from 'styled-components'
import LogoImage from '../utils/Logo.png'
import Authemage from '../utils/AuthImage.jpg'
const Container = styled.div`
      flex:1;
      height: 100%;
      display: flex;
      background: ${({ theme }) => theme.bg};
      @media (max-width: 768px) {
        flex-direction: column;
      }
    `

const Left = styled.div`
  flex: 1;
  position: relative;
  height: 100vh; /* or any specific height you want */
  background: blue;
`

const Right = styled.div`
  flex: 1;
  background: red;
`
const Logo = styled.img`
  position: absolute;
  top: 40px;
  width: 70px;
  left: 60px;
  z-index:10;
`
const Image = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
`
const Authentication = () => {
  const [isLogin, setIsLogin] = useState(false)
  return (
    <Container>
      <Left>
        <Logo src={LogoImage} />
        <Logo src={Authemage} />
        <Image />
      </Left>
      <Right>{isLogin?<></>:<></>}</Right>
    </Container>
  )
}

export default Authentication
