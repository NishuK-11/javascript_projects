
import {
  FitnessCenterRounded,
  LocalFireDepartmentRounded,
  TimelineRounded,
  Work,
} from "@mui/icons-material";

import React from 'react'
import styled from 'styled-components'
import CountsCard from '../components/cards/CountsCard'
import { countsData } from '../utils/data'
import WeeklyStatCards from '../components/cards/WeeklyStatCards'
import CategoryChart from "../components/cards/CategoryChart";
import AddWorkout from "../components/AddWorkout";
import Card from "@mui/material/Card";

import WorkOutCard from "../components/cards/WorkOutCard";


// ✅ iconName → icon component mapping
const iconMap = {
  LocalFireDepartmentRounded: <LocalFireDepartmentRounded sx={{ fontSize: "26px", color: "inherit" }} />,
  FitnessCenterRounded: <FitnessCenterRounded sx={{ fontSize: "26px", color: "inherit" }} />,
  TimelineRounded: <TimelineRounded sx={{ fontSize: "26px", color: "inherit" }} />,
};

const Container = styled.div`
    flex: 1;
    display: flex;
    height:100%;
    justify-content: center;
    padding: 22px 0px;
    overflow-y:scroll;
`
const Wrapper = styled.div`
    flex:1;
    max-width: 1400px;
    display: flex;
    flex-direction: column;
    gap: 22px;
    @media (max-width: 768px) {
        gap:12px;
    }
`
const Title = styled.h1`
    font-size:22px;
    color: ${({ theme }) => theme.text_primary};
    font-weight: 500;
`
const FlexWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap:22px;
    padding: 0 16px;
    @media (max-width: 768px) {
        gap:12px;
    }
`
const Section = styled.div`
    display: flex;
    display: flex;
    flex-direction: column;
    gap:22px;
    padding: 0 16px;
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 12px;
    }
`

const CardWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content:center;
    margin-bottom:100px;
    @media (max-width: 768px) {
        gap: 12px;
    }
`

const Dashboard = () => {
  const [workout, setWorkout] = React.useState("");
    const data = {
    totalCaloriesBurnt: 13500,
    totalWorkouts: 6,
    avgCaloriesBurntPerWorkout: 2250,
    totalWeeksCaloriesBurned:{
        weeks:["17th","18th","19th","20th","21st","22nd"],
        caloriesBurned:[15000, 16000, 17000, 18000, 19000, 20000]
    },
    pieChartData: [
        {
            id:0,
            value:6000,
            label:"Legs",
        },
        {
            id:1,
            value:4000,
            label:"Hands",
        },
        {
            id:2,
            value:3000,
            label:"Back",
        },
        {
            id:3,
            value:1500,
            label:"Chest",
        },
        {
            id:4,
            value:2500,
            label:"Shoulders",
        },
        {
            id:5,
            value:3000,
            label:"ABS",
        },
        {
            id:6,
            value:2000,
            label:"Arms",
        }
    ]
}

  return (
    <Container>
      <Wrapper>
        <Title>Dashboard</Title>
        <FlexWrap>
            {countsData.map((item)=>(
                <CountsCard
              key={item.key}
              item={{
                ...item,
                icon: iconMap[item.iconName], // ✅ inject real icon component here
              }}
              data={data}
            />
          ))}
        </FlexWrap>
        <FlexWrap>
            <WeeklyStatCards data={data} />
            <CategoryChart data = {data} />

            <AddWorkout workout={workout} setWorkout={setWorkout} />
        </FlexWrap>
        <Section>
          <Title>Todays Workouts</Title>
          <CardWrapper>
            <WorkOutCard />
          </CardWrapper>
        </Section>
      </Wrapper>
    </Container>
  )
}

export default Dashboard

