import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { sort } from '../../utils/array';
import { composeCountriesTotal } from '../../utils/covidData';

import Search from './Search';
import Header from './Header';
import Body from './Body';

const Wrapper = styled.div`
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${(p) => p.theme.colors.grey};
  }
`;

const filterBySearch = (cases, search) =>
  cases.filter(({ country }) =>
    country.toLowerCase().includes(search.toLowerCase())
  );

function RegionsTable({ casesByCountry, selectedCountry, onSelect }) {
  const [search, setSearch] = React.useState('');
  const [sortState] = React.useState({
    key: 'confirmed',
    direction: 'desc',
  });

  const cases = React.useMemo(
    () => composeCountriesTotal(casesByCountry),
    [casesByCountry]
  );

  const filteredCases = React.useMemo(
    () => (search ? filterBySearch(cases, search) : cases),
    [cases, search]
  );

  const sortedCases = React.useMemo(
    () => sort(filteredCases, sortState),
    [filteredCases, sortState]
  );

  const handleSearchChange = React.useCallback(
    (value) => setSearch(value),
    [setSearch]
  );

  return (
    <Wrapper>
      <Search value={search} onChange={handleSearchChange} />
      <Header />
      <Body
        cases={sortedCases}
        selectedCountry={selectedCountry}
        onSelect={onSelect}
      />
    </Wrapper>
  );
}

RegionsTable.propTypes = {
  casesByCountry: PropTypes.arrayOf(
    PropTypes.shape({
      country: PropTypes.string,
      cases: PropTypes.arrayOf(
        PropTypes.shape({
          date: PropTypes.string,
          confirmed: PropTypes.number,
          recovered: PropTypes.number,
          death: PropTypes.number,
        })
      ),
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedCountry: PropTypes.string,
};

RegionsTable.defaultProps = {
  selectedCountry: null,
};

export default RegionsTable;
