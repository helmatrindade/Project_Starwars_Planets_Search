import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../Context/PlanetsContext';
import '../styles/Table.css';

const options = ['population', 'orbital_period',
  'diameter', 'rotation_period', 'surface_water'];

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

  // estado para as opções da coluna
  const [colunaOption, setColunaOption] = useState(options);

  // estado para receber o array de filtros da função searchPlanets
  const [resultFilter, setResultFilter] = useState([]);

  const handleChange = ({ target: { value } }) => {
    setSearch(value);
  };

  const searchName = () => {
    const filtraNome = planets
      .filter((el) => el.name.toUpperCase().includes(search.toUpperCase()));
    setResultFilter(filtraNome);
  };

  useEffect(() => {
    searchName();
  }, [search]);

  const searchPlanets = (param) => {
    const retorno = (resultFilter.length > 0 ? resultFilter : planets)
      .filter((planet) => {
        if (param) {
          return [param].every((filtro) => {
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
    return retorno;
  };

  const handleClick = (param) => {
    if (param.length === 0) setResultFilter(planets);

    const planetsFiltrado = planets.filter((planet) => {
      const filterArray = param.map((fil) => {
        if (fil.condicao === 'maior que') {
          return +planet[fil.coluna] > +fil.value;
        }
        if (fil.condicao === 'menor que') {
          return +planet[fil.coluna] < +fil.value;
        }
        if (fil.condicao === 'igual a') {
          return +planet[fil.coluna] === +fil.value;
        }
        return false;
      });
      return filterArray.every((fil) => fil === true);
    });
    setResultFilter(planetsFiltrado);
  };

  const handleClickRemove = (param) => {
    const upDate = filtrosSelecionados.filter((f) => f.coluna !== param);
    setFiltrosSelecionados(upDate);
    setColunaOption((prev) => [...prev, param]);

    handleClick(upDate);
  };

  const handleSearch = () => {
    setFiltrosSelecionados([...filtrosSelecionados, inputNumber]);

    const removeColuna = colunaOption
      .filter((filtro) => filtro !== inputNumber.coluna);

    setColunaOption(removeColuna);
    setInputNumber({ coluna: removeColuna[0], condicao: 'maior que', value: '0' });

    setResultFilter(searchPlanets(inputNumber));
  };

  return (
    <main className="Container">
      <div className="allButtons">
        <input
          value={ search }
          type="text"
          data-testid="name-filter"
          onChange={ handleChange }
        />
        <br />
        <select
          data-testid="column-filter"
          value={ inputNumber.coluna }
          onChange={ (e) => setInputNumber({ ...inputNumber, coluna: e.target.value }) }
        >
          {colunaOption.map((coluna) => (
            <option key={ coluna } value={ coluna }>{coluna}</option>
          ))}
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
          onClick={ handleSearch }
        >
          Filtrar
        </button>
        <button
          data-testid="button-remove-filters"
          onClick={ () => {
            setColunaOption(options);
            setResultFilter(planets);
            setFiltrosSelecionados([]);
          } }
        >
          Remover todas filtragens
        </button>
      </div>
      {
        filtrosSelecionados.map((filtro) => (
          <div key={ filtro.coluna } data-testid="filter">
            <span>
              {filtro.coluna}
              {' '}
              {filtro.condicao}
              {' '}
              {filtro.value}
            </span>
            <button
              onClick={ () => handleClickRemove(filtro.coluna) }
            >
              X
            </button>
          </div>
        ))
      }
      <table className="table">
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
          {(resultFilter.length > 0 ? resultFilter : planets).map((planet) => (
            <tr key={ planet.name }>
              <td data-testid="planet-name">{planet.name}</td>
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
