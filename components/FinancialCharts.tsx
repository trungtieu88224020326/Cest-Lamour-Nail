
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { IncomeItem, ExpenseItem } from '../types';

interface FinancialChartsProps {
  incomeData: IncomeItem[];
  expenseData: ExpenseItem[];
}

// Fuse Modern Palette
const INCOME_COLORS = ['#4F46E5', '#818CF8', '#C7D2FE', '#EEF2FF', '#3730A3'];
const EXPENSE_COLORS = ['#F59E0B', '#FCD34D', '#FEF3C7', '#B45309', '#D97706'];

const FinancialCharts: React.FC<FinancialChartsProps> = ({ incomeData, expenseData }) => {
  const expenseSummary = expenseData
    .filter(e => e.amount > 0)
    .map((e) => ({ name: e.item, value: e.amount }));

  return (
    <div className="row g-4 h-100">
      <div className="col-12 col-md-6">
        <div className="card h-100 p-4 border-0 shadow-sm">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h6 className="fw-bold text-muted mb-0 text-uppercase extra-small tracking-wider">Income Sources</h6>
            <button className="btn btn-light btn-sm rounded-pill"><i className="fas fa-sync-alt extra-small"></i></button>
          </div>
          <div style={{ height: '280px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={incomeData}
                  dataKey="amount"
                  nameKey="item"
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  stroke="none"
                  paddingAngle={5}
                >
                  {incomeData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={INCOME_COLORS[index % INCOME_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', fontWeight: '600', color: '#64748b' }} verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-6">
        <div className="card h-100 p-4 border-0 shadow-sm">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h6 className="fw-bold text-muted mb-0 text-uppercase extra-small tracking-wider">Expense Allocation</h6>
            <button className="btn btn-light btn-sm rounded-pill"><i className="fas fa-cog extra-small"></i></button>
          </div>
          <div style={{ height: '280px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseSummary.length > 0 ? expenseSummary : [{ name: 'No Data', value: 1 }]}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  stroke="none"
                  paddingAngle={5}
                >
                  {expenseSummary.length > 0 ? (
                    expenseSummary.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={EXPENSE_COLORS[index % EXPENSE_COLORS.length]} />
                    ))
                  ) : (
                    <Cell fill="#f1f5f9" />
                  )}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', fontWeight: '600', color: '#64748b' }} verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialCharts;
