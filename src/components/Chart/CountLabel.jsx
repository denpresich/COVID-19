import React from 'react';
import PropTypes from 'prop-types';
import theme from '../../theme';

import { formatShortNumber } from '../../utils/number';

import Text from './Text';

function CountLabel({ x, y, payload }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <Text x={-40} fill={theme.colors.grey}>
        {formatShortNumber(payload.value)}
      </Text>
    </g>
  );
}

CountLabel.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  payload: PropTypes.shape({
    value: PropTypes.number,
  }),
};

CountLabel.defaultProps = {
  x: 0,
  y: 0,
  payload: { value: 0 },
};

export default CountLabel;
