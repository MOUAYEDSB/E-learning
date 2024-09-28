/* eslint-disable react/prop-types */
// src/context/UserContext.js
import { createContext, useEffect, useState } from "react";
import axiosInstance from '../api/axiosConfig';

export const UserContext = createContext(null);

const UserContextProvider = (props) => {
    const [token, setToken] = useState(""); // Token for authentication (if applicable)
    const [users, setUsers] = useState([]); // State to store user data

    // Function to add a new user
    const addUser = async (user) => {
        try {
            const response = await axiosInstance.post('/user/create', user);
            setUsers((prevUsers) => [...prevUsers, response.data]); // Append new user to existing list
        } catch (error) {
            console.error('Error adding user:', error.message);
        }
    };

    // Function to update an existing user
    const updateUser = async (id, user) => {
        console.log("Updating user with ID:", id);
        console.log("User data being sent:", user);
        try {
            const response = await axiosInstance.put(`/user/${id}`, user);
            setUsers((prevUsers) =>
                prevUsers.map((u) => (u._id === id ? response.data : u)) // Replace updated user in the list
            );
        } catch (error) {
            console.error('Error updating user:', error.response ? error.response.data : error.message);
        }
    };

    // Function to fetch a single user by ID
    const getUser = async (id) => {
        try {
            const response = await axiosInstance.get(`/user/${id}`);
            return response.data.user; // Return user data
        } catch (error) {
            console.error('Error fetching user:', error.message);
            return null; // Return null in case of error
        }
    };

    // Function to delete a user by ID
    const deleteUser = async (id) => {
        try {
            await axiosInstance.delete(`/user/${id}`);
            setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id)); // Remove user from list
        } catch (error) {
            console.error('Error deleting user:', error.message);
        }
    };

    // Fetch all users on component mount
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosInstance.get('/user');
                setUsers(response.data.users); // Set the users array from API response
            } catch (error) {
                console.error('Error fetching users:', error.message);
            }
        };

        fetchUsers();// Call the function to fetch users
    }, []); // Empty dependency array to ensure it runs only once after initial render

    // Context value to provide the user-related functions and state to consumers
    const contextValue = {
        addUser,
        updateUser,
        deleteUser,
        getUser,
        users, // Current list of users
        setUsers, // Setter function for users (if needed elsewhere)
        token,
        setToken, // Setter function for authentication token (if needed)
    };

    return (
        <UserContext.Provider value={contextValue}>
            {props.children} {/* Render children components */}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
