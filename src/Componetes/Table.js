import React, { useContext, useState } from 'react';
import PlanetsContext from '../Context/PlanetsContext';

function Table() {
  const { planets } = useContext(PlanetsContext);

  const [search, setSearch] = useState('');
  // estado que controla os três campos. Filtro numerico é composto por três inputs.
  const [inputNumber, setInputNumber] = useState({
    coluna: 'population',
    condicao: 'maior que',
    value: '0',
  });
  // estado para armazenar os arrays de filtros selecionados
  const [filtrosSelecionados, setFiltrosSelecionados] = useState([]);

  const searchPlanets = () => {
    const filtraNome = planets
      .filter((el) => el.name.toUpperCase().includes(search.toUpperCase()))
      .filter((planet) => {
        if (filtrosSelecionados.length > 0) {
          return filtrosSelecionados.every((filtro) => {
            switch (filtro.condicao) {
            case 'maior que':
              return Number(planet[filtro.coluna]) > Number(filtro.value);
            case 'menor que':
              return Number(planet[filtro.coluna]) < Number(filtro.value);
            default:
              return Number(planet[filtro.coluna]) === Number(filtro.value);
            }
          });
        }
        return true;
      });
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
      <br />
      <select
        data-testid="column-filter"
        value={ inputNumber.coluna }
        onChange={ (e) => setInputNumber({ ...inputNumber, coluna: e.target.value }) }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        value={ inputNumber.condicao }
        onChange={ (e) => setInputNumber({ ...inputNumber, condicao: e.target.value }) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        value={ inputNumber.value }
        onChange={ (e) => setInputNumber({ ...inputNumber, value: e.target.value }) }
      />
      <button
        data-testid="button-filter"
        onClick={ () => {
          setFiltrosSelecionados([...filtrosSelecionados, inputNumber]);
        } }
      >
        Filtrar
      </button>
      {
        filtrosSelecionados.map((filtro) => (
          <div key={ filtro.coluna }>
            <span>
              {filtro.coluna}
              {' '}
              {filtro.condicao}
              {' '}
              {filtro.value}
            </span>
          </div>
        ))
      }
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
