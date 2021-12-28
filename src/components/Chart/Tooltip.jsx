import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Typography from '../Library/Typography';

import { formatDate } from '../../utils/date';
import { formatNumber } from '../../utils/number';

const TooltipWrapper = styled.div`
  padding: 8px;
  border: 1px solid rgb(25, 25, 25);
  border-radius: 12;
  background-color: rgba(25, 25, 25, 0.9);
`;

const TooltipItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 8px;
  :before {
    content: '';
    width: 8px;
    height: 8px;
    background-color: ${(p) => p.theme.colors[p.color]};
  }
`;

function ChartTooltip({ payload }) {
  const [lineData] = payload;

  const date = lineData?.payload?.date || '';
  const confirmedCount = lineData?.payload?.confirmed || 0;
  const recoveredCount = lineData?.payload?.recovered || 0;
  const deathCount = lineData?.payload?.death || 0;

  return (
    <TooltipWrapper>
      <Typography weight={600}>{formatDate(date, 'DD.MM.YYYY')}</Typography>
      <TooltipItem color="warning">
        <Typography>Confirmed: {formatNumber(confirmedCount)}</Typography>
      </TooltipItem>
      <TooltipItem color="success">
        <Typography>Recovered: {formatNumber(recoveredCount)}</Typography>
      </TooltipItem>
      <TooltipItem color="failure">
        <Typography>Death: {formatNumber(deathCount)}</Typography>
      </TooltipItem>
    </TooltipWrapper>
  );
}

ChartTooltip.defaultProps = {
  payload: [
    { payload: { date: '', count: 0 } },
    { payload: { date: '', count: 0 } },
    { payload: { date: '', count: 0 } },
  ],
};

ChartTooltip.propTypes = {
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      payload: PropTypes.shape({
        date: PropTypes.string,
        count: PropTypes.number,
      }).isRequired,
    }).isRequired
  ),
};

export default ChartTooltip;
