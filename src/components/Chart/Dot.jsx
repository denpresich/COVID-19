import React from 'react';
import PropTypes from 'prop-types';

import { getDotNumber, shouldShowDot } from '../../utils/chart';

const DOT_GAP = 7;

function Dot({ cx, cy, stroke, points, key }) {
  const dotNumber = getDotNumber(key);
  const showDot = shouldShowDot(dotNumber, points.length, DOT_GAP);

  return showDot ? (
    <circle key={key} cx={cx} cy={cy} r={3} fill={stroke} />
  ) : null;
}

Dot.propTypes = {
  cx: PropTypes.number,
  cy: PropTypes.number,
  stroke: PropTypes.string,
  key: PropTypes.string,
  points: PropTypes.arrayOf(PropTypes.shape({})),
};

Dot.defaultProps = {
  cx: 0,
  cy: 0,
  stroke: '',
  key: '',
  points: [],
};

export default Dot;
