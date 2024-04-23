import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './Components/App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './Components/ErrorPage';
import Home from './Components/Home';
import About from './Components/About';

const container = document.getElementById('root');
const root = createRoot(container);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/recipes',
        element: null,
      },
      {
        path: '/holidaymenu',
        element: null,
      },
      {
        path: '/about',
        element: <About />,
      },
    ],
  },
]);

root.render(<RouterProvider router={router} />);
