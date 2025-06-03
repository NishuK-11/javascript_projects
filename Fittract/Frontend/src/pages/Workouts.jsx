import React from 'react'
import styled from 'styled-components'
import WorkOutCard from '../components/cards/WorkOutCard'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

const Container = styled.div`
  flex: 1;
  display: flex;
  height: 100%;
  justify-content: center;
  padding: 22px 0px;
  overflow-y: scroll;
`
const Wrapper = styled.div`
  flex: 1;
  max-width: 1600px;
  display: flex;
  gap: 22px;
  padding: 0 16px;
  @media (max-width: 768px) {
    gap: 12px;
    flex-direction: column;
  }
`
const Left = styled.div`
  flex: 0.2;
  height: fit-content;
  padding: 18px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
`
const Right = styled.div`
  flex:1;
`
const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.primary};
  @media (max-width: 768px) {
    font-size: 14px;
  }
`
const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding: 0 16px;
  @media (max-width: 768px) {
    gap: 12px;
  }
`
const SecTitle = styled.div`
  font-size:22px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
`
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-bottom: 100px;
  @media (max-width: 768px) {
    gap: 12px;
  }
`
const Workouts = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Title>Select Date</Title>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar />
          </LocalizationProvider>
        </Left>
        <Right>
          <Section>
            <SecTitle>Todays Workouts</SecTitle>
            <CardWrapper>
              {/* Replace with actual workout cards */}
              <WorkOutCard />
              <WorkOutCard />
              <WorkOutCard />
              <WorkOutCard />
              <WorkOutCard />
              <WorkOutCard />
            </CardWrapper>
          </Section>
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Workouts
