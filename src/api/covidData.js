import {
  confirmedCasesCsvUrl,
  recoveredCasesCsvUrl,
  deathsCasesCsvUrl,
} from '../constants/covidData';

import { parseCsv } from '../utils/csv';
import { formatCsvData } from '../utils/covidData';

const loadCovidCases = (url) =>
  new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => response.text())
      .then(parseCsv)
      .then((data) => {
        const formattedData = formatCsvData(data.data);
        formattedData.pop(); // exclude empty line
        resolve(formattedData);
      })
      .catch((err) => reject(err));
  });

export const loadConfirmedCases = () => loadCovidCases(confirmedCasesCsvUrl);
export const loadRecoveredCases = () => loadCovidCases(recoveredCasesCsvUrl);
export const loadDeathsCases = () => loadCovidCases(deathsCasesCsvUrl);
