import { Button, Heading, HStack, Icon, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaRegSmileBeam } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { AuthedUserDTO } from '../../types/RequestData';

export default function AccountSession() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '') as AuthedUserDTO;
    setUsername(user.username);
  }, []);

  const logOut = () => {
    localStorage.removeItem('token');
    navigate('/auth');
  };

  return (
    <VStack>
      <HStack>
        <Heading alignSelf={{ base: 'flex-start', lg: 'baseline' }} as="h1">
          Hello, {username}!
        </Heading>
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
