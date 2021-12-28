import React from 'react';
import PropTypes from 'prop-types';
import styled, { useTheme } from 'styled-components';

import InfoItem from './InfoItem';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 32px 8px;
  border-bottom: 1px solid ${(p) => p.theme.colors.grey};
`;

function TotalInfo({
  confirmed,
  confirmedChange,
  recovered,
  recoveredChange,
  death,
  deathChange,
}) {
  const theme = useTheme();

  return (
    <Container>
      <InfoItem
        title="Confirmed"
        count={confirmed}
        changeCount={confirmedChange}
        color={theme.colors.warning}
      />
      <InfoItem
        title="Recovered"
        count={recovered}
        changeCount={recoveredChange}
        color={theme.colors.success}
      />
      <InfoItem
        title="Death"
        count={death}
        changeCount={deathChange}
        color={theme.colors.failure}
      />
    </Container>
  );
}

TotalInfo.propTypes = {
  confirmed: PropTypes.number.isRequired,
  confirmedChange: PropTypes.number.isRequired,
  recovered: PropTypes.number.isRequired,
  recoveredChange: PropTypes.number.isRequired,
  death: PropTypes.number.isRequired,
  deathChange: PropTypes.number.isRequired,
};

export default TotalInfo;
