import React, { createContext, useContext, useReducer, useCallback } from 'react';

// Context
export const UsersContext = createContext();

// Initial State
const initialState = {
  users: [],
  loading: false,
  error: null,
  domain: 'USERS',
};

export const actionNames = {
    FETCH_USERS: 'FETCH_USERS_REQUEST',
    FETCH_USERS_SUCCESS: 'FETCH_USERS_SUCCESS',
    FETCH_USERS_FAILURE: 'FETCH_USERS_FAILURE',
    SORT_USERS: 'SORT_USERS'
}

// Reducer
export const usersReducer = (state, action) => {
  switch (action.type) {
    case actionNames.FETCH_USERS:
      return { ...state, loading: true, error: null };
    case actionNames.FETCH_USERS_SUCCESS:
      return { ...state, loading: false, users: action.payload };
    case actionNames.FETCH_USERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case actionNames.SORT_USERS:
      const sorted = action.payload.sortDirection === 'asc' ? 
          [...state.users].sort((a,b) => a.lastName.localeCompare(b.lastName)) : [...state.users].sort((a,b) => b.lastName.localeCompare(a.lastName));
      return { ...state, loading: false, users: sorted };  
    default:
      return state;
  }
};

// Context Provider
export const UsersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(usersReducer, initialState);
  const currentDomain = state.domain;
  
  // useCallback here is not really needed, and is more of a failsafe in case this function
  //    was ever passed to children from a parent consumer.
  //    the `memoization key` (currentDomain) is also contrived (only ever one domain) to demonstrate ... it could be `pageNum` or `clientId` or whatever
  const  fetchUsers = useCallback(async () => {
    dispatch({ type: actionNames.FETCH_USERS });
    try {
      if(currentDomain !== "USERS") {
        dispatch({ type: actionNames.FETCH_USERS_FAILURE, payload: `not users domain` });
        return;
      }
      console.log(`.... fetching users`);

      // our data looks like this -> { users; [ {},{}, ... ]}
      const resp = await fetch(`https://dummyjson.com/users`);
      // console.log(resp);

      if(!resp.ok) {
        let errMsg = resp.json ? JSON.stringify(await resp.json()) : 'unknown error';
        dispatch({ type: actionNames.FETCH_USERS_FAILURE, payload: `${resp.status} : ${errMsg}` });
        return;
      }
      const users = await resp.json();
      dispatch({ type: actionNames.FETCH_USERS_SUCCESS, payload: users.users.sort((a,b) => a.lastName.localeCompare(b.lastName))});

    //   // fake api call
    //   await new Promise((resolve) => setTimeout(resolve, 1000));
    //   const response = [{ id: 1, firstName: 'Sven', lastName: 'Nys' }, { id: 2, firstName: 'Wout', lastName: 'Van Aert' }];
    //   dispatch({ type: actionNames.FETCH_USERS_SUCCESS, payload: response });

    } catch (error) {
      dispatch({ type: actionNames.FETCH_USERS_FAILURE, payload: error.message });
    }
  }, [currentDomain]);

  // originally was loading on 'mount' basically, but wanted to show button usage in consumer.
  //    kept this here to show initial loading pattern.
//   useEffect(() => {
//     console.log(`inside UsersProvider.useEffect()....`);
//     fetchUsers();
//   }, [fetchUsers]);

  return (
    <UsersContext.Provider value={{ state, dispatch, fetchUsers }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => {
    const context = useContext(UsersContext);
    if (!context) {
      throw new Error('useUsers must be used within a UsersProvider');
    }
    return context;
  };
