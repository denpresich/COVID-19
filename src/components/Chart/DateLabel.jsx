import React from 'react';
import PropTypes from 'prop-types';
import theme from '../../theme';

import { formatDate } from '../../utils/date';

import Text from './Text';

function DateLabel({ x, y, payload }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <Text
        x={-30}
        y={0}
        dy={16}
        fill={theme.colors.grey}
        transform="rotate(-35)"
      >
        {formatDate(payload.value, 'DD.MM')}
      </Text>
    </g>
  );
}

DateLabel.defaultProps = {
  x: 0,
  y: 0,
  payload: {},
};

DateLabel.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  payload: PropTypes.objectOf({
    value: PropTypes.string,
  }),
};

export default DateLabel;
