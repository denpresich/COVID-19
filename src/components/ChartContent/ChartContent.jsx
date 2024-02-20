import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { findByCountry, filterByRange } from '../../utils/covidData';
import { getTimestamp, initDate, addDays } from '../../utils/date';

import ChartOptions from '../ChartOptions';
import Chart from '../Chart';
import Alert from '../Alert';

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
  grid-template-rows: auto auto auto 7fr;
  gap: 16px;
  width: 100%;
  height: 100%;
  padding: 32px;
`;

const Section = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 12px;
  width: 100%;
  height: 100%;
`;

const ChartHeader = styled.div`
  display: inline-flex;
  gap: 16px;
  align-items: center;
`;

const ResetButton = styled.button`
  position: relative;
  cursor: pointer;
  height: 24px;
  width: 24px;
  background: none;
  border: none;
  padding: 4px;

  :hover:before,
  :hover:after {
    background-color: ${(p) => p.theme.colors.white};
  }

  :before,
  :after {
    transition: all 0.2s;
    position: absolute;
    content: ' ';
    top: 60%;
    left: 5%;
    height: 12px;
    width: 2px;
    background-color: ${(p) => p.theme.colors.grey};
  }
  :before {
    transform: translate(-50%, -50%) rotate(45deg);
  }
  :after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

const HeadlineOne = styled.h1`
  font-size: 24px;
`;

const HeadlineTwo = styled.h2`
  font-size: 20px;
`;

function ChartContent({
  casesByCountry,
  totalCases,
  selectedCountry,
  resetSelectedCountry,
}) {
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
      <HeadlineOne>COVID-19 Statistics</HeadlineOne>
      <Alert>
        <b>March 10, 2023:</b> The COVID-19 chart is no longer updating after
        the cease of the data collection and reporting of global COVID-19 data
        by Johns Hopkins Coronavirus Resource Center
      </Alert>
      <Section>
        <HeadlineTwo>Date range</HeadlineTwo>
        <ChartOptions
          startDate={startDate}
          endDate={endDate}
          options={options}
          setOptions={setOptions}
        />
      </Section>
      <Section>
        <ChartHeader>
          <HeadlineTwo>
            {selectedCountry ? `World / ${selectedCountry}` : 'World'}
          </HeadlineTwo>
          {selectedCountry ? (
            <ResetButton type="button" onClick={resetSelectedCountry} />
          ) : null}
        </ChartHeader>
        <Chart data={rangeChartData} />
      </Section>
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
  resetSelectedCountry: PropTypes.func.isRequired,
};

ChartContent.defaultProps = {
  selectedCountry: '',
};

export default ChartContent;
