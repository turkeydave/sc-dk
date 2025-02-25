import { render, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import { useEffect } from 'react';
import { UsersProvider, useUsers } from './userContext';

const TestingComponent = () => {
    const { state, fetchUsers } = useUsers();
    
    useEffect(()=> {
        fetchUsers();
    }, [])    

    return (
      <>
        <p data-testid='loading'>Loading: {state.loading}</p>
        { state.error && (
            <p data-testid='error'>Error: {state.error}</p>
        )}
        { state.users.length > 0 && (
            <div data-testid='users'>
                <p >Users count: {state.users.length}</p>
                {
                    state.users.map((user) => (
                        <p key={user.id}>{user.lastName}, {user.firstName}</p>
                    ))
                }
                
            </div>
        )}
      </>
    );
  };

describe('userContext tests', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders usercontext state, with mocked fetch api call - happy path', async () => {
    const mockData = {users: [{ id: 1, firstName: 'Sven', lastName: 'Nys' }, { id: 2, firstName: 'Wout', lastName: 'Van Aert' }]};
    global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockData)
      });

    await act(async () => {
        render(<UsersProvider>
            <TestingComponent/>
        </UsersProvider>)
      });
    
    const loading = screen.getByTestId(/Loading/i);
    expect(loading).toBeInTheDocument();
    
    await waitFor(()=> expect(screen.getByTestId('users')).toBeVisible());
    
    //screen.debug();
  })

  it('renders usercontext state, shows error msg when failed', async () => {
    
    global.fetch = jest.fn().mockResolvedValue({
        ok: false, 
        status: 503,
        json: () => Promise.resolve({ error: "Service unavailable" })
    });

    await act(async () => {
        render(<UsersProvider>
            <TestingComponent/>
        </UsersProvider>)
      });
    
    await waitFor(()=> expect(screen.getByTestId('error')).toBeVisible());
    
    //screen.debug();
  })
});
