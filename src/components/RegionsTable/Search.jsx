import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  padding: 8px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 12px 8px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.05);
  color: ${(p) => p.theme.colors.grey};
  border: 1px solid ${(p) => p.theme.colors.grey};
`;

const Input = styled.input`
  color: ${(p) => p.theme.colors.grey};
  width: 100%;
  border: none;
  background: none;
  outline: none;
`;

const Clear = styled.div`
  position: relative;
  cursor: pointer;
  height: 16px;
  width: 16px;
  ::before {
    position: absolute;
    left: 50%;
    content: '';
    height: 16px;
    width: 1px;
    background: ${(p) => p.theme.colors.grey};
    transform: rotate(-45deg);
  }
  ::after {
    position: absolute;
    left: 50%;
    content: '';
    height: 16px;
    width: 1px;
    background: ${(p) => p.theme.colors.grey};
    transform: rotate(45deg);
  }
`;

function Search({ value, onChange }) {
  const handleChange = React.useCallback(
    (event) => onChange(event.target.value),
    [onChange]
  );

  const handleClearClick = React.useCallback(() => onChange(''), [onChange]);

  return (
    <Container>
      <InputContainer>
        <Input
          value={value}
          onChange={handleChange}
          placeholder="Search by country"
        />
        {!!value && <Clear onClick={handleClearClick} />}
      </InputContainer>
    </Container>
  );
}

Search.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

Search.defaultProps = {
  value: '',
};

export default Search;
