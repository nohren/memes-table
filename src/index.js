import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './Components/App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './Components/ErrorPage';
import Home from './Components/Home';
import About from './Components/About';

/**
 * Webpack will come through and replace process.env.NODE_ENV with proper value at compilation time
 */
console.log(`Web app is in ${process.env.NODE_ENV} mode 🚀`);
const isProduction = process.env.NODE_ENV === 'production';

// Set the basename only in production for github pages
const basename = isProduction ? '/memes-table' : '';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          element: <Home />,
          index: true,
        },
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
  ],
  { basename }
);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<RouterProvider router={router} />);
