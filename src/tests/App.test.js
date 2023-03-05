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

  test('teste se ao clicar no button de limpar, é removido as filtragens', () => {
    // const filtro = {
    //   coluna: 'population',
    //   condicao: 'maior que',
    //   value: '5000',
    // };

    // const handleClickRemove = jest.fn();

    // render(<App />);

    // // await waitFor(() => {
    // //   expect(global.fetch).toHaveBeenCalledTimes(1);
    // // })

    // const botaoRemover = screen.getByTestId('filter');
    // userEvent.click(botaoRemover)
    
    // expect(handleClickRemove).toHaveBeenCalledWith(filtro.coluna);

    // const filtroRemovido = screen.queryByText(`${filtro.coluna} ${filtro.condicao} ${filtro.value}`);
    // expect(filtroRemovido).toBeNull();

  });


});

