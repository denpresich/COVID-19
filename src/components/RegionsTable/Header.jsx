import React from 'react';
import styled from 'styled-components';

import Typography from '../Library/Typography';

const Wrapper = styled.div`
  position: sticky;
  top: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  background-color: ${(p) => p.theme.colors.darkGrey};
  border-bottom: 1px solid ${(p) => p.theme.colors.grey};
  z-index: 1;
`;

const Cell = styled.div`
  padding: 16px 8px;
  font-weight: 600;
`;

const NumberCell = styled(Cell)`
  text-align: right;
`;

function Header() {
  return (
    <Wrapper>
      <Cell>
        <Typography>Country</Typography>
      </Cell>
      <NumberCell>
        <Typography>Confirmed</Typography>
      </NumberCell>
      <NumberCell>
        <Typography>Recovered</Typography>
      </NumberCell>
      <NumberCell>
        <Typography>Deaths</Typography>
      </NumberCell>
    </Wrapper>
  );
}

export default Header;
