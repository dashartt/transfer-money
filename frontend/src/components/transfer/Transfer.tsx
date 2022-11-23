import { Box, Button, Heading, HStack, Icon, Input, Stack } from '@chakra-ui/react';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';

export default function Transfer() {
  return (
    <Box>
      <Stack direction={{ base: 'column', md: 'row' }} justifyContent="space-between">
        <HStack>
          <Icon fontSize="2em" as={RiMoneyDollarCircleLine} />
          <Heading as="h1">Transfer</Heading>
        </HStack>

        <HStack justifyContent="space-between">
          <Input
            placeholder="username here"
            borderColor="main.green"
            _focus={{ borderColor: 'white ' }}
            color="white"
            type="number"
          />
          <Button
            _active={{ backgroundColor: 'main.gren' }}
            _hover={{ backgroundColor: 'main.gren', color: 'black' }}
            alignSelf="flex-end"
            color="white"
            bgColor="main.green"
          >
            Send
          </Button>
        </HStack>
      </Stack>
    </Box>
  );
}
