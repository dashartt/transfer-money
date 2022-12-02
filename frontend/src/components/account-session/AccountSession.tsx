import { Button, Heading, HStack, Icon, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaRegSmileBeam } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { AuthedUserDTO } from '../../types/RequestData';
import LocalStorage from '../../utils/LocalStorage';

export default function AccountSession() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const userData = LocalStorage.get('user') as AuthedUserDTO;
    setUsername(userData?.username ?? 'client');
  }, []);

  const logOut = () => {
    localStorage.removeItem('token');
    navigate('/auth');
  };

  return (
    <VStack>
      <HStack w="full" justifyContent="flex-start">
        <Heading as="h1">Hello, {username}!</Heading>
        <Icon as={FaRegSmileBeam} />
      </HStack>
      <Button
        _active={{ backgroundColor: 'main.gren' }}
        _hover={{ backgroundColor: 'main.gren', color: 'black' }}
        alignSelf="flex-start"
        color="white"
        bgColor="main.green"
        onClick={logOut}
      >
        Logout
      </Button>
    </VStack>
  );
}
