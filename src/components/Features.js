import React from 'react';
import styled from 'styled-components';

const FeaturesSection = styled.section`
  padding: 4rem 2rem;
  background-color: #fff;
`;

const Feature = styled.div`
  margin-bottom: 2rem;
  text-align: center;
  color: #1d3557;
`;

const FeatureTitle = styled.h3`
  font-size: 1.8rem;
  color: #e63946;
`;

const FeatureDescription = styled.p`
  font-size: 1.2rem;
  color: #457b9d;
`;

const Features = () => (
  <FeaturesSection>
    <Feature>
      <FeatureTitle>Comprehensive Support</FeatureTitle>
      <FeatureDescription>We offer end-to-end support for startups from ideation to scaling.</FeatureDescription>
    </Feature>
    <Feature>
      <FeatureTitle>Global Network</FeatureTitle>
      <FeatureDescription>Connect with a global network of entrepreneurs, mentors, and investors.</FeatureDescription>
    </Feature>
    <Feature>
      <FeatureTitle>Access to Capital</FeatureTitle>
      <FeatureDescription>Gain access to a wide pool of investors ready to fund your venture.</FeatureDescription>
    </Feature>
  </FeaturesSection>
);

export default Features;