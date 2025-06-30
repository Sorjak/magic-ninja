import React from "react"

import { useLocalStorage } from "../hooks/LocalStorage"

export const UserContext = React.createContext()

export const UserProvider = ({ children }) => {
  const { getItem } = useLocalStorage();
  const [currentUser, setCurrentUser] = React.useState(null)

  const fetchCurrentUser = async () => {
    getItem('isAdmin');
    setCurrentUser(response)
  }

  return (
    <UserContext.Provider value={{ currentUser, fetchCurrentUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useCurrentUser = () => React.useContext(UserContext)