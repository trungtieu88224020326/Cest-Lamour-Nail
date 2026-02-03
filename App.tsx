
import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import FinancialCharts from './components/FinancialCharts';
import SummaryCard from './components/SummaryCard';
import EditModal from './components/EditModal';
import { INITIAL_INCOME, INITIAL_EXPENSES } from './constants';
import { IncomeItem, ExpenseItem } from './types';

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
    <div className="min-vh-100 d-flex flex-column">
      <Navbar />
      
      <main className="container-xl flex-grow-1 py-4">
        {/* Dashboard Header / Global Filters & Charts */}
        <div className="row g-4 mb-4">
          <div className="col-12 col-lg-8">
            <FinancialCharts incomeData={income} expenseData={expenses} />
          </div>
          <div className="col-12 col-lg-4">
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
          </div>
        </div>

        {/* Data Management Section - 3 Responsive Columns */}
        <div className="row g-4">
          
          {/* 1. Income Column */}
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 d-flex flex-column overflow-hidden">
              <div className="card-header bg-white py-3 border-bottom text-center">
                <h6 className="mb-0 fw-bold text-uppercase small tracking-wide">Monthly Income</h6>
              </div>
              <div className="table-sticky-wrapper flex-grow-1">
                <table className="table table-hover table-sm mb-0 align-middle">
                  <thead>
                    <tr>
                      <th className="px-3">Item</th>
                      <th className="text-end px-3">Credit</th>
                      <th className="text-end px-3">Cash</th>
                      <th className="text-end px-3">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {income.map((item) => (
                      <tr 
                        key={item.id} 
                        className="cursor-pointer"
                        onDoubleClick={() => handleEditItem('income', item)}
                      >
                        <td className="px-3 small fw-medium text-dark">{item.item}</td>
                        <td className="text-end px-3 small text-primary">{item.credit.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                        <td className="text-end px-3 small text-success">{item.cash.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                        <td className="text-end px-3 small fw-bold text-dark">{item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* 2. Expenses Column */}
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 d-flex flex-column overflow-hidden">
              <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
                <h6 className="mb-0 fw-bold text-uppercase small tracking-wide">Monthly Expenses</h6>
                <div className="form-check mb-0">
                  <input className="form-check-input" type="checkbox" id="selectAllExpenses" />
                  <label className="form-check-label small text-muted ms-1" htmlFor="selectAllExpenses">
                    Select All
                  </label>
                </div>
              </div>
              <div className="table-sticky-wrapper flex-grow-1">
                <table className="table table-hover table-sm mb-0 align-middle">
                  <thead>
                    <tr>
                      <th className="px-3">Category</th>
                      <th className="text-end px-3">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map((item) => (
                      <tr 
                        key={item.id} 
                        className="cursor-pointer"
                        onDoubleClick={() => handleEditItem('expense', item)}
                      >
                        <td className="px-3 small text-secondary">{item.item}</td>
                        <td className="text-end px-3 small fw-bold text-danger">
                          {item.amount > 0 ? `$ ${item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* 3. Profit & Loss Column */}
          <div className="col-12 col-md-12 col-lg-4">
            <div className="card border-0 mb-4 shadow-sm overflow-hidden rounded-3">
              <div className="card-header bg-white py-3 border-bottom text-center">
                <h6 className="mb-0 fw-bold text-uppercase small tracking-wide">Financial Overview</h6>
              </div>
              <div className="table-responsive">
                <table className="table table-sm mb-0">
                  <thead>
                    <tr>
                      <th className="px-3">Month</th>
                      <th className="text-end px-3">Income</th>
                      <th className="text-end px-3">Expenses</th>
                      <th className="text-end px-3">Net</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ backgroundColor: 'rgba(37, 99, 235, 0.03)' }}>
                      <td className="px-3 py-3 fw-bold text-dark">{month}</td>
                      <td className="text-end px-3 py-3 text-success fw-bold">{totalIncomeValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                      <td className="text-end px-3 py-3 text-danger fw-bold">{totalExpensesValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                      <td className={`text-end px-3 py-3 fw-bolder fs-6 ${(totalIncomeValue - totalExpensesValue) >= 0 ? 'text-success' : 'text-danger'}`}>
                        {(totalIncomeValue - totalExpensesValue).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="card bg-white p-4 border rounded-3">
              <div className="d-flex align-items-center mb-3">
                <i className="fas fa-mouse-pointer text-primary me-3"></i>
                <span className="small text-muted">Double-click any row to edit financial data</span>
              </div>
              <div className="d-flex align-items-center">
                <i className="fas fa-bolt text-warning me-3"></i>
                <span className="small text-muted">Changes reflect instantly in charts and summaries</span>
              </div>
            </div>
          </div>

        </div>
      </main>

      <EditModal 
        isOpen={editType !== null}
        type={editType || 'income'}
        item={selectedItem}
        onClose={() => setEditType(null)}
        onSave={handleSave}
      />
    </div>
  );
};

export default App;
