import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import theme from './theme';

import CovidDataStore from './store/CovidData';

import Dashboard from './components/Dashboard';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(p) => p.theme.colors.darkGrey};
    margin: 0;
    padding: 0;
    font-family: ${(p) => p.theme.typography.fontFamily};
    font-size: ${(p) => p.theme.typography.fontSize};
    color: ${(p) => p.theme.typography.color};
    font-weight: ${(p) => p.theme.typography.fontWeight};
  }
  * {
    box-sizing: border-box;
  }
`;

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <CovidDataStore>
        <Dashboard />
      </CovidDataStore>
    </ThemeProvider>
  );
}
