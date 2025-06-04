// import React from 'react';
// import styled from 'styled-components';
// import TextInput from './TextInput'; // Assuming TextInput is a custom component for input
// import { useState } from 'react';
// import Button from '@mui/material/Button';
// const Card = styled.div`
//   flex: 1;
//   min-width: 200px;
//   padding: 24px;
//   border: 1px solid ${({ theme }) => theme.text_primary + 20};
//   border-radius: 14px;
//   display: flex;
//   gap: 6px;
//   box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
// `;

// const Title = styled.div`
//   font-weight: 600;
//   font-size: 16px;
//   color: ${({ theme }) => theme.primary};
//   @media (max-width: 768px) {
//     font-size: 14px;
//   }
// `;


// const AddWorkout = ({workout,setWorkout,addNewWorkout,buttonLoading}) => {
//   return (
//     <Card>
//       <Title>Add New Workout</Title>
//       <TextInput 
//       label="Workout"
//       textArea
//       rows={10}
//       placeholder={`Enter in this format:\n\nWorkout Name\nSets\nReps\nWeight\nDuration`}
//         value={workout}
//         handleChange = {(e)=>setWorkout(e.target.value)}
//       />
//       <Button text="Add Workout" 
//       small
//       onClick={()=> addNewWorkout()}
//       isLoading = {buttonLoading}
//       isDisabled = {buttonLoading}
//        />
//     </Card>
//   );
// };

// export default AddWorkout;


// src/components/AddWorkout.jsx
import React from 'react';
import styled from 'styled-components';
import TextInput from './TextInput'; // your custom input component
import Button from './Button';
import CircularProgress from '@mui/material/CircularProgress';

const StyledCard = styled.div`
  flex: 1;
  min-width: 200px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.primary};
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const AddWorkout = ({ workout, setWorkout, addNewWorkout, buttonLoading }) => {
  return (
    <StyledCard>
      <Title>Add New Workout</Title>
      <TextInput
        label="Workout"
        textArea
        rows={10}
        placeholder={`Enter in this format:\n\nWorkout Name\nSets\nReps\nWeight\nDuration`}
        value={workout}
        handleChange={(e) => setWorkout(e.target.value)}
      />
      
      <Button
        variant="contained"
        size="small"
        onClick={addNewWorkout}
        disabled={buttonLoading}
      >
        {buttonLoading ? <CircularProgress size={20} /> : "Add Workout"}
      </Button>
    </StyledCard>
  );
};

export default AddWorkout;

