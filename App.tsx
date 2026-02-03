
import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
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
  const [activeTab, setActiveTab] = useState('Budget');
  
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
    <div className="d-flex min-vh-100">
      {/* Sidebar - Desktop Only for simplicity */}
      <Sidebar />

      <div className="flex-grow-1 d-flex flex-column" style={{ overflowX: 'hidden' }}>
        {/* Top Navbar - Fuse Header */}
        <header className="navbar navbar-expand-lg bg-white px-4 py-2 border-bottom sticky-top">
          <div className="container-fluid px-0">
            <div className="d-flex align-items-center gap-3">
              <button className="btn d-lg-none p-0 text-muted">
                <i className="fas fa-bars fs-4"></i>
              </button>
              <div className="input-group d-none d-md-flex" style={{ width: '300px' }}>
                <span className="input-group-text bg-transparent border-0 text-muted">
                  <i className="fas fa-search"></i>
                </span>
                <input type="text" className="form-control border-0 bg-transparent ps-0" placeholder="Search..." />
              </div>
            </div>
            <div className="ms-auto d-flex align-items-center gap-3">
              <div className="d-flex align-items-center gap-2 cursor-pointer">
                <div className="text-end d-none d-sm-block">
                  <div className="fw-bold small lh-1">Admin User</div>
                  <div className="text-muted extra-small">admin@nailsalon.com</div>
                </div>
                <img src="https://ui-avatars.com/api/?name=Admin+User&background=4F46E5&color=fff" className="rounded-circle" width="32" height="32" alt="Avatar" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Header - Fuse Project Style */}
        <section className="bg-white border-bottom pt-5 px-5">
          <div className="container-fluid px-0">
            <div className="row align-items-center">
              <div className="col-auto">
                <div className="bg-indigo-600 text-white rounded-3 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                  <i className="fas fa-briefcase fs-4"></i>
                </div>
              </div>
              <div className="col">
                <div className="d-flex align-items-center gap-2 text-muted small fw-medium mb-1">
                  <span>Dashboards</span>
                  <i className="fas fa-chevron-right extra-small"></i>
                  <span>Project</span>
                </div>
                <h3 className="fw-bold mb-0">Cest Lamour Nail. Inc</h3>
              </div>
              <div className="col-auto mt-3 mt-lg-0">
                <button className="btn btn-primary bg-indigo-600 px-4 fw-bold rounded-pill">
                  <i className="fas fa-plus me-2"></i> Export Report
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="d-flex gap-4 mt-4 overflow-auto">
              {['Overview', 'Budget', 'Expenses', 'Reports'].map(tab => (
                <div 
                  key={tab} 
                  className={`fuse-tab ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <main className="p-4 p-lg-5 flex-grow-1">
          <div className="container-fluid px-0">
            {/* Summary Row */}
            <div className="row g-4 mb-4">
              <div className="col-12 col-xl-8">
                <FinancialCharts incomeData={income} expenseData={expenses} />
              </div>
              <div className="col-12 col-xl-4">
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

            {/* Data Tables Row */}
            <div className="row g-4">
              {/* Income Table */}
              <div className="col-12 col-xl-6">
                <div className="card h-100">
                  <div className="card-header bg-white border-0 py-4 px-4 d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 fw-bold">Detailed Income</h5>
                    <button className="btn btn-light btn-sm rounded-circle"><i className="fas fa-ellipsis-v text-muted"></i></button>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-fuse mb-0 align-middle">
                      <thead>
                        <tr>
                          <th>Location / Item</th>
                          <th className="text-end">Credit</th>
                          <th className="text-end">Cash</th>
                          <th className="text-end">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {income.map((item) => (
                          <tr key={item.id} className="cursor-pointer" onDoubleClick={() => handleEditItem('income', item)}>
                            <td>
                              <div className="d-flex align-items-center gap-3">
                                <div className="rounded-2 bg-primary-light text-indigo-600 d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                                  <i className="fas fa-store-alt small"></i>
                                </div>
                                <span className="fw-semibold">{item.item}</span>
                              </div>
                            </td>
                            <td className="text-end text-muted">${item.credit.toLocaleString()}</td>
                            <td className="text-end text-muted">${item.cash.toLocaleString()}</td>
                            <td className="text-end fw-bold text-dark">${item.amount.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Expenses Table */}
              <div className="col-12 col-xl-6">
                <div className="card h-100">
                  <div className="card-header bg-white border-0 py-4 px-4 d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 fw-bold">Expense Breakdown</h5>
                    <button className="btn btn-light btn-sm rounded-circle"><i className="fas fa-ellipsis-v text-muted"></i></button>
                  </div>
                  <div className="table-responsive" style={{ maxHeight: '450px', overflowY: 'auto' }}>
                    <table className="table table-fuse mb-0 align-middle">
                      <thead>
                        <tr>
                          <th>Category</th>
                          <th className="text-end">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {expenses.map((item) => (
                          <tr key={item.id} className="cursor-pointer" onDoubleClick={() => handleEditItem('expense', item)}>
                            <td>
                              <div className="d-flex align-items-center gap-3">
                                <div className="rounded-circle bg-danger-subtle text-danger d-flex align-items-center justify-content-center" style={{ width: '8px', height: '8px' }}></div>
                                <span className="text-secondary">{item.item}</span>
                              </div>
                            </td>
                            <td className="text-end fw-bold text-danger">${item.amount.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

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
