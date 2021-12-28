import React from 'react';
import styled from 'styled-components';
import CovidDataStore from '../store/CovidData';

import Typography from './Library/Typography';

import Sidebar from './Sidebar';
import ChartContent from './ChartContent';

const Container = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

const LoadingContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default function Dashboard() {
  const [selectedCountry, setSelectedCountry] = React.useState();
  const { loading, loaded, data } = React.useContext(CovidDataStore.Context);

  return loading || !loaded ? (
    <LoadingContainer>
      <Typography>Loading...</Typography>
    </LoadingContainer>
  ) : (
    <Container>
      <Sidebar
        casesByCountry={data.byCountry}
        totalCases={data.total}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />
      <ChartContent
        casesByCountry={data.byCountry}
        totalCases={data.total}
        selectedCountry={selectedCountry}
      />
    </Container>
  );
}
