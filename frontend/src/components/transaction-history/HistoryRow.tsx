import { Tbody, Td, Tr } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { requestTransactionHistory } from '../../services/api';
import { TransactionDTO } from '../../types/Transaction';
import HistoryRowHelper from './HistoryRowHelper';

function HistoryRow() {
  const [transactions, setTransactions] = useState<TransactionDTO[]>([]);

  useEffect(() => {
    requestTransactionHistory().then((data) => {
      setTransactions(data);
    });
  }, []);

  return (
    <Tbody>
      {transactions?.map((transaction) => (
        <Tr key={uuidv4()}>
          <HistoryRowHelper transaction={transaction} />
        </Tr>
      ))}
    </Tbody>
  );
}

export default HistoryRow;
