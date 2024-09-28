// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import "./ContactList.css";
import axios from "../../api/axiosConfig";
import { ContactGrid } from "../../components/ContactGrid/ContactGrid";

export const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = () => {
    axios
      .get("/contact/")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setContacts(response.data);
        } else {
          console.error("Unexpected data format:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching contacts:", error);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`/contact/${id}`)
      .then(() => {
        fetchContacts(); // Fetch data again after deletion
      })
      .catch((error) => {
        console.error("Error deleting contact:", error);
      });
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 200,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
    },
    {
      field: "message",
      headerName: "Message",
      width: 350,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 200,
      type: "text",
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleString();
      },
    },
  ];

  return (
    <div className="container">
      <label className="nav-label">Pages / Contact Management</label>
      <label className="nav-label2">Contact List</label>
      <div className="view-wrapper">
        <span className="page-title">List of Contacts</span>
        <ContactGrid
          columns={columns}
          items={contacts}
          setItems={setContacts}
          maxHeight="500px"
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};
