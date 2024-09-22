import { useState } from "react";
import { DataGrid } from "../../components/DataGrid/DataGrid";
export const DashboardKids = () => {
  const columns = [
    {
      field: "fullName",
      headerName: "Nom",
      type: "text",
      img: "profilePicUrl",
      width: "230px",
      minWidth: "200px",
      sort: true,
    },
    {
      field: "email",
      headerName: "Adresse E-mail",
      type: "text",
      width: "320px",
      minWidth: "250px",
    },
    {
      field: "phone",
      headerName: "Téléphone",
      type: "text",
      width: "180px",
      minWidth: "120px",
    },
    {
      field: "status",
      headerName: "Status",
      type: "status",
      options: {
        online: ["#d3efdf", "#508d57"],
        offline: ["#f7ddd8", "#b71d18"],
      },
      width: "110px",
      minWidth: "76px",
      sort: true,
    },
  ];

  const [items, setItems] = useState([
    {
      fullName: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "987-654-3210",
      status: "offline",
      profilePicUrl: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      fullName: "John Johnson",
      email: "john.johnson@example.com",
      phone: "555-123-4567",
      status: "online",
      profilePicUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      fullName: "Emily Williams",
      email: "emily.williams@example.com",
      phone: "555-987-6543",
      status: "offline",
      profilePicUrl: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      fullName: "Michael Brown",
      email: "michael.brown@example.com",
      phone: "555-555-5555",
      status: "online",
      profilePicUrl: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      fullName: "Laura Jones",
      email: "laura.jones@example.com",
      phone: "555-666-7777",
      status: "offline",
      profilePicUrl: "https://randomuser.me/api/portraits/women/3.jpg",
    },
  ]);

  return (
    <DataGrid columns={columns} items={items} setItems={setItems}></DataGrid>
  );
};
