
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
    <div className="card h-100 border rounded-3 overflow-hidden shadow-sm bg-white">
      <div className="card-body p-4 d-flex flex-column gap-4">
        
        {/* Filter Section */}
        <div className="row g-2">
          <div className="col-6">
            <label className="form-label small fw-bold text-uppercase text-secondary mb-2 tracking-wide">Fiscal Year</label>
            <select 
              className="form-select form-select-sm bg-light border-0 fw-semibold px-3 py-2" 
              value={year}
              onChange={(e) => onYearChange(Number(e.target.value))}
            >
              {YEARS.map(y => <MenuItemWrapper key={y} value={y}>{y}</MenuItemWrapper>)}
            </select>
          </div>
          <div className="col-6">
            <label className="form-label small fw-bold text-uppercase text-secondary mb-2 tracking-wide">Month</label>
            <select 
              className="form-select form-select-sm bg-light border-0 fw-semibold px-3 py-2" 
              value={month}
              onChange={(e) => onMonthChange(e.target.value)}
            >
              {MONTHS.map(m => <MenuItemWrapper key={m} value={m}>{m}</MenuItemWrapper>)}
            </select>
          </div>
        </div>

        <hr className="my-0 opacity-10" />

        {/* Financial Totals */}
        <div className="d-flex flex-column gap-4">
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="small fw-bold text-primary text-uppercase">Total Revenue</span>
              <span className="h4 fw-black text-dark mb-0">$ {totalIncome.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="row g-0 bg-light border rounded-3 overflow-hidden">
              <div className="col-6 p-3">
                <span className="d-block small text-secondary fw-semibold mb-1">Credit Cards</span>
                <span className="h6 fw-bold text-primary mb-0">$ {totalCredit.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="col-auto py-3">
                <div className="vr h-100 bg-secondary opacity-25"></div>
              </div>
              <div className="col p-3 text-end">
                <span className="d-block small text-secondary fw-semibold mb-1">Cash / Other</span>
                <span className="h6 fw-bold text-success mb-0">$ {totalCash.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <span className="small fw-bold text-danger text-uppercase">Total Expenses</span>
            <span className="h5 fw-bold text-danger mb-0">$ {totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>

          <div className={`p-4 rounded-3 border ${profitLoss >= 0 ? 'bg-success-subtle border-success' : 'bg-danger-subtle border-danger'}`}>
            <span className={`d-block small fw-bold text-uppercase mb-1 ${profitLoss >= 0 ? 'text-success' : 'text-danger'}`}>
              Net Monthly Performance
            </span>
            <span className={`h2 fw-black mb-0 ${profitLoss >= 0 ? 'text-success' : 'text-danger'}`}>
              $ {profitLoss.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple helper for native select options
const MenuItemWrapper = ({ value, children }: { value: any, children: React.ReactNode }) => (
  <option value={value}>{children}</option>
);

export default SummaryCard;
