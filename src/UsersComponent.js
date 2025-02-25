import { useUsers  } from './userContext.js';
import logo from './logo.svg';
import './App.css';

export const UsersComponent = () => {
    const { state, fetchUsers } = useUsers();
  
    const handleClick = () => {
        fetchUsers();
    }

    return (
      <>
       { state.loading && (
          <div data-testid='loading' className="App">
            <p>Loading users...</p>
            <img src={logo} className="App-logo" alt="logo" />;
          </div>
        )}
      { state.error && (
          <p data-testid='error'>Error: {state.error}</p>
        )}
     
          <div className='content'>
            <div><button onClick={handleClick}>Load Users</button></div>
        { state.users.length > 0 && (
          <div data-testid='results'>
              <ul>
                  {state.users.map((user) => (
                  <li key={user.id}>{user.firstName} - {user.lastName}</li>
                  ))}
              </ul>
          </div>
          )}
        </div>
      </>
    );
  };