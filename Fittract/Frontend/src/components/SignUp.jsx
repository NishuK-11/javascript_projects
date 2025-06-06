import React, { useState } from 'react'
import { styled } from 'styled-components'
import TextInput from './TextInput'
import Button from './Button'
import { useDispatch } from 'react-redux'
import { UserSignUp } from '../api' // Make sure this is correctly named and defined
import { loginSuccess } from '../redux/reducer/userSlice'

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 36px;
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

const SignUp = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(false)

  const [name, setName] = useState("") // ✅ Added missing state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // ✅ Added basic validation function
  const validateInputs = () => {
    if (!name || !email || !password) {
      alert("All fields are required")
      return false
    }
    return true
  }

  const handleSignUp = async () => {
    if (!validateInputs()) return
    setLoading(true)
    setButtonDisabled(true)

    try {
      const res = await UserSignUp({ name, email, password })
      
      dispatch(loginSuccess(res.data))
      alert("Account Created Successfully")
    } catch (err) {
      console.error("SIGNUP ERROR",err)
      alert(err.response?.data?.message || err.message|| "Something went wrong")
    } finally {
      setLoading(false)
      setButtonDisabled(false)
    }
  }

  return (
    <Container>
      <div>
        <Title>Create New Account</Title>
        <Span>Please fill in your details</Span>
      </div>
      <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
        <TextInput
          label="Full Name"
          placeholder="Enter your full name"
          value={name}
          handleChange={(e) => setName(e.target.value)} // ✅ fixed typo
        />
        <TextInput
          label="Email Address"
          placeholder="Enter your email"
          value={email}
          handleChange={(e) => setEmail(e.target.value)} // ✅ fixed typo
        />
        <TextInput
          label="Password"
          placeholder="Enter your password"
          password={true}
          value={password}
          handleChange={(e) => setPassword(e.target.value)} // ✅ fixed typo
        />
        <Button
          text="Sign Up"
          onClick={handleSignUp}
          isLoading={loading}
          isDisabled={buttonDisabled}
        />
      </div>
    </Container>
  )
}

export default SignUp
