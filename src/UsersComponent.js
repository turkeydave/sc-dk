import { useState } from 'react';
import { useUsers  } from './userContext.js';
import logo from './logo.svg';
import './App.css';

export const UsersComponent = () => {
    const { dispatch, state, fetchUsers } = useUsers();
    const [sortDirection, setSortDirection] = useState('asc');
    
    const handleClick = () => {
        fetchUsers();
    }
    
    const sortData = () => {
      const newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
      setSortDirection(newSortDirection);
      dispatch({ type: 'SORT', payload: {sortDirection: newSortDirection}});
    };
 
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
          <div><button onClick={sortData}>Sort</button></div>
        { state.users.length > 0 && (
          <div data-testid='results'>
              <ul>
                { state.users.map((user) => <li key={user.id}>{user.firstName} - {user.lastName}</li>) }  
              </ul>
          </div>
          )}
        </div>
      </>
    );
  };