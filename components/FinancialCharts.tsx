
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { IncomeItem, ExpenseItem } from '../types';
import { COLORS } from '../constants';

interface FinancialChartsProps {
  incomeData: IncomeItem[];
  expenseData: ExpenseItem[];
}

const FinancialCharts: React.FC<FinancialChartsProps> = ({ incomeData, expenseData }) => {
  const expenseSummary = expenseData
    .filter(e => e.amount > 0)
    .map((e) => ({ name: e.item, value: e.amount }));

  return (
    <Grid container spacing={2} sx={{ height: { xs: 'auto', md: 320 } }}>
      <Grid item xs={12} lg={6}>
        <Paper sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" color="textSecondary" sx={{ mb: 1 }}>InCome</Typography>
          <Box sx={{ flex: 1, minHeight: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={incomeData}
                  dataKey="amount"
                  nameKey="item"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {incomeData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} lg={6}>
        <Paper sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" color="textSecondary" sx={{ mb: 1 }}>Expenses</Typography>
          <Box sx={{ flex: 1, minHeight: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseSummary.length > 0 ? expenseSummary : [{ name: 'No Expenses', value: 1 }]}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ percent }) => percent > 0.05 ? `${(percent * 100).toFixed(0)}%` : ''}
                >
                  {expenseSummary.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="vertical" align="right" verticalAlign="middle" />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default FinancialCharts;
