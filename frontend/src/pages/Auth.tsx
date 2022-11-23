import { Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import AuthForm from '../components/auth-form/AuthForm';

export default function Auth() {
  return (
    <Flex
      minH="100vh"
      justifyContent="center"
      alignItems="center"
      bgImage="url(/src/assets/wallpaperTheme1.jpg)"
      bgSize="cover"
      bgRepeat="no-repeat"
      bgPosition="center"
    >
      <Tabs isLazy backgroundColor="gray.700" isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab color="white" borderRadius="none">
            Create account
          </Tab>
          <Tab color="white" borderRadius="none">
            Log in
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <AuthForm type="register" />
          </TabPanel>
          <TabPanel>
            <AuthForm type="login" />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}
