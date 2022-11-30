import { Box, Heading, HStack, Icon, VStack } from '@chakra-ui/react';
import { FaHistory } from 'react-icons/fa';

import HistoryTable from './HistoryTable';

export default function History() {
  return (
    <Box>
      <VStack alignItems="flex-start">
        <HStack>
          <Icon fontSize="2em" as={FaHistory} />
          <Heading as="h1">History</Heading>
        </HStack>

        <HistoryTable />
      </VStack>
    </Box>
  );
}
