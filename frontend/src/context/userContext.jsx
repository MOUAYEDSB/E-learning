import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

const UserContextProvider = (props) => {
    
   
    const [token,setToken] = useState("");
    const [users,setUsers] = useState(null);
    const url ="http://localhost:3000";


    const contextValue = {
        users,
        setUsers,
        token,
        setToken,
        url
    }



    return (
        <UserContext.Provider value={contextValue}>
            {props.children}
        </UserContext.Provider>
    )
} 
export default UserContextProvider ;