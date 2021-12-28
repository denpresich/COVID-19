import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.span``;

function Typography({ children, variant, className }) {
  return (
    <Wrapper className={className} as={variant}>
      {children}
    </Wrapper>
  );
}

Typography.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'div']),
  children: PropTypes.node.isRequired,
};

Typography.defaultProps = {
  className: null,
  variant: 'div',
};

export default Typography;
