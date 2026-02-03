
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { IncomeItem, ExpenseItem } from '../types';

interface FinancialChartsProps {
  incomeData: IncomeItem[];
  expenseData: ExpenseItem[];
}

const INCOME_COLORS = ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#2563eb'];
const EXPENSE_COLORS = ['#ef4444', '#f87171', '#fca5a5', '#fee2e2', '#dc2626'];

const FinancialCharts: React.FC<FinancialChartsProps> = ({ incomeData, expenseData }) => {
  const expenseSummary = expenseData
    .filter(e => e.amount > 0)
    .map((e) => ({ name: e.item, value: e.amount }));

  return (
    <div className="row g-3 h-100">
      <div className="col-12 col-md-6">
        <div className="card h-100 p-4 d-flex flex-column rounded-3">
          <h6 className="text-center text-secondary fw-bold text-uppercase small mb-4">Income Sources</h6>
          <div className="flex-grow-1" style={{ minHeight: '280px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={incomeData}
                  dataKey="amount"
                  nameKey="item"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {incomeData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={INCOME_COLORS[index % INCOME_COLORS.length]} stroke="#fff" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#1e293b', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-6">
        <div className="card h-100 p-4 d-flex flex-column rounded-3">
          <h6 className="text-center text-secondary fw-bold text-uppercase small mb-4">Expense Allocation</h6>
          <div className="flex-grow-1" style={{ minHeight: '280px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseSummary.length > 0 ? expenseSummary : [{ name: 'No Data', value: 1 }]}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  label={({ percent }) => percent > 0.1 ? `${(percent * 100).toFixed(0)}%` : ''}
                >
                  {expenseSummary.length > 0 ? (
                    expenseSummary.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={EXPENSE_COLORS[index % EXPENSE_COLORS.length]} stroke="#fff" strokeWidth={2} />
                    ))
                  ) : (
                    <Cell fill="#f1f5f9" stroke="none" />
                  )}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#1e293b', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Legend iconType="circle" verticalAlign="bottom" layout="horizontal" wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialCharts;
