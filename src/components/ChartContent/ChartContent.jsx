import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { findByCountry, filterByRange } from '../../utils/covidData';
import { getTimestamp, initDate, addDays } from '../../utils/date';

import ChartOptions from '../ChartOptions';
import Chart from '../Chart';

function getFirstAvailableDate(data) {
  const dates = data.map(({ date }) => getTimestamp(initDate(date)));

  return dates.reduce(
    (acc, date) => (date < acc ? date : acc),
    Number.MAX_VALUE
  );
}

function getLastAvailableDate(data) {
  const dates = data.map(({ date }) => getTimestamp(initDate(date)));

  return dates.reduce(
    (acc, date) => (date > acc ? date : acc),
    Number.MIN_VALUE
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr 7fr;
  width: 100%;
  height: 100%;
  padding: 64px 32px;
`;

function ChartContent({ casesByCountry, totalCases, selectedCountry }) {
  const chartData = React.useMemo(
    () =>
      selectedCountry
        ? findByCountry(casesByCountry, selectedCountry).cases
        : totalCases,
    [casesByCountry, totalCases, selectedCountry]
  );

  const [options, setOptions] = React.useState({
    range: [
      getTimestamp(addDays(getLastAvailableDate(chartData), -90)),
      getLastAvailableDate(chartData),
    ],
  });

  const rangeChartData = React.useMemo(
    () => filterByRange(chartData, options.range),
    [chartData, options.range]
  );

  const startDate = React.useMemo(
    () => getFirstAvailableDate(chartData),
    [chartData]
  );

  const endDate = React.useMemo(
    () => getLastAvailableDate(chartData),
    [chartData]
  );

  return (
    <Container>
      <ChartOptions
        startDate={startDate}
        endDate={endDate}
        options={options}
        setOptions={setOptions}
      />
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
