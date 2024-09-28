import { useContext } from 'react';
import './Dashboard.css';
import { assets } from '../../assets/assets';

import WidgetCard from '../../components/WidgetUser/widgetCard';
import FilterPeriodeButton from '../../components/Admin/FilterPeriodeButton/FilterPeriodeButton';
import GainesChart from '../../components/Admin/Graines_Charts/grainescharts3';
import LineChartCard from '../../components/Admin/Graines_Charts/grainescharts';
import Calendar from '../../components/Admin/Calendar/Calendar2';
import UserCard from '../../components/UserCard/UserCard';
import { UserContext } from '../../context/userContext';
import UserListView from '../../components/UsersListView/UsersListView';

import { Grid } from '@mui/material';

// Sample data for the chart
// eslint-disable-next-line no-unused-vars
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
  const { users } = useContext(UserContext); // Get users from context

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
    {
      field: "role",
      headerName: "Role",
      type: "string",
      width: 150,
      headerClassName: "header-column",
    },
  ];

  return (
    <>
      <div className="dashboard">
        <Grid container spacing={2}>

          <Grid item xs={4}>
            <div className="title-dashboard">Dashboard</div>
            <div className="welcome-message">Hi, Welcome Back!</div>
          </Grid>
          <Grid item xs={1}></Grid>
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
          <Grid item sx={4}></Grid>
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
          <div className="title-dashboard">Gestion d utilisateurs</div>
          <div className="welcome-message">Détails de chaque liste</div>
        </Grid>

        <Grid item xs={12}>
          <UserListView title=" List D'utilisateurs" columns={commonColumns} users={users} />
        </Grid>
      </div>
    </>
  );
};
