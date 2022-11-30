import { Table, TableContainer, Th, Thead, Tr } from '@chakra-ui/react';

import HistoryRow from './HistoryRow';

function HistoryTable() {
  return (
    <TableContainer width="full">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th>Description</Th>
            <Th isNumeric>Income</Th>
            <Th isNumeric>Outcome</Th>
          </Tr>
        </Thead>
        <HistoryRow />
      </Table>
    </TableContainer>
  );
}

export default HistoryTable;
