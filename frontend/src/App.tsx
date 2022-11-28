import './App.css';

import { Route, Routes } from 'react-router-dom';

import AuthFormProvider from './contexts/AuthFormProvider';
import Auth from './pages/Auth';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route
        path="/auth"
        element={
          <AuthFormProvider>
            <Auth />
          </AuthFormProvider>
        }
      />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
