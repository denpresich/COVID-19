import React from 'react';
import PropTypes from 'prop-types';

import useCovidData from '../hooks/useCovidData';

const Context = React.createContext(null);

function CovidStore({ children }) {
  const [loading, loaded, data] = useCovidData();

  const value = React.useMemo(
    () => ({
      loading,
      loaded,
      data,
    }),
    [loading, loaded, data]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

CovidStore.Context = Context;

CovidStore.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CovidStore;
