import { Entity } from '../entity';
import { Income } from '../income/income.model';
import { Expense } from '../expense/expense.model';

export class Balance extends Entity {
	init: Date;
	end: Date;
	incomes: Income[];
	expenses: Expense[];
}