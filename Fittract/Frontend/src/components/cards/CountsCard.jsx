import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  flex: 1;
  min-width: 200px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  display: flex;
  gap: 6px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  @media (max-width: 768px) {
    gap: 6px;
  }
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.primary};
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Value = styled.div`
  font-weight: 600;
  font-size: 32px;
  display: flex;
  align-items: end;
  gap: 8px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

const Unit = styled.span`
  font-size: 14px;
  margin-bottom: 8px;
`;

const Span = styled.span`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
  color: ${({ positive, theme }) => (positive ? theme.green : theme.red)};
`;

const Icon = styled.div`
  height: fit-content;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  ${({ color, bg }) => `
    background: ${bg};
    color: ${color};
  `}
`;

const Desc = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 6px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const CountsCard = ({ item, data }) => {
  const value = data?.[item.key];

  return (
    <Card>
      <Left>
        <Title>{item.name}</Title>
        <Value>
          {value !== undefined ? value.toFixed(2) : '0.00'}
          <Unit>{item.unit}</Unit>
          <Span positive={true}>(+10%)</Span>
        </Value>
        <Desc>{item.desc}</Desc>
      </Left>
      <Icon color={item.color} bg={item.lightColor}>{item.icon}</Icon>
    </Card>
  );
};

export default CountsCard;
