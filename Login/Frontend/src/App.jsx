import React from 'react'
import styled from 'styled-components'
import {createGlobalStyle} from 'styled-components';
import {BrowserRouter as Router,Routes,Route ,useNavigate} from 'react-router-dom';
import Login from './component/Login';
import Navbar from './component/Navbar';
import Signin from './component/Signin';

const GlobalStyle = createGlobalStyle`
  body, html {
    padding: 0;
    margin: 0;
    background-color: #311235;

  }
`;

const Home = () => {
  return <div style = {{color:"white",padding:"2rem"}}>Wrlcome to DreamLnad</div>
}
const App = ()=>{
  return(
    <Router>
      <GlobalStyle />
      <Navbar />
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/login" element = {<Login/>}/>
        <Route path="/signin" element = {<Signin/>}/>
      </Routes>
    </Router>
  )
}
export default App;