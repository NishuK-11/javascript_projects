import React, { useState } from 'react'
import styled from 'styled-components'
import LogoImage from '../utils/Logo.png'
import AuthImage from '../utils/AuthImage.jpg'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'
const Container = styled.div`
      flex:1;
      height: 100%;
      display: flex;
      background: ${({ theme }) => theme.bg};
      @media (max-width: 768px) {
        flex-direction: column;
      }
    `

const Text = styled.div`
  font-size: 16px;
  text-align:center;
  color:${({theme}) => theme.text_secondary};
  margin-top: 16px;
  @media (max-width: 400px) {
    font-size: 14px;
  }
`
const TextButton = styled.span`
    color: ${({ theme }) => theme.primary};
    cursor: pointer;
    transition:all 0.3s ease;
    font-weight: 600;
`

const Left = styled.div`
  flex: 1;
  position: relative;
  height: 100vh; /* or any specific height you want */
  background: blue;
  @media (max-width: 768px) {
      display: none;
  }
`

const Right = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 40px;
  gap:16px;
  align-items: center;
  justify-content: center;
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
  const [login, setLogin] = useState(false)
  return (
    <Container>
      <Left>
        <Logo src={LogoImage} />
        <Image src={AuthImage} />
      </Left>
      <Right>{!login?(
        <>
        <SignIn />
          <Text>Don't have an account?<TextButton onClick={()=> setLogin(true)}>SignUp</TextButton></Text>
        </>):(
          <>
          <SignUp />
            <Text>Already have an account? <TextButton onClick={()=> setLogin(false)}>SignIn</TextButton></Text>
          </>)}
      </Right>
    </Container>
  )
}

export default Authentication
