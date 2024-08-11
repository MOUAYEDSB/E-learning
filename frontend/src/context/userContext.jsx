import React, { createContext, useEffect, useState } from "react";
import axiosInstance from '../api/axiosConfig';

export const UserContext = createContext(null);

const UserContextProvider = (props) => {
    const [token, setToken] = useState("");
    const [users, setUsers] = useState([]);

    // Function to add a user
    const addUser = async (user) => {
        try {
            const response = await axiosInstance.post('/user/create', user);
            setUsers((prevUsers) => [...prevUsers, response.data]);
        } catch (error) {
            console.error('Error adding user:', error.message);
        }
    };

    // Function to update a user
    const updateUser = async (id, user) => {
        try {
            const response = await axiosInstance.put(`/user/${id}`, user);
            setUsers((prevUsers) => prevUsers.map((u) => (u._id === id ? response.data : u)));
        } catch (error) {
            console.error('Error updating user:', error.message);
        }
    };

    // Function to delete a user
    const deleteUser = async (id) => {
        try {
            await axiosInstance.delete(`/user/${id}`);
            setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
        } catch (error) {
            console.error('Error deleting user:', error.message);
        }
    };

    // Fetch users on component mount
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosInstance.get('/user/');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error.message);
            }
        };
        fetchUsers();
    }, []);

    const contextValue = {
        addUser,
        updateUser,
        deleteUser,
        users,
        setUsers,
        token,
        setToken,
    };

    return (
        <UserContext.Provider value={contextValue}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
