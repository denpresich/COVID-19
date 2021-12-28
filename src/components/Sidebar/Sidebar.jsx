import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getTotalInfo } from '../../utils/covidData';

import TotalInfo from '../TotalInfo';
import RegionsTable from '../RegionsTable';
import AppInfo from './AppInfo';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 480px;
  max-width: 480px;
  border-right: 1px solid ${(p) => p.theme.colors.grey};
`;

function Sidebar({
  casesByCountry,
  totalCases,
  selectedCountry,
  setSelectedCountry,
}) {
  const totalInfo = React.useMemo(() => getTotalInfo(totalCases), [totalCases]);

  const handleCountrySelect = React.useCallback(
    (country) => setSelectedCountry(country),
    [setSelectedCountry]
  );

  return (
    <Container>
      <TotalInfo
        confirmed={totalInfo.confirmed}
        confirmedChange={totalInfo.confirmedChange}
        recovered={totalInfo.recovered}
        recoveredChange={totalInfo.recoveredChange}
        death={totalInfo.death}
        deathChange={totalInfo.deathChange}
      />
      <RegionsTable
        casesByCountry={casesByCountry}
        selectedCountry={selectedCountry}
        onSelect={handleCountrySelect}
      />
      <AppInfo />
    </Container>
  );
}

Sidebar.propTypes = {
  selectedCountry: PropTypes.string,
  casesByCountry: PropTypes.arrayOf(
    PropTypes.shape({
      country: PropTypes.string.isRequired,
      cases: PropTypes.arrayOf(
        PropTypes.shape({
          confirmed: PropTypes.number.isRequired,
          recovered: PropTypes.number.isRequired,
          death: PropTypes.number.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  totalCases: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      confirmed: PropTypes.number.isRequired,
      recovered: PropTypes.number.isRequired,
      death: PropTypes.number.isRequired,
    })
  ).isRequired,
  setSelectedCountry: PropTypes.func.isRequired,
};

Sidebar.defaultProps = {
  selectedCountry: '',
};

export default Sidebar;
