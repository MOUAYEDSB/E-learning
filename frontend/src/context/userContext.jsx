import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

const UserContextProvider = (props) => {
    
   
    const [token,setToken] = useState("");
    const [users,setUsers] = useState([]);
    const url ="http://localhost:3000";

    const addUser = async (user) => {
        try {
            const response = await axios.post(`${url}/api/user/create`, user);
            setUsers([...users, response.data]);
        } catch (error) {
            console.log(error.message);
        }
    }

    const updateUser = async (id, user) => {
        try {
            const response = await axios.put(`${url}/api/user/${id}`, user);
            setUsers(users.map((u) => (u._id === id ? response.data : u)));
        } catch (error) {
            console.log(error.message);
        }
    }

    
    const deleteUser = async (id) => {
        try {
            const response = await axios.delete(`${url}/api/user/${id}`);
            setUsers(users.filter((user) => user._id !== id));
        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${url}/api/user/`);
                setUsers(response.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchUsers();
    }, [users])

    const contextValue = {
        addUser,
        updateUser,
        deleteUser,
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