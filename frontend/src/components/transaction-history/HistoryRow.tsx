import { Tbody, Tr } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

import { transactionHistoryState } from '../../recoil/atoms';
import { requestTransactionHistory } from '../../services/api';
import HistoryRowHelper from './HistoryRowHelper';

function HistoryRow() {
  const [transactions, setTransactions] = useRecoilState(transactionHistoryState);

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
