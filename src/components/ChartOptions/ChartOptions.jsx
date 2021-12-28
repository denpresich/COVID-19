import React from 'react';
import PropTypes from 'prop-types';

import { DAY } from '../../constants/date';

import { getTimestamp, endOf, initDate, formatDate } from '../../utils/date';

import Range from './Range';

const startDate = getTimestamp(endOf('01/22/20', 'day'));
const endDate = getTimestamp(endOf(initDate()));

function ChartOptions({ options, setOptions }) {
  return (
    <Range
      min={startDate}
      max={endDate}
      step={DAY * 10}
      value={options.range}
      onChange={(range) => setOptions({ ...options, range })}
      pushable={false}
      allowCross={false}
      formatTooltip={(value) => formatDate(value, 'DD.MM')}
    />
  );
}

ChartOptions.propTypes = {
  options: PropTypes.shape({
    range: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
  setOptions: PropTypes.func.isRequired,
};

export default ChartOptions;
