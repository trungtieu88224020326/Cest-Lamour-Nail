
import React from 'react';
import { Card, CardContent, Typography, Box, Select, MenuItem, Divider, FormControl } from '@mui/material';
import { MONTHS, YEARS } from '../constants';

interface SummaryCardProps {
  year: number;
  month: string;
  onYearChange: (y: number) => void;
  onMonthChange: (m: string) => void;
  totalIncome: number;
  totalExpenses: number;
  totalCredit: number;
  totalCash: number;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ 
  year, month, onYearChange, onMonthChange,
  totalIncome, totalExpenses, totalCredit, totalCash
}) => {
  const profitLoss = totalIncome - totalExpenses;

  return (
    <Card sx={{ height: '100%', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <CardContent sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 150 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="subtitle1" color="textSecondary" sx={{ fontSize: '1.25rem' }}>YEAR</Typography>
            <FormControl variant="standard">
              <Select
                value={year}
                onChange={(e) => onYearChange(Number(e.target.value))}
                sx={{ color: '#3b82f6', fontSize: '1.5rem', fontWeight: 500, '&:before, &:after': { display: 'none' } }}
              >
                {YEARS.map(y => <MenuItem key={y} value={y}>{y}</MenuItem>)}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="subtitle1" color="textSecondary" sx={{ fontSize: '1.25rem' }}>MONTH</Typography>
            <FormControl variant="standard">
              <Select
                value={month}
                onChange={(e) => onMonthChange(e.target.value)}
                sx={{ color: '#3b82f6', fontSize: '1.5rem', fontWeight: 500, '&:before, &:after': { display: 'none' } }}
              >
                {MONTHS.map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)}
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
          <Box>
            <Typography variant="caption" sx={{ color: '#3b82f6', fontWeight: 700 }}>INCOME</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'text.secondary' }}>
              <span>Credit: $ {totalCredit.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              <span>Cash: $ {totalCash.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </Box>
            <Typography variant="body2" sx={{ fontWeight: 700, mt: 0.5 }}>
              Total: $ {totalIncome.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption" sx={{ color: '#ef4444', fontWeight: 700 }}>EXPENSES</Typography>
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
              $ {totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </Typography>
          </Box>

          <Divider />

          <Box>
            <Typography variant="caption" sx={{ color: '#3b82f6', fontWeight: 700 }}>PROFIT & LOSS</Typography>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              $ {profitLoss.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
