import { Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';

type Props = {
  type: string;
};

export default function AuthForm({ type }: Props) {
  return (
    <VStack gap="1.3em">
      <FormControl>
        <FormLabel color="white">Username</FormLabel>
        <Input _focus={{ borderColor: 'white ' }} color="white" type="text" />
      </FormControl>

      <FormControl>
        <FormLabel color="white">Password</FormLabel>
        <Input _focus={{ borderColor: 'white ' }} color="white" type="password" />
      </FormControl>

      <Button
        _active={{ color: 'white' }}
        _hover={{ color: 'white' }}
        backgroundColor="main.green"
        width="full"
      >
        {type == 'register' ? 'Register' : 'Enter'}
      </Button>
    </VStack>
  );
}
