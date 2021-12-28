import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { formatNumber } from '../../utils/number';

import Typography from '../Library/Typography';
import ArrowUp from '../Svg/ArrowUp';

const TitleTypography = styled(Typography)`
  font-size: 12px;
`;

const CountTypography = styled(Typography)`
  font-size: 18px;
  color: ${(p) => p.color};
`;

const ChangeCountTypography = styled(Typography)`
  font-size: 12px;
  color: ${(p) => p.color};
`;

function InfoItem({ title, count, changeCount, color }) {
  return (
    <div>
      <TitleTypography>{title}</TitleTypography>
      <CountTypography color={color}>{formatNumber(count)}</CountTypography>
      <ChangeCountTypography color={color}>
        {changeCount ? (
          <>
            <ArrowUp size={10} /> {formatNumber(changeCount)}
          </>
        ) : (
          '-'
        )}
      </ChangeCountTypography>
    </div>
  );
}

InfoItem.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  changeCount: PropTypes.number.isRequired,
  color: PropTypes.string,
};

InfoItem.defaultProps = {
  color: '#fff',
};

export default InfoItem;
