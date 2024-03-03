import React from 'react';
import { Container } from '@material-ui/core';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import { createBrowserRouter , RouterProvider } from 'react-router-dom';
const App = () => {
  const router = createBrowserRouter([
    {path: '/' , element: <Navbar/>, children: [
      {index: true, element: <Home/>},
      {path: 'auth', element: <Auth/>}
    ]}
  ])
  return (
    <Container maxWidth="lg">
      <RouterProvider router={router} />
    </Container>
  );
};

export default App;
