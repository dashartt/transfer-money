import { Flex, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';

import AuthForm from '../components/auth-form/AuthForm';
import { authFormState } from '../recoil/atoms';

export default function Auth() {
  const [tabIndex, setTabIndex] = useRecoilState(authFormState);

  return (
    <Flex
      minH="100vh"
      justifyContent="center"
      alignItems="center"
      bgImage="url(/src/assets/wallpaperTheme1.jpg)"
      bgSize="cover"
      bgRepeat="no-repeat"
      bgPosition="center"
      direction="column"
    >
      <Heading
        as="h1"
        bg="gray.800"
        w="fit-content"
        color="gray.200"
        textAlign="center"
        p="10"
        mb="10"
      >
        Transfer Money App
      </Heading>
      <Tabs
        isLazy
        index={tabIndex}
        onChange={(index) => setTabIndex(index)}
        backgroundColor="gray.800"
        isFitted
        variant="enclosed"
      >
        <TabList>
          <Tab
            _selected={{ bg: 'gray.200', color: 'black' }}
            color="white"
            borderRadius="none"
          >
            Create account
          </Tab>
          <Tab
            _selected={{ bg: 'gray.200', color: 'black' }}
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
