
import {
  FitnessCenterRounded,
  LocalFireDepartmentRounded,
  TimelineRounded,
} from "@mui/icons-material";

import React, { useEffect } from 'react'
import styled from 'styled-components'
import CountsCard from '../components/cards/CountsCard'
import { countsData } from '../utils/data'
import WeeklyStatCards from '../components/cards/WeeklyStatCards'
import CategoryChart from "../components/cards/CategoryChart";
import WorkOutCard from "../components/cards/WorkOutCard";
import AddWorkout from "../components/AddWorkout";
import {addWorkout, getDashboardDetails,getWorkouts} from "../api";
import { useState } from "react";
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
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [todaysWorkouts, setTodaysWorkouts] = useState([]);
  const [workout, setWorkout] = useState(`#Legs
-Back Squat
-5 setsX15 reps
-30 kg
-10 min`);

  const dashboardData = async () => {
    setLoading(true);
    const token = localStorage.getItem("fittrack-app-token");
    await getDashboardDetails(token).then((res) => {
      setData(res.data);
      setLoading(false);
    });
  };

  const getTodaysWorkout = async () => {
    setLoading(true);
    const token = localStorage.getItem("fittrack-app-token");
    await getWorkouts(token, "").then((res) => {
      setTodaysWorkouts(res?.data?.todaysWorkouts || []);
      setLoading(false);
    });
  };

  const addNewWorkout = async () => {
    setButtonLoading(true);
    const token = localStorage.getItem("fittrack-app-token");
    await addWorkout(token, { workoutString: workout })
      .then(() => {
        dashboardData();
        getTodaysWorkout();
        setButtonLoading(false);
      })
      .catch((err) => {
        alert(err);
        setButtonLoading(false);
      });
  };

  useEffect(() => {
    dashboardData();
    getTodaysWorkout();
  }, []);

  useEffect(() => {
    dashboardData();
    getTodaysWorkout();
  }, []);
  return (
    <Container>
      <Wrapper>
        <Title>Dashboard</Title>
        <FlexWrap>
          {countsData.map((item) => (
            <CountsCard item={{ ...item, icon: iconMap[item.iconName] }} data={data} />
          ))}
        </FlexWrap>

        <FlexWrap>
          <WeeklyStatCards data={data} />
          <CategoryChart data={data} />
          <AddWorkout
            workout={workout}
            setWorkout={setWorkout}
            addNewWorkout={addNewWorkout}
            buttonLoading={buttonLoading}
          />
        </FlexWrap>

        <Section>
          <Title>Todays Workouts</Title>
          <CardWrapper>
            {todaysWorkouts.map((workout) => (
              <WorkOutCard workout={workout} />
            ))}
          </CardWrapper>
        </Section>
      </Wrapper>
    </Container>
  );
};

export default Dashboard;
