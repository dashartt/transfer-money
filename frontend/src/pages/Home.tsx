import { VStack } from '@chakra-ui/react';

import Header from '../components/header/Header';
import History from '../components/transaction-history/TransactionHistory';
import Transfer from '../components/transfer/Transfer';

export default function Home() {
  return (
    <>
      <Header />
      <VStack
        gap="2em"
        as="main"
        minH="100vh"
        alignItems="center"
        bg="gray.800"
        padding={{ base: 'auto', lg: '10em' }}
      >
        <Transfer />
        <History />
      </VStack>
    </>
  );
}
