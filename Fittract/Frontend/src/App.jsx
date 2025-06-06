 // <div>
    //   <Button variant="contained" color="primary">
    //     Click Me
    //   </Button>
    // </div>


//     <Button sx={{ backgroundColor: 'black', fontSize: 18 }}>
//   Green Button
// </Button>


// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Button from '@mui/material/Button';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#4caf50',  // green color
//     },
//   },
//   typography: {
//     fontFamily: 'Arial',
//   },
// });

// function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <Button variant="contained" color="primary">
//         Themed Button
//       </Button>
//     </ThemeProvider>
//   );
  
// }

// export default App;
// | Package               | Purpose                                                          |
// | --------------------- | ---------------------------------------------------------------- |
// | `axios`               | For making HTTP requests (like `fetch`, but simpler).            |
// | `react-router-dom`    | For routing/navigation in React apps.                            |
// | `react-redux`         | Connects Redux store to React components.                        |
// | `redux-persist`       | Keeps your Redux store saved in localStorage (for page refresh). |
// | `@reduxjs/toolkit`    | Simplifies Redux logic and boilerplate.                          |
// | `dayjs`               | Lightweight alternative to Moment.js for date/time formatting.   |
// | `@mui/x-charts`       | For professional chart components from Material UI.              |
// | `@mui/x-date-pickers` | DatePicker/TimePicker components from MUI.                       |

// App.jsx

import React from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { lightTheme } from "./utils/Themes";
import { BrowserRouter } from "react-router-dom";
import Authentication from "./pages/Authentication";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import Workouts from "./pages/Workouts";
import { useSelector } from "react-redux";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text_primary};
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background:${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: hidden;
  transition: all 0.2s ease;
`;

const App = () => {
  const {currentUser} = useSelector ((state) => state.user);
  return (
    <ThemeProvider theme={lightTheme}>
      <>
        <BrowserRouter>
          <GlobalStyle />
          {currentUser?(
            <Container>
              <Navbar currentUser = {currentUser} />
              <Routes>
                <Route path="/" exact element={<Dashboard />} />
                <Route path="/workouts" element={<Workouts />} />
                {/* Add more routes as needed */}
              </Routes>
            </Container>
          ) : (
            <Container>
              <Authentication />
            </Container>
          )}
        </BrowserRouter>
      </>
    </ThemeProvider>
  );
};

export default App;
