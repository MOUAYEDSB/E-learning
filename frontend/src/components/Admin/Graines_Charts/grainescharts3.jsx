import { assets } from '../../../assets/assets';
import { Box, Typography, Checkbox, FormControlLabel, Grid } from '@mui/material';
import { PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#30BCED', '#ffea06', '#30BCED'];

const GrainesChart = () => {
  return (
    <Box sx={{ width: 455, height: 248.68, padding: 1, borderRadius: 2, boxShadow: 3, backgroundColor: '#ffffff' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={assets.iccheck} alt="Icon" style={{ width: 25, height: 25 }} />
          <Typography variant="h6" sx={{ marginLeft: 1 }}>
            Graines Chart
          </Typography>
        </Box>
        <Box>
          <FormControlLabel control={<Checkbox />} label="Chart" />
          <FormControlLabel control={<Checkbox />} label="Show Value" />
        </Box>
      </Box>
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Gauge name="Inscriptions" percentage={81} />
        <Gauge name="New Visitor" percentage={22} />
        <Gauge name="I don’t know" percentage={62} />
      </Grid>
    </Box>
  );
};

// eslint-disable-next-line react/prop-types
function Gauge({ name, percentage }) {
  const data = [
    { name: 'Percentage', value: percentage },
    { name: 'Remaining', value: 100 - percentage },
  ];

  return (
    <Grid item xs={4}>
      <Box sx={{ textAlign: 'center' }}>
        <PieChart width={130} height={100}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={30}
            outerRadius={50}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
        <Typography variant="h6" sx={{ marginTop: 1 }}>
          {percentage}%
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {name}
        </Typography>
      </Box>
    </Grid>
  );
}

export default GrainesChart;