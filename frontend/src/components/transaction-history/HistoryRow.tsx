import { Tbody, Td, Tr } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { requestTransactionHistory } from '../../services/api';
import { TransactionDTO } from '../../types/Transaction';

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
          <Td>{transaction?.date}</Td>
          <Td>{`${transaction.debitedAccount} -> ${transaction.creditedAccount} `}</Td>
          <Td>{`R$${transaction.inCome.toLocaleString('pt-BR')}`}</Td>
          <Td>{`R$${transaction.outCome.toLocaleString('pt-BR')}`}</Td>
        </Tr>
      ))}
    </Tbody>
  );
}

export default HistoryRow;
