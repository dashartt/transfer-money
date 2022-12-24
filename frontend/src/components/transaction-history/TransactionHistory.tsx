import { Box, Heading, HStack, Icon, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { FaHistory } from 'react-icons/fa';
import { useRecoilState } from 'recoil';

import { transactionHistoryState } from '../../recoil/atoms';
import { requestTransactionHistory } from '../../services/api';
import HistoryTable from './HistoryTable';

export default function TransactionHistory() {
  const [, setTransactions] = useRecoilState(transactionHistoryState);

  useEffect(() => {
    requestTransactionHistory().then((data) => setTransactions(data));
  }, []);

  return (
    <VStack
      alignItems="flex-start"
      w={{ base: 'full', md: 'fit-content' }}
      bg="gray.200"
      padding="2em"
      border="1px solid black"
      overflowX="scroll"
    >
      <HStack>
        <Icon as={FaHistory} />
        <Heading as="h1">History</Heading>
      </HStack>

      <HistoryTable />
    </VStack>
  );
}
