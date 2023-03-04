import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { searchPlanets } from '../Componetes/Table';
import PlanetsProvider from '../Context/PlanetsProvider';

// const mockSearchPlanets = [
//   {name: 'Tatooine'},
//   {name: 'Alderaan'},
//   {name: 'Yavin IV'},
//   {name: 'Hoth'}
// ];

describe('Teste Toda a aplicação', () => {
  test('I am your test', () => {
    render(<App />);
    const linkElement = screen.getByText(/Hello, App!/i);
    expect(linkElement).toBeInTheDocument();
  });

  // test('filtra o nome do planeta', () => {
  //   render(
  //     <PlanetsProvider>
  //       <App />
  //     </PlanetsProvider>
  //   );
  
  //   const result = searchPlanets(mockSearchPlanets, 'Yavin IV');
  //   const esperado = 1;
    
  //   expect(result.length).toEqual(esperado);
  // });

});

