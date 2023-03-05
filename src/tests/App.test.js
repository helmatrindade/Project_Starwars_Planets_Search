import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData';
import userEvent from '@testing-library/user-event';


describe('Teste Toda a aplicação', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(
      () => Promise.resolve({
        json: () => testData, 
      })
    )
  });

  test('Verifica se os inputs e buttons são renderizados corretamnete na tela', async () => {
    render(<App />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      const linhas = screen.queryAllByTestId('planet-name');
      expect(linhas).toHaveLength(10);
    })

    const inputPlanet = screen.getByTestId('name-filter');
    userEvent.type(inputPlanet, 'Al')

    const coluna = screen.getByTestId('column-filter');
    const condicao = screen.getByTestId('comparison-filter');
    const value = screen.getByTestId('value-filter');
    const filtrar = screen.getByTestId('button-filter');
    const removerTodos = screen.getByTestId('button-remove-filters');

    userEvent.selectOptions(coluna, 'population')
    userEvent.selectOptions(condicao, 'maior que')
    userEvent.type(value, '5000')
    userEvent.click(filtrar)

    const botaoRemover = screen.getByRole('button', {name: /X/i});
    expect(botaoRemover).toBeInTheDocument();
    userEvent.click(botaoRemover);

    userEvent.selectOptions(coluna, 'diameter')
    userEvent.selectOptions(condicao, 'menor que')
    userEvent.type(value, '5100')
    userEvent.click(filtrar)

    const botaoX = screen.getByRole('button', {name: /X/i});
    userEvent.click(botaoX);

    userEvent.selectOptions(coluna, 'surface_water')
    userEvent.selectOptions(condicao, 'igual a')
    userEvent.type(value, '40')
    userEvent.click(filtrar)

  
    userEvent.click(removerTodos)

    expect(inputPlanet).toBeInTheDocument();
    expect(coluna).toBeInTheDocument();
    expect(condicao).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(filtrar).toBeInTheDocument();
    expect(removerTodos).toBeInTheDocument();
  });

  it("testa o renderização do selectedFilter", async () => {
    render(<App />);

    const coluna = screen.getByTestId("column-filter")
    const condicao = screen.getByTestId("comparison-filter")
    const value = screen.getByTestId("value-filter")

    userEvent.selectOptions(coluna, "surface_water")
    userEvent.selectOptions(condicao, "menor que")
    userEvent.type(value, "10")

    const button = screen.getByTestId("button-filter")
    userEvent.click(button)

    await waitFor(() => {
      expect(screen.getByTestId('filter')).toBeInTheDocument()
    })
    expect(screen.getByTestId('filter')).toHaveTextContent("surface_water")

    userEvent.selectOptions(coluna, "diameter")
    userEvent.selectOptions(condicao, "igual a")
    userEvent.type(value, "12500")

    userEvent.click(button)

    await waitFor(() => {
      expect(screen.getAllByTestId('filter')).toHaveLength(2)
      expect(screen.getAllByTestId('filter')[0]).toHaveTextContent("surface_water") 
      expect(screen.getAllByTestId('filter')[1]).toHaveTextContent("diameter")
    })    

    userEvent.selectOptions(coluna, "population")
    userEvent.selectOptions(condicao, "maior que")
    userEvent.type(value, "100000")

    userEvent.click(button)

    await waitFor(() => {
      expect(screen.getAllByTestId('filter')).toHaveLength(3)
      expect(screen.getAllByTestId('filter')[0]).toHaveTextContent("surface_water") 
      expect(screen.getAllByTestId('filter')[1]).toHaveTextContent("diameter")
      expect(screen.getAllByTestId('filter')[2]).toHaveTextContent("population")
    })

    const btnX = screen.getAllByRole('button', {name: /X/i})
    userEvent.click(btnX[0])
    
    await waitFor(() => {
      expect(screen.getAllByTestId('filter')).toHaveLength(2)
      expect(screen.getAllByTestId('filter')[0]).toHaveTextContent("diameter") 
      expect(screen.getAllByTestId('filter')[1]).toHaveTextContent("population")
    })

    userEvent.click(btnX[1])
  });
});

