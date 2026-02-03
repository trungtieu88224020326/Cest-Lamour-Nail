
import { IncomeItem, ExpenseItem, ProfitLossItem } from './types';

export const INITIAL_INCOME: IncomeItem[] = [
  { id: '1', item: 'Cest Lamour Nail 1', credit: 44010.57, cash: 10078.15, amount: 54088.72 },
  { id: '2', item: 'Cest Lamour Nail 2', credit: 52250.00, cash: 10033.00, amount: 62283.00 },
  { id: '3', item: 'Cest Lamour Nail 3', credit: 75347.27, cash: 21528.69, amount: 96875.96 },
  { id: '4', item: 'Cest Lamour Nail 4', credit: 22539.00, cash: 5229.00, amount: 27768.00 },
  { id: '5', item: 'Cest Lamour Nail 5', credit: 66339.14, cash: 18403.20, amount: 84742.34 },
];

export const INITIAL_EXPENSES: ExpenseItem[] = [
  { id: 'e1', item: '1. Employees salaries and wages', amount: 0.00 },
  { id: 'e2', item: '2. Employees salaries cash', amount: 16560.00 },
  { id: 'e3', item: '3. Corp officers code form 1125E', amount: 0.00 },
  { id: 'e4', item: '4. Rents', amount: 0.00 },
  { id: 'e5', item: '5a) Tax941', amount: 0.00 },
  { id: 'e6', item: '5. Taxes and licenses', amount: 0.00 },
  { id: 'e7', item: '6. Repairs and maintenance', amount: 0.00 },
  { id: 'e8', item: '7. Legal and professional', amount: 0.00 },
  { id: 'e9', item: '8. Depreciation from (form 4562) code', amount: 0.00 },
  { id: 'e10', item: '9. Miscellaneous', amount: 0.00 },
  { id: 'e11', item: 'a10. Towels service', amount: 0.00 },
  { id: 'e12', item: 'b11. Cleaning service', amount: 0.00 },
  { id: 'e13', item: 'c12. Merchant fees', amount: 0.00 },
  { id: 'e14', item: 'd13. Office expense', amount: 0.00 },
  { id: 'e15', item: 'e14. Security system', amount: 0.00 },
];

export const PROFIT_LOSS: ProfitLossItem[] = [
  { month: 'April', income: 325758.02, expenses: 104839.00, amount: 220919.02 },
];

export const NAV_ITEMS = ['MONTH', 'QUARTERLY', 'YEAR', 'REPORT', 'CATEGORY', 'LogOff'];

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const YEARS = [2023, 2024, 2025];

export const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
