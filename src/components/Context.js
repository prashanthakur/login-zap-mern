import { createContext, useState } from "react";

export const UserDetails = createContext()


const Context = ({children}) => {
    const [userData,setuserData] = useState(null)
  return (
    <UserDetails.Provider value={{userData,setuserData}}>{children}</UserDetails.Provider>
  )
}

export default Context