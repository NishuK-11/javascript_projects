import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color:#000;
  display:flex;
  align-items:center;
  justify-content:center;
  position:relative;

`
const Card = styled.div`
      height:420px;
      width:527px;
      background-color: rgba(243, 49, 175, 0.09); 
      color:white;
      border:1.5px solid #9F0679;
      border-radius:20px ;
      display:flex;
      flex-direction:column;
      padding:20px 30px;
      gap:20px;
      ${'' /* box-shadow: offset-x offset-y blur-radius [spread-radius] color; */}

      box-shadow:5px -1px 10.2px #F3C0E2;

`
const Title = styled.h1`
      color:white;
      text-align:center;
      margin:25;

`
const Label = styled.label`
    color:#fff;
    font-size:20px;
    width:80px;
    display:row;
`
const Input = styled.input`
    display:inline-block;
    width: 90%;
    height:60%;
    background-color: #000;
    color: #fff;
    border: 1px solid #ff80c0;
    border-radius: 8px;
    outline: none;

`
const Button = styled.button`
    color:black;
    background-color:white;
    position:absolute;
    margin-top:20%;
    padding:10px 30px;
    margin-left:160px;
    border-radius:10px;
`

const Login = () => {
  const [name,setName] = useState('');
  const [email,setEmail] =useState('');
  const [password,setPassword] = useState('');
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  // Check if user already logged in from localStorage
  useEffect(()=>{
    const loggedIn = localStorage.getItem('isLoggedIn');
    if(loggedIn==='true'){
        setIsLoggedIn(true);
        alert("User already logged in!");
    }
  },[])

  const handleLogin = async()=>{
    try{
      console.log({ name, email, password });
// This line sends a POST request to your Node.js backend API at http://localhost:5000/register.

// Here's what each option means:
      const response = await fetch("http://localhost:5000/register",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({name,email,password})
      });
      const data = await response.json();
      if(response.ok){
        alert(data.message);//login successful

        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
        
      }else{
        alert(data.message);//invalid credentials
      }
    }catch(error){
      alert("Something went wrong!");
      console.log(error);
    }
  }


  return (
    <>
        <Container>
          <Card>
          {isLoggedIn ?(
            <>
            <Title>User Already Logged In</Title>
            <Button onClick={()=>navigate('/signin')}>Go to signin</Button>
            </>
          ):(
            <>
               <Title>Login Here</Title>
            <div>
              <Label>
                  Name</Label>
                  <Input type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}/>
              </div>
              <div>
              <Label>
                  Password</Label>
                  <Input type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <div>
              <Label>
                  Email</Label>
                  <Input type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
              </div>
         
          <Button onClick={handleLogin}>Done</Button>
         </>
          )}
         
             </Card>
      </Container>
      
    </>
  )
}
export default Login