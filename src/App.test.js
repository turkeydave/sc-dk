import { render, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from './App';
import userEvent from '@testing-library/user-event';

describe('Main app tests', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('default loading state', () => {
    render(<App />);
    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
    const loading = screen.queryByTestId('loading'); // will return null not throw
    expect(loading).not.toBeInTheDocument();
  }),

  it('clicking the button shows loading and then shows results', () => {
      const mockData = {users: [{ id: 1, firstName: 'Sven', lastName: 'Nys' }, { id: 2, firstName: 'Wout', lastName: 'Van Aert' }]};
      global.fetch = jest.fn().mockResolvedValue({
          ok: true,
          json: () => Promise.resolve(mockData)
        });
  
        render(<App/>);

      const btn = screen.getByRole('button');
      userEvent.click(btn);

      const loading = screen.getByTestId(/Loading/i);
      expect(loading).toBeInTheDocument();
      
      waitFor(()=> expect(screen.getByTestId('results')).toBeVisible());
      
      //screen.debug();
    })
});
