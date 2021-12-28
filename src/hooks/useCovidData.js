import React from 'react';

import { aggregateCases, aggregateTotal } from '../utils/covidData';

import {
  loadConfirmedCases,
  loadRecoveredCases,
  loadDeathsCases,
} from '../api/covidData';

import reducer, { initialState, ActionTypes } from '../reducers/covidData';

const loadCovidData = () =>
  Promise.all([loadConfirmedCases(), loadRecoveredCases(), loadDeathsCases()]);

function useCovidData() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    dispatch({ type: ActionTypes.SET_LOADING });

    loadCovidData().then((data) => {
      const [confirmedCases, recoveredCases, deathCases] = data;

      dispatch({
        type: ActionTypes.SET_DATA,
        payload: {
          confirmedCases,
          recoveredCases,
          deathCases,
        },
      });

      dispatch({ type: ActionTypes.SET_LOADED });
    });
  }, []);

  const dataByCountry = React.useMemo(
    () =>
      aggregateCases(
        state.confirmedCases,
        state.recoveredCases,
        state.deathCases
      ),
    [state.confirmedCases, state.recoveredCases, state.deathCases]
  );

  const totalData = React.useMemo(
    () => aggregateTotal(dataByCountry),
    [dataByCountry]
  );

  return [
    state.loading,
    state.loaded,
    { byCountry: dataByCountry, total: totalData },
  ];
}

export default useCovidData;
