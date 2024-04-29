import { createContext, useState } from "react"

const UserAuthContext = createContext()
const UserAuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <>
      <UserAuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        {children}
      </UserAuthContext.Provider>
    </>
  )
}

export { UserAuthContext, UserAuthProvider }
