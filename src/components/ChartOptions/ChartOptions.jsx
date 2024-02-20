import React from 'react';
import PropTypes from 'prop-types';

import { DAY } from '../../constants/date';

import { formatDate } from '../../utils/date';

import Range from './Range';

function ChartOptions({ startDate, endDate, options, setOptions }) {
  return (
    <Range
      min={startDate}
      max={endDate}
      step={DAY}
      value={options.range}
      onChange={(range) => setOptions({ ...options, range })}
      pushable={false}
      allowCross={false}
      formatTooltip={(value) => formatDate(value, 'DD.MM.YYYY')}
    />
  );
}

ChartOptions.propTypes = {
  startDate: PropTypes.number.isRequired,
  endDate: PropTypes.number.isRequired,
  options: PropTypes.shape({
    range: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
  setOptions: PropTypes.func.isRequired,
};

export default ChartOptions;
