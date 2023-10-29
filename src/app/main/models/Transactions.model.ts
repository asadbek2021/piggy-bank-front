export interface ITransaction {
  _id: string;
  type: string;
  accountId: string;
  title: string;
  description: string;
  categories: string[];
  amount: number;
  payee: string;
  date_of_operation: string;
  createdAt: string;
  updatedAt: string;
}
