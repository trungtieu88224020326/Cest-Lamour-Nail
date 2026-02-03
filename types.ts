
export interface IncomeItem {
  id: string;
  item: string;
  credit: number;
  cash: number;
  amount: number;
}

export interface ExpenseItem {
  id: string;
  item: string;
  amount: number;
}

export interface ProfitLossItem {
  month: string;
  income: number;
  expenses: number;
  amount: number;
}

export interface DashboardData {
  income: IncomeItem[];
  expenses: ExpenseItem[];
  profitLoss: ProfitLossItem[];
}
