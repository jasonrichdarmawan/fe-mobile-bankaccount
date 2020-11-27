import React from 'react';
import HistorySelect from './HistorySelect.component';
import {TransactionModel} from './HistorySelect.service';
import Transactions from './Transactions.component';

const History = () => {
  const [isTransactionsShown, setIsTransactionsShown] = React.useState(false);

  const [transactions, setTransactions] = React.useState<TransactionModel[]>(
    [],
  );

  return (
    <>
      {!isTransactionsShown ? (
        <HistorySelect
          setTransactions={setTransactions}
          setIsTransactionsShown={setIsTransactionsShown}
        />
      ) : (
        <Transactions transactions={transactions} />
      )}
    </>
  );
};

export default History;
