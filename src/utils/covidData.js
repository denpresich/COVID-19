import { getTimestamp, initDate } from './date';
import { keyBy } from './array';

export const formatCsvItem = (item) => {
  const keyFields = ['Province/State', 'Country/Region', 'Lat', 'Long'];

  const data = {
    cases: [],
  };

  Object.keys(item).forEach((key) => {
    const value = item[key];

    if (key === 'Country/Region') {
      data.country = value;
      return;
    }

    if (!keyFields.includes(key)) {
      data.cases.push({
        date: key,
        count: Number(value), // convert String to Number
      });
    }
  });

  return data;
};

export const formatCsvData = (data) => data.map(formatCsvItem);

export const filterByRange = (cases, range) => {
  const [startDate, endDate] = range;

  return cases.filter((item) => {
    const date = getTimestamp(initDate(item.date));

    return date >= startDate && date <= endDate;
  });
};

export const getTotalInfo = (cases) => {
  if (!cases.length) {
    return {
      confirmed: 0,
      recovered: 0,
      death: 0,
      confirmedChange: 0,
      recoveredChange: 0,
      deathChange: 0,
    };
  }

  const lastCase = cases[cases.length - 1];
  const preLastCase = cases[cases.length - 2];

  return {
    confirmed: lastCase.confirmed,
    recovered: lastCase.recovered,
    death: lastCase.death,
    confirmedChange: lastCase.confirmed - preLastCase.confirmed,
    recoveredChange: lastCase.recovered - preLastCase.recovered,
    deathChange: lastCase.death - preLastCase.death,
  };
};

export const findByCountry = (cases, country) =>
  cases.find((item) => item.country === country);

export const aggregateTotal = (countries) => {
  const aggregatedCases = {};

  countries.forEach(({ cases }) => {
    cases.forEach(({ date, confirmed, recovered, death }) => {
      if (!aggregatedCases[date]) {
        aggregatedCases[date] = {
          date,
          confirmed: 0,
          recovered: 0,
          death: 0,
        };
      }

      aggregatedCases[date] = {
        ...aggregatedCases[date],
        confirmed: aggregatedCases[date].confirmed + confirmed,
        recovered: aggregatedCases[date].recovered + recovered,
        death: aggregatedCases[date].death + death,
      };
    });
  });

  return Object.values(aggregatedCases);
};

export const aggregateCases = (confirmedCases, recoveredCases, deathCases) => {
  const confirmedByCountry = keyBy(confirmedCases, 'country');
  const recoveredByCountry = keyBy(recoveredCases, 'country');
  const deathByCountry = keyBy(deathCases, 'country');

  const countries = Object.keys(confirmedByCountry);

  return countries.map((country) => {
    const confirmed = confirmedByCountry[country]?.cases || [];
    const recovered = recoveredByCountry[country]?.cases || [];
    const death = deathByCountry[country]?.cases || [];

    const cases = confirmed.map(({ date, count }, index) => {
      const recoveredCount = recovered[index]?.count || 0;
      const deathCount = death[index]?.count || 0;

      return {
        date,
        confirmed: count,
        recovered: recoveredCount,
        death: deathCount,
      };
    });

    return {
      country,
      cases,
    };
  });
};

export const composeCountriesTotal = (casesByCountry) =>
  casesByCountry.map(({ country, cases }) => {
    const lastIndex = cases.length - 1;

    const lastCase = cases[lastIndex];
    const preLastCase = cases[lastIndex - 1];

    const { confirmed, recovered, death } = lastCase;

    const confirmedChange = confirmed - preLastCase.confirmed;
    const recoveredChange = recovered - preLastCase.recovered;
    const deathChange = death - preLastCase.death;

    return {
      country,
      confirmed,
      confirmedChange,
      recovered,
      recoveredChange,
      death,
      deathChange,
    };
  });
