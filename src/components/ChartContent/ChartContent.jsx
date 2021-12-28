import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { findByCountry, filterByRange } from '../../utils/covidData';
import { getTimestamp, endOf, addDays, initDate } from '../../utils/date';

import ChartOptions from '../ChartOptions';
import Chart from '../Chart';

const initialEnDate = getTimestamp(endOf(initDate()));
const initialStartDate = getTimestamp(addDays(initialEnDate, -30));

const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr 7fr;
  width: 100%;
  height: 100%;
  padding: 64px 32px;
`;

function ChartContent({ casesByCountry, totalCases, selectedCountry }) {
  const [options, setOptions] = React.useState({
    range: [initialStartDate, initialEnDate],
  });

  const chartData = React.useMemo(
    () =>
      selectedCountry
        ? findByCountry(casesByCountry, selectedCountry).cases
        : totalCases,
    [casesByCountry, totalCases, selectedCountry]
  );

  const rangeChartData = React.useMemo(
    () => filterByRange(chartData, options.range),
    [chartData, options.range]
  );

  return (
    <Container>
      <ChartOptions options={options} setOptions={setOptions} />
      <Chart data={rangeChartData} />
    </Container>
  );
}

ChartContent.propTypes = {
  selectedCountry: PropTypes.string,
  casesByCountry: PropTypes.arrayOf(
    PropTypes.shape({
      country: PropTypes.string.isRequired,
      cases: PropTypes.arrayOf(
        PropTypes.shape({
          confirmed: PropTypes.number.isRequired,
          recovered: PropTypes.number.isRequired,
          death: PropTypes.number.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  totalCases: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      confirmed: PropTypes.number.isRequired,
      recovered: PropTypes.number.isRequired,
      death: PropTypes.number.isRequired,
    })
  ).isRequired,
};

ChartContent.defaultProps = {
  selectedCountry: '',
};

export default ChartContent;
