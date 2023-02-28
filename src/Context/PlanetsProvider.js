import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

export default function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  const api = async () => {
    const url = 'https://swapi.dev/api/planets';
    const fetchApi = await fetch(url);
    const { results } = await fetchApi.json();
    setPlanets(results);
  };

  useEffect(() => {
    api();
  }, []);

  const context = useMemo(() => ({
    planets,
  }), [planets]);

  return (
    <PlanetsContext.Provider value={ context }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
