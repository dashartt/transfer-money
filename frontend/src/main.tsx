import './index.css';

import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import App from './App';
import theme from './styles/theme';

const container = document.getElementById('app');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
