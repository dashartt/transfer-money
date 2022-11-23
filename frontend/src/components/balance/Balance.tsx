import { Box, Heading, Text, VStack } from '@chakra-ui/react';

export default function Balance() {
  return (
    <Box>
      <VStack justifyContent="space-between">
        <Heading alignSelf={{ base: 'flex-start', lg: 'baseline' }} as="h1">
          Balance
        </Heading>
        <Text alignSelf="flex-start" fontWeight="bold">
          R$0.0
        </Text>
      </VStack>
    </Box>
  );
}
