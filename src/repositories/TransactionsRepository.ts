import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const transactions = this.all();

    const income = transactions.reduce(
      (acumulador: number, valorAtual: Transaction) => {
        if (valorAtual.type === 'income') {
          return acumulador + valorAtual.value;
        }
        return acumulador;
      },
      0,
    );

    const outcome = transactions.reduce(
      (acumulador: number, valorAtual: Transaction) => {
        if (valorAtual.type === 'outcome') {
          return acumulador + valorAtual.value;
        }
        return acumulador;
      },
      0,
    );

    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
