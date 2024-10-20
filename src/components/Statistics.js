import React from 'react';
import styled from 'styled-components';

const StatsSection = styled.section`
  display: flex;
  justify-content: space-around;
  padding: 4rem 2rem;
  background-color: #f0f4f8;
`;

const Stat = styled.div`
  text-align: center;
  color: #1d3557;
`;

const Number = styled.h2`
  font-size: 2rem;
  color: #e63946;
`;

const Label = styled.p`
  font-size: 1.2rem;
  color: #457b9d;
`;

const Statistics = () => (
  <StatsSection>
    <Stat>
      <Number>5,000</Number>
      <Label>Funded Startups</Label>
    </Stat>
    <Stat>
      <Number>$600B</Number>
      <Label>Combined Valuation</Label>
    </Stat>
    <Stat>
      <Number>10,000+</Number>
      <Label>Investors</Label>
    </Stat>
  </StatsSection>
);

export default Statistics;