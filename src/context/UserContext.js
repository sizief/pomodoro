import React from 'react'

const UserContext = React.createContext({})

export const UserProvider = UserContext.Provider
export const UserModel = { name: 'Guest', loggedIn: false }
export default UserContext
