import { Box, Text } from '@chakra-ui/react';

type Props = {
  messageList: string[] | string;
};

function FormatMessageApi({ messageList }: Props) {
  if (!Array.isArray(messageList)) {
    return <Text>{messageList} </Text>;
  }

  let formatMessage = `Oops, something happened!
Reasons found:`;

  messageList.forEach((message) => {
    formatMessage = formatMessage.concat(`- ${message}\n`);
  });
  return (
    <Box>
      <Text>Oops, something happened!</Text>
      <Text>Reasons found:</Text>
      {messageList.map((message, index) => (
        <Text key={`${message.slice(0, 3)}-${index}`}>{`- ${message}`}</Text>
      ))}
    </Box>
  );
}

export default FormatMessageApi;
