import React from 'react';
import PropTypes from 'prop-types';

import Row from './Row';

function Body({ cases, selectedCountry, onSelect }) {
  return cases.map((countryCase) => (
    <Row
      key={countryCase.country}
      countryCase={countryCase}
      selected={selectedCountry === countryCase.country}
      onSelect={onSelect}
    />
  ));
}

Body.propTypes = {
  cases: PropTypes.arrayOf(
    PropTypes.shape({
      country: PropTypes.string,
      confirmed: PropTypes.number,
      confirmedChange: PropTypes.number,
      recovered: PropTypes.number,
      recoveredChange: PropTypes.number,
      death: PropTypes.number,
      deathChange: PropTypes.number,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedCountry: PropTypes.string,
};

Body.defaultProps = {
  selectedCountry: null,
};

export default Body;
