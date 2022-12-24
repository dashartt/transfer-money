import { Button, Heading, HStack, Icon, Text, VStack } from '@chakra-ui/react';
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
    localStorage.removeItem('user');
    navigate('/auth');
  };

  return (
    <HStack w="fit-content">
      <HStack w="full" justifyContent="flex-start">
        <Text fontSize="2xl" fontWeight="bold">
          Hello, {username}!
        </Text>
        <Icon as={FaRegSmileBeam} />
      </HStack>

      <Button
        _active={{ backgroundColor: 'gray.500' }}
        _hover={{ backgroundColor: 'gray.500' }}
        bgColor="gray.800"
        alignSelf="flex-start"
        color="white"
        onClick={logOut}
      >
        Logout
      </Button>
    </HStack>
  );
}
