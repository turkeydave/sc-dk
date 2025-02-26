import { useState, useMemo } from 'react';
import { useUsers } from './userContext.js';
import logo from './logo.svg';
import './App.css';

export const UsersComponent = () => {
    const { state, fetchUsers } = useUsers();
    const [sortDirection, setSortDirection] = useState('asc');
    
    const handleClick = () => {
        fetchUsers();
    }

    const sortedUsers = useMemo(() => {
        return [...state.users].sort((a, b) => {
            return sortDirection === 'asc' 
                ? a.lastName.localeCompare(b.lastName)
                : b.lastName.localeCompare(a.lastName);
        });
    }, [state.users, sortDirection]);
    
    const sortData = () => {
        setSortDirection(current => current === 'asc' ? 'desc' : 'asc');
    };
 
    return (
        <>
            {state.loading && (
                <div data-testid='loading' className="App">
                    <p>Loading users...</p>
                    <img src={logo} className="App-logo" alt="logo" />;
                </div>
            )}
            {state.error && (
                <p data-testid='error'>Error: {state.error}</p>
            )}
     
            <div className='content'>
                <div><button onClick={handleClick}>Load Users</button></div>
                <div><button onClick={sortData}>Sort {sortDirection === 'asc' ? '↑' : '↓'}</button></div>
                {sortedUsers.length > 0 && (
                    <div data-testid='results'>
                        <ul>
                            {sortedUsers.map((user) => (
                                <li key={user.id}>{user.firstName} - {user.lastName}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
};