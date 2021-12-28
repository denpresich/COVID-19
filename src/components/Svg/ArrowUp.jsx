import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Svg = styled.svg`
  transform: rotate(-90deg);
`;

function ArrowUp({ size }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M24 12l-12-9v5h-12v8h12v5l12-9z" fill="currentColor" />
    </Svg>
  );
}

ArrowUp.propTypes = {
  size: PropTypes.number,
};

ArrowUp.defaultProps = {
  size: 24,
};

export default ArrowUp;
