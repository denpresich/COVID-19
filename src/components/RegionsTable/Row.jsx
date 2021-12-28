import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { formatNumber } from '../../utils/number';

import Typography from '../Library/Typography';
import ArrowUp from '../Svg/ArrowUp';

const Cell = styled.div`
  padding: 16px 8px;
`;

const NumberCell = styled(Cell)`
  text-align: right;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  cursor: pointer;
  border-bottom: 1px solid ${(p) => p.theme.colors.grey};
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  background-color: ${(p) =>
    p.active ? 'rgba(255, 255, 255, 0.05)' : 'inherit'};
`;

const ConfirmedTypography = styled(Typography)`
  color: ${(p) => p.theme.colors.warning};
`;

const RecoveredTypography = styled(Typography)`
  color: ${(p) => p.theme.colors.success};
`;

const DeathTypography = styled(Typography)`
  color: ${(p) => p.theme.colors.failure};
`;

function Row({ countryCase, selected, onSelect }) {
  const handleRowClick = React.useCallback(
    () => onSelect(selected ? null : countryCase.country),
    [onSelect, countryCase, selected]
  );

  return (
    <Wrapper onClick={handleRowClick} active={selected}>
      <Cell>
        <Typography>{countryCase.country}</Typography>
      </Cell>
      <NumberCell>
        <ConfirmedTypography>
          {formatNumber(countryCase.confirmed)}
        </ConfirmedTypography>
        <ConfirmedTypography>
          {countryCase.confirmedChange ? (
            <>
              <ArrowUp size={10} /> {formatNumber(countryCase.confirmedChange)}
            </>
          ) : (
            '-'
          )}
        </ConfirmedTypography>
      </NumberCell>
      <NumberCell>
        <RecoveredTypography>
          {formatNumber(countryCase.recovered)}
        </RecoveredTypography>
        <RecoveredTypography>
          {countryCase.recoveredChange ? (
            <>
              <ArrowUp size={10} /> {formatNumber(countryCase.recoveredChange)}
            </>
          ) : (
            '-'
          )}
        </RecoveredTypography>
      </NumberCell>
      <NumberCell>
        <DeathTypography>{formatNumber(countryCase.death)}</DeathTypography>
        <DeathTypography>
          {countryCase.deathChange ? (
            <>
              <ArrowUp size={10} /> {formatNumber(countryCase.deathChange)}
            </>
          ) : (
            '-'
          )}
        </DeathTypography>
      </NumberCell>
    </Wrapper>
  );
}

Row.propTypes = {
  countryCase: PropTypes.shape({
    country: PropTypes.string,
    confirmed: PropTypes.number,
    confirmedChange: PropTypes.number,
    recovered: PropTypes.number,
    recoveredChange: PropTypes.number,
    death: PropTypes.number,
    deathChange: PropTypes.number,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.bool,
};

Row.defaultProps = {
  selected: false,
};

export default Row;
