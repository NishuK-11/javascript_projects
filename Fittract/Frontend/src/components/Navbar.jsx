import React, { useState } from 'react'
import styled from 'styled-components'
import {Link as LinkR,NavLink} from 'react-router-dom'
import LogoImg from '../utils/Logo.png'
import { MenuRounded } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import { useDispatch } from 'react-redux'
import {logout} from '../redux/reducer/userSlice'

const Nav = styled.div`
    background-color: ${({ theme }) => theme.bg};
    height:80px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size:1rem;
    position:sticky;
    top:0;
    z-index: 10;
    color:white;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
`
const NavContainer = styled.div`
    width: 100%;
    display: flex;
    padding: 0 24px;
    max-width: 1400px;
    gap:14px;
    align-items: center;        
    justify-content: space-between;
    font-size:1rem;
`

const NavLogo = styled(LinkR)`
    width: 100%;
    display: flex;
    align-items: center;
    gap:16px;
    padding: 0 16px;
    font-weight:600;
    font-size:18px;
    text-decoration:none;
    color: ${({ theme }) => theme.black};
`

const Logo = styled.img`
    width: 42px;
    height: 42px;
`

const Mobileicon = styled.div`
    color:${({ theme }) => theme.text_primary};
    display: none;
    @media screen and (max-width: 768px) {
        display: flex;
        align-items: center;
    }
`

const NavItems = styled.ul`
  width: 100%;
  display: flex;
  align-items:center;
  justify-content: center;
  gap:32px;
  padding: 0 6px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`
const StyledNavLink = styled(NavLink)`
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.text_primary};
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    transition:all 1s slide-in;
    &:hover{
        color: ${({ theme }) => theme.primary};

    }
    &.active{
        color: ${({ theme }) => theme.primary};
        border-bottom: 1.8px solid ${({ theme }) => theme.primary};
    }
`

const UserContainer = styled.div`
    width: 100%;
    display: flex;
    height: 100%;
    justify-content: center;
    gap:16px;
    align-items: center;
    padding: 0 6px;
    color: ${({ theme }) => theme.primary};
`
const TextButton = styled.div`
    text-align: center;
    color: ${({ theme }) => theme.secondary};
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s ease;
    font-weight:600;
    &:hover{
        color: ${({ theme }) => theme.primary};
    }
`

const MobileMenu = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    gap:16px;
    padding: 0 6px;
    list-style: none;
    width: 90%;
    padding: 12px 40px 24px 40px;
    background-color: ${({ theme }) => theme.bg};
    position: absolute;
    top: 80px;
    right: 0;
    transition: all 0.6s ease-in-out;
    transform:${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
    border-radius: 0 0 20px 20px;
    opacity:${({ isOpen }) => (isOpen ? '100%' : '0')};
    z-index:${({ isOpen }) => (isOpen ? "1000" : '-1000')};
`
const Navbar = ({currentUser}) => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
  return (
    <Nav>
      <NavContainer>
        <Mobileicon onClick={() => setIsOpen(!isOpen)}>
            <MenuRounded sx={{color:"inherit"}}/>
        </Mobileicon>
        <NavLogo to="/">
          <Logo src={LogoImg} alt="Fittract Logo" />
          Fittract
        </NavLogo>

        <MobileMenu isOpen={isOpen}>
            <StyledNavLink to="/" >Dashboard</StyledNavLink>
          <StyledNavLink to="/workouts">Workouts</StyledNavLink>
          <StyledNavLink to="/tutorials">Tutorials</StyledNavLink>
            <StyledNavLink to="/blogs">Blogs</StyledNavLink>
            <StyledNavLink to="/contact">Contact</StyledNavLink>
        </MobileMenu>

        <NavItems>
          <StyledNavLink to="/" >Dashboard</StyledNavLink>
          <StyledNavLink to="/workouts">Workouts</StyledNavLink>
          <StyledNavLink to="/tutorials">Tutorials</StyledNavLink>
            <StyledNavLink to="/blogs">Blogs</StyledNavLink>
            <StyledNavLink to="/contact">Contact</StyledNavLink>
        </NavItems>
        <UserContainer>
            <Avatar src={currentUser?.img}>{currentUser?.name[0]}</Avatar>
            <TextButton onDoubleClick={()=>dispatch(logout())}>Logout</TextButton>
        </UserContainer>
      </NavContainer>
    </Nav>
  )
}

export default Navbar
