
import React from 'react';
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
    <div className="card h-100 overflow-hidden bg-white">
      <div className="card-body p-4">
        <h6 className="fw-bold text-muted mb-4 text-uppercase extra-small tracking-wider">Financial Snapshot</h6>
        
        {/* Date Selector */}
        <div className="row g-2 mb-4">
          <div className="col-6">
            <select 
              className="form-select border-0 bg-light fw-semibold small rounded-3" 
              value={year}
              onChange={(e) => onYearChange(Number(e.target.value))}
            >
              {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div className="col-6">
            <select 
              className="form-select border-0 bg-light fw-semibold small rounded-3" 
              value={month}
              onChange={(e) => onMonthChange(e.target.value)}
            >
              {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
        </div>

        <div className="d-flex flex-column gap-3">
          {/* Revenue Widget */}
          <div className="p-3 bg-light rounded-4">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <div className="text-muted small fw-medium">Total Revenue</div>
              <div className="text-indigo-600 bg-indigo-50 px-2 py-1 rounded small extra-small fw-bold">+4.5%</div>
            </div>
            <div className="h4 fw-bold mb-0">${totalIncome.toLocaleString()}</div>
            <div className="mt-2 small text-muted">
              <span className="fw-bold text-dark">${totalCredit.toLocaleString()}</span> via Cards
            </div>
          </div>

          {/* Expenses Widget */}
          <div className="p-3 bg-light rounded-4">
            <div className="text-muted small fw-medium mb-1">Estimated Expenses</div>
            <div className="h5 fw-bold text-danger mb-0">${totalExpenses.toLocaleString()}</div>
            <div className="progress mt-2" style={{ height: '4px' }}>
              <div className="progress-bar bg-danger" style={{ width: '45%' }}></div>
            </div>
          </div>

          {/* Profit Section - Highlighted */}
          <div className={`mt-2 p-4 rounded-4 text-white ${profitLoss >= 0 ? 'bg-indigo-600' : 'bg-danger shadow-danger'}`}>
            <div className="opacity-75 small fw-bold text-uppercase mb-1 tracking-wider">Net Profit & Loss</div>
            <div className="h2 fw-bold mb-0">${profitLoss.toLocaleString()}</div>
            <div className="mt-2 d-flex align-items-center gap-2 extra-small fw-bold">
              <i className={`fas ${profitLoss >= 0 ? 'fa-arrow-trend-up' : 'fa-arrow-trend-down'}`}></i>
              <span>Monthly Target Reached</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
