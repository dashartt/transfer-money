import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useContext } from 'react';

import AuthForm from '../components/auth-form/AuthForm';
import { AuthFormContext, AuthFormContextValue } from '../contexts/AuthFormProvider';

export default function Auth() {
  const { tabIndex, setTabIndex } = useContext(AuthFormContext) as AuthFormContextValue;

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
      <Tabs
        isLazy
        index={tabIndex}
        onChange={(index) => setTabIndex(index)}
        backgroundColor="gray.700"
        isFitted
        variant="enclosed"
      >
        <TabList>
          <Tab
            _selected={{ bg: '#e2e8f0', color: 'black' }}
            color="white"
            borderRadius="none"
          >
            Create account
          </Tab>
          <Tab
            _selected={{ bg: '#e2e8f0', color: 'black' }}
            color="white"
            borderRadius="none"
          >
            Log in
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <AuthForm authType="register" />
          </TabPanel>
          <TabPanel>
            <AuthForm authType="login" />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}
