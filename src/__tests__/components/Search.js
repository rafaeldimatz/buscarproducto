import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../../components/Search';


test('search products', () => {
  //arrage
  render(<Search/>);
  const input = screen.getByTestId("inputsearch");
  const a = screen.getByTestId("a");

  const inputValue="Licuadora"
  //Act
  input.value=inputValue;
  fireEvent.click(a)

  //Result
  expect(input.value).toBe(inputValue)

});