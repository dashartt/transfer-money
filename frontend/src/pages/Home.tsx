import { Box, SimpleGrid, Stack } from '@chakra-ui/react';

import AccountSession from '../components/account-session/AccountSession';
import Balance from '../components/balance/Balance';
import History from '../components/transaction-history/TransactionHistory';
import Transfer from '../components/transfer/Transfer';

export default function Home() {
  return (
    <Box minH="100vh" bg="main.green" padding={{ base: 'auto', lg: '10em' }}>
      <SimpleGrid columns={1} spacing={5} maxW="container.lg" margin="0 auto">
        <Stack
          direction={{ base: 'column', sm: 'row' }}
          bg="whitesmoke"
          padding="2em"
          border="1px solid black"
          justifyContent="space-between"
        >
          <AccountSession />
          <Balance />
        </Stack>
        <Box bg="whitesmoke" padding="2em" border="1px solid black">
          <Transfer />
        </Box>
        <Box bg="whitesmoke" padding="2em" border="1px solid black">
          <History />
        </Box>
      </SimpleGrid>
    </Box>
  );
}
