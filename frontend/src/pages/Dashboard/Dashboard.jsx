import React, { useState, useContext } from 'react'

import './Dashboard.css'
import { assets } from '../../assets/assets'

import WidgetCard from '../../components/WidgetUser/widgetCard';
import FilterPeriodeButton from '../../components/FilterPeriodeButton/FilterPeriodeButton';
import GainesChart from '../../components/graines_charts/grainescharts3';
import LineChartCard from '../../components/graines_charts/grainescharts';

import Calendar from '../../components/Calendar/Calendar2';
import UserCard from '../../components/UserCard/UserCard';
import { UserContext } from '../../context/userContext';
import UserListView from '../../components/UsersListView/UsersListView';

import { Grid } from '@mui/material';


// Sample data for the chart
const chartData = [
  { name: 'Sunday', value: 62 },
  { name: 'Monday', value: 81 },
  { name: 'Tuesday', value: 56 },
  { name: 'Wednesday', value: 70 },
  { name: 'Thursday', value: 88 },
  { name: 'Friday', value: 94 },
  { name: 'Saturday', value: 73 },
];


export const Dashboard = () => {

  const { users, setUsers } = useContext(UserContext);

  // Common columns for all roles
  const commonColumns = [
    {
      field: "profileImgURL",
      headerName: "Image",
      type: "image",
      width: 100,
      headerClassName: "header-column",
    },
    {
      field: "prenom",
      headerName: "Prénom",
      type: "text",
      width: 200,
      headerClassName: "header-column",
    },
    {
      field: "nom",
      headerName: "Nom",
      type: "text",
      width: 200,
      headerClassName: "header-column",
    },
    {
      field: "email",
      headerName: "Adresse E-mail",
      type: "text",
      width: 280,
      headerClassName: "header-column",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 130,
      headerClassName: "header-column",
    },
  ];

  // Conditional columns based on the role
  const columnsParent =
    [
      ...commonColumns,
      {
        field: "adresse",
        headerName: "Adresse",
        type: "text",
        width: 300,
        headerClassName: "header-column",
      },
      {
        field: "telephone",
        headerName: "Numéro de Téléphone",
        type: "text",
        width: 150,
        headerClassName: "header-column",
      },
    ];

  const columnsEnfant = [
    ...commonColumns,
    {
      field: "systemeScolaire",
      headerName: "Système Scolaire",
      type: "text",
      width: 200,
      headerClassName: "header-column",
    },
  ];

  const columnsFormateur = [
    ...commonColumns,
    {
      field: "titre",
      headerName: "Titre",
      type: "text",
      width: 200,
      headerClassName: "header-column",
    },
    {
      field: "adresse",
      headerName: "Adresse",
      type: "text",
      width: 170,
      headerClassName: "header-column",
    },

    {
      field: "bio",
      headerName: "Bio",
      type: "text",
      width: 400,
      headerClassName: "header-column",
    },

  ];




  return (
    <>
      <div className="dashboard">
        <Grid container spacing={2}>

          <Grid item xs={4}>
            <div className="title-dashboard">Dashboard</div>
            <div className="welcome-message">Hi, Sana. Welcome back!</div>
          </Grid>
          <Grid item xs={1}> </Grid>
          <Grid item xs={7}>
            <div className='calendar-filter-button'>

              <FilterPeriodeButton />
            </div>
          </Grid>



          <Grid item xs={5}>
            <div className="dashboard-content">

              <WidgetCard count="200" title="Graines Accounts" icon={assets.iconOrder} />
              <WidgetCard count="200" title="Graines Accounts" icon={assets.iconOrder2} />
              <WidgetCard count="200" title="Graines Accounts" icon={assets.iconOrder3} />
              <WidgetCard count="200" title="Graines Accounts" icon={assets.iconOrder4} />

              {/* Add Chart Cards and other components */}
            </div>
          </Grid>
          <Grid item sx={4}>

          </Grid>
          <Grid item sx={3}>
            <Calendar />
            <div className="add-widget-button">
              <img className="background" src={assets.background2} alt="button background" />
              <div className="content">
                <img className="icon" src={assets.add1} alt="add icon" />
                <span className="text">ADD WIDGET</span>
              </div>
            </div>
          </Grid>

          <div className='div_space'></div>

          <Grid item sx={6}>
            <GainesChart />
          </Grid>

          <Grid item sx={6}>
            <LineChartCard />
          </Grid>

          <div className='div_space'></div>

          <Grid item xs={12}>
            <div className="title-dashboard">Parents Review</div>
            <div className="welcome-message">Eum fuga consequuntur utadsjn et</div>
          </Grid>


          <Grid item sx={12}>
            <div className='userCard'>
              <UserCard />
              <UserCard />
              <UserCard />
            </div>
          </Grid>
          <div className='div_space'></div>

        </Grid>

        <Grid item xs={12}>
          <div className="title-dashboard">Gestion d'utilisateurs</div>
          <div className="welcome-message">détails de chaque liste</div>
        </Grid>
        <Grid>
          <UserListView title="Liste des formateurs" role="formateur" columns={columnsFormateur} users={users} setUsers={setUsers} />
          <UserListView title="Liste des parents" role="parent" columns={columnsParent} users={users} setUsers={setUsers} />
          <UserListView title="Liste des graines" role="enfant" columns={columnsEnfant} users={users} setUsers={setUsers} />

        </Grid>
      </div>
    </>
  )
}