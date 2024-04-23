import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import Home from './components/Home';
import About from './components/About';
import Recipes from './components/Recipes';
import HolidayMenu from './components/HolidayMenu';

/**
 * Webpack will come through and replace process.env.NODE_ENV with proper value at compilation time
 */
console.log(`Web app is in ${process.env.NODE_ENV} mode 🚀`);
// const isProduction = process.env.NODE_ENV === 'production';
// Set the basename only in production for github pages in browser routing
// const basename = isProduction ? '/memes-table' : '';

const router = createHashRouter(
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
          element: <Recipes />,
        },
        {
          path: '/holiday',
          element: <HolidayMenu />,
        },
        {
          path: '/about',
          element: <About />,
        },
      ],
    },
  ]
  // { basename } //for use in browser routing, for github pages hash routing is more elegant
);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<RouterProvider router={router} />);
