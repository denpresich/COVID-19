import React from 'react';
import styled from 'styled-components';

import Typography from '../Library/Typography';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  border-top: 1px solid ${(p) => p.theme.colors.grey};
`;

const StyledTypography = styled(Typography)`
  color: ${(p) => p.theme.colors.grey};
`;

const Link = styled.a`
  color: #4285f4;
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
`;

function AppInfo() {
  return (
    <Container>
      <StyledTypography>
        Data source:{' '}
        <Link
          target="_blank"
          href="https://github.com/CSSEGISandData/COVID-19"
          rel="noreferrer"
        >
          COVID-19 Data Repository
        </Link>
      </StyledTypography>
      <StyledTypography>
        <Link
          target="_blank"
          href="https://github.com/denpresich/COVID-19/issues"
          rel="noreferrer"
        >
          Report an issue
        </Link>
      </StyledTypography>
    </Container>
  );
}

export default AppInfo;
