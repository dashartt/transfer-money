import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

export default function HistoryTable() {
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
        <Tbody>
          <Tr>
            <Td>11/01/2022</Td>
            <Td>Spotfy Plan</Td>
            <Td isNumeric>25.4</Td>
            <Td isNumeric>1990.3</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}
