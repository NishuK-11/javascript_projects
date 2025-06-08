import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
    background-color:white;
    position:absolute;
    margin-top:230px;
    padding:10px 30px;
    border-radius:10px;
`
const Login = () => {
  const [email,setEmail] =useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate();

  const handlesignin = async()=>{
    try{
      console.log({email, password });
// This line sends a POST request to your Node.js backend API at http://localhost:5000/register.

// Here's what each option means:
      const response = await fetch("http://localhost:5000/login",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({email,password})
      });
      const data = await response.json();
      if(response.ok){
        alert(data.message);//login successful
        navigate('/');
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
            <Title>Login Here</Title>
           
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
          </Card>
          <Button onClick={handlesignin}>Done</Button>
      </Container>
      
    </>
  )
}
export default Login