
import React, { useState, useMemo } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Checkbox,
  ThemeProvider,
  createTheme,
  CssBaseline
} from '@mui/material';
import Navbar from './components/Navbar';
import FinancialCharts from './components/FinancialCharts';
import SummaryCard from './components/SummaryCard';
import EditModal from './components/EditModal';
import { INITIAL_INCOME, INITIAL_EXPENSES, PROFIT_LOSS } from './constants';
import { IncomeItem, ExpenseItem } from './types';

const theme = createTheme({
  palette: {
    background: {
      default: '#efefef',
    },
    primary: {
      main: '#3b82f6',
    },
    secondary: {
      main: '#dc2626',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: 'none',
    },
  },
});

const App: React.FC = () => {
  const [income, setIncome] = useState<IncomeItem[]>(INITIAL_INCOME);
  const [expenses, setExpenses] = useState<ExpenseItem[]>(INITIAL_EXPENSES);
  const [year, setYear] = useState<number>(2024);
  const [month, setMonth] = useState<string>('April');
  
  const [editType, setEditType] = useState<'income' | 'expense' | null>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const totalCredit = useMemo(() => income.reduce((sum, item) => sum + item.credit, 0), [income]);
  const totalCash = useMemo(() => income.reduce((sum, item) => sum + item.cash, 0), [income]);
  const totalIncomeValue = useMemo(() => income.reduce((sum, item) => sum + item.amount, 0), [income]);
  const totalExpensesValue = useMemo(() => expenses.reduce((sum, item) => sum + item.amount, 0), [expenses]);

  const handleEditItem = (type: 'income' | 'expense', item: any) => {
    setEditType(type);
    setSelectedItem(item);
  };

  const handleSave = (data: any) => {
    if (editType === 'income') {
      const updatedIncome = income.map(i => i.id === data.id ? { ...data, amount: data.credit + data.cash } : i);
      setIncome(updatedIncome);
    } else if (editType === 'expense') {
      const updatedExpenses = expenses.map(e => e.id === data.id ? data : e);
      setExpenses(updatedExpenses);
    }
    setEditType(null);
    setSelectedItem(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        
        <Container maxWidth="xl" sx={{ flex: 1, py: 4 }}>
          {/* Top Section */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} xl={8}>
              <FinancialCharts incomeData={income} expenseData={expenses} />
            </Grid>
            <Grid item xs={12} xl={4}>
              <SummaryCard 
                year={year}
                month={month}
                onYearChange={setYear}
                onMonthChange={setMonth}
                totalIncome={totalIncomeValue}
                totalExpenses={totalExpensesValue}
                totalCredit={totalCredit}
                totalCash={totalCash}
              />
            </Grid>
          </Grid>

          {/* Bottom Section - Tables */}
          <Grid container spacing={3}>
            
            {/* Income Table */}
            <Grid item xs={12} lg={4}>
              <TableContainer component={Paper} sx={{ height: 600, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ backgroundColor: '#3f3f46', p: 1, textAlign: 'center' }}>
                  <Typography variant="body2" sx={{ color: 'white', fontWeight: 300 }}>InCome</Typography>
                </Box>
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow sx={{ '& th': { backgroundColor: '#f4f4f5', fontWeight: 700, fontSize: '0.7rem' } }}>
                      <TableCell>Item</TableCell>
                      <TableCell align="right">Credit</TableCell>
                      <TableCell align="right">Cash</TableCell>
                      <TableCell align="right">Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {income.map((item) => (
                      <TableRow 
                        key={item.id} 
                        hover 
                        onDoubleClick={() => handleEditItem('income', item)}
                        sx={{ cursor: 'pointer', '& td': { fontSize: '0.75rem' } }}
                      >
                        <TableCell>{item.item}</TableCell>
                        <TableCell align="right">{item.credit.toLocaleString(undefined, { minimumFractionDigits: 2 })}</TableCell>
                        <TableCell align="right">{item.cash.toLocaleString(undefined, { minimumFractionDigits: 2 })}</TableCell>
                        <TableCell align="right">{item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            {/* Expenses Table */}
            <Grid item xs={12} lg={4}>
              <TableContainer component={Paper} sx={{ height: 600, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ backgroundColor: '#3f3f46', p: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2 }}>
                  <Typography variant="body2" sx={{ color: 'white', fontWeight: 300 }}>Expenses - Cest Lamour Nail 1</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Checkbox size="small" sx={{ color: 'white', '&.Mui-checked': { color: 'white' }, p: 0 }} />
                    <Typography variant="caption" sx={{ color: 'white', fontSize: '0.6rem' }}>All</Typography>
                  </Box>
                </Box>
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow sx={{ '& th': { backgroundColor: '#f4f4f5', fontWeight: 700, fontSize: '0.7rem' } }}>
                      <TableCell>Item</TableCell>
                      <TableCell align="right">Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {expenses.map((item) => (
                      <TableRow 
                        key={item.id} 
                        hover 
                        onDoubleClick={() => handleEditItem('expense', item)}
                        sx={{ cursor: 'pointer', '& td': { fontSize: '0.75rem' } }}
                      >
                        <TableCell sx={{ borderRight: '1px solid #e5e7eb' }}>{item.item}</TableCell>
                        <TableCell align="right">{item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            {/* Profit & Loss Table */}
            <Grid item xs={12} lg={4}>
              <TableContainer component={Paper} sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ backgroundColor: '#3f3f46', p: 1, textAlign: 'center' }}>
                  <Typography variant="body2" sx={{ color: 'white', fontWeight: 300 }}>Profit & Loss</Typography>
                </Box>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ '& th': { backgroundColor: '#f4f4f5', fontWeight: 700, fontSize: '0.7rem' } }}>
                      <TableCell>Month</TableCell>
                      <TableCell align="right">Income</TableCell>
                      <TableCell align="right">Expenses</TableCell>
                      <TableCell align="right">Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {PROFIT_LOSS.map((item, idx) => (
                      <TableRow key={idx} sx={{ '& td': { fontSize: '0.75rem' } }}>
                        <TableCell>{item.month}</TableCell>
                        <TableCell align="right">{totalIncomeValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</TableCell>
                        <TableCell align="right">{totalExpensesValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 700 }}>{(totalIncomeValue - totalExpensesValue).toLocaleString(undefined, { minimumFractionDigits: 2 })}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

          </Grid>
        </Container>

        <EditModal 
          isOpen={editType !== null}
          type={editType || 'income'}
          item={selectedItem}
          onClose={() => setEditType(null)}
          onSave={handleSave}
        />

        {/* Footer info */}
        <Box sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 40, display: { xs: 'none', md: 'block' } }}>
          <Paper sx={{ p: 1.5, opacity: 0.9, backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }}>
            <Typography variant="caption" display="block" color="textSecondary">• Double click rows to edit values</Typography>
            <Typography variant="caption" display="block" color="textSecondary">• Real-time updates</Typography>
            <Typography variant="caption" display="block" color="textSecondary">• Material UI Responsive Design</Typography>
          </Paper>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
