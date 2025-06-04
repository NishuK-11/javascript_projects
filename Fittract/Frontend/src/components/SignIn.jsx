import React from 'react'
import {styled} from 'styled-components'
import TextInput from './TextInput'
import Button from './Button'
import { useDispatch } from 'react-redux'
import { UserSignIn } from '../api'
import { loginSuccess } from '../redux/reducer/userSlice'
import { useState } from 'react'
const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap:36px;
`

const Title = styled.h1`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
`

const Span = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 90};
`

const SignIn = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateInputs = () => {
    if (!email || !password) {
      alert("Please fill all the fields");
      return false;
    }
    return true;
  };

  const handleSignIn = async () => {
    setLoading(true);
    setButtonDisabled(true);
    if (validateInputs()) {
      await UserSignIn({email,password}).then((res) => {
        dispatch(loginSuccess(res.data));
        alert("Login Successful");
        setLoading(false);
        setButtonDisabled(false);
      }).catch((err) => {
        console.error(err);
        alert(err.response.data.message);
        setLoading(false);
        setButtonDisabled(false);
      });
    }
  }

  return (
    <Container>
      <div>
        <Title>Welcome to Fittract👋</Title>
        <Span>Please Login with your details</Span>
      </div>
      <div style={{display: 'flex', gap: '20px',flexDirection: 'column'}}>
     <TextInput label="Email Address"
                   placeholder="Enter your email"    
                   value={email}  
                   handleChange={(e)=>setEmail(e.target.value)}     
    />
        <TextInput label="Password"
                   placeholder="Enter your password"
                   value= {password}
                   handleChange={(e)=>setPassword(e.target.value)}
                   type="password"
    />
    <Button 
      text="SignIn"
      onClick={handleSignIn}
      isLoading={loading}
      isDisabled={buttonDisabled}
      />
      </div>
    </Container>
  )
}

export default SignIn
