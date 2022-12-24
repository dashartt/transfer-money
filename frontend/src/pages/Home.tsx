import { VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/header/Header';
import History from '../components/transaction-history/TransactionHistory';
import Transfer from '../components/transfer/Transfer';
import LocalStorage from '../utils/LocalStorage';

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    const data = LocalStorage.get('user');
    if (!data) {
      navigate('/auth');
    }
  }, []);

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
