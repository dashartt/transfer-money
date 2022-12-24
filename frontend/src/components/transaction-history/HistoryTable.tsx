import {
  Alert,
  AlertIcon,
  Table,
  TableContainer,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useRecoilState } from 'recoil';

import { transactionHistoryState } from '../../recoil/atoms';
import HistoryRow from './HistoryRow';

function HistoryTable() {
  const [transactions] = useRecoilState(transactionHistoryState);

  return (
    <>
      {transactions.length > 0 ? (
        <TableContainer width="full">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th>Description</Th>
                <Th>Income</Th>
              </Tr>
            </Thead>
            <HistoryRow />
          </Table>
        </TableContainer>
      ) : (
        <Alert status="warning">
          <AlertIcon />
          No account movements found in transaction history
        </Alert>
      )}
    </>
  );
}

export default HistoryTable;
