import React, { useContext, useState } from 'react';
import PlanetsContext from '../Context/PlanetsContext';

function Table() {
  const { planets } = useContext(PlanetsContext);

  const [search, setSearch] = useState('');

  const searchPlanets = () => {
    const filtraNome = planets
      .filter((el) => el.name.toUpperCase().includes(search.toUpperCase()));
    return filtraNome;
  };

  return (
    <main>
      <input
        value={ search }
        type="text"
        data-testid="name-filter"
        onChange={ (e) => setSearch(e.target.value) }
      />
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>rotation_period</th>
            <th>orbital_period</th>
            <th>diameter</th>
            <th>climate</th>
            <th>gravity</th>
            <th>terrain</th>
            <th>surface_water</th>
            <th>population</th>
            <th>films</th>
            <th>created</th>
            <th>edited</th>
            <th>url</th>
          </tr>
        </thead>
        <tbody>
          {searchPlanets().map((planet) => (
            <tr key={ planet.name }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default Table;
