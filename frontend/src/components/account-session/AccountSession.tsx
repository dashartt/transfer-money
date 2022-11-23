import { Button, Heading, VStack } from '@chakra-ui/react';

export default function AccountSession() {
  return (
    <VStack>
      <Heading alignSelf={{ base: 'flex-start', lg: 'baseline' }} as="h1">
        Hello, username!
      </Heading>
      <Button
        _active={{ backgroundColor: 'main.gren' }}
        _hover={{ backgroundColor: 'main.gren', color: 'black' }}
        alignSelf="flex-start"
        color="white"
        bgColor="main.green"
      >
        Logout
      </Button>
    </VStack>
  );
}
