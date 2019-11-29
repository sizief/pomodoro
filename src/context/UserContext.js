import React from 'react';

const UserContext = React.createContext({});

export const UserProvider = UserContext.Provider;
export const UserModel = {
  given_name: 'Guest',
  family_name: null,
  access_id: null,
  loggedIn: false,
};
export default UserContext;
