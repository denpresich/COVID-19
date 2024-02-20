import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const AlertContainer = styled.div`
  background-color: ${(p) => p.theme.colors.failure};
  padding: 14px 16px;
`;

export default function Alert({ children }) {
  return <AlertContainer>{children}</AlertContainer>;
}

Alert.propTypes = {
  children: PropTypes.element.isRequired,
};
