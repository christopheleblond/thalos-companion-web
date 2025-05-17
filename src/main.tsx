import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router-dom';
import App from './App';
import AgendaPage from './app/Agenda';
import HomePage from './app/Home';
import KeysPage from './app/Keys';

import './index.css';
// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import SettingsPage from './app/Settings';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
        {
          path: '/agenda',
          element: <AgendaPage />,
        },
        {
          path: '/keys',
          element: <KeysPage />,
        },
        {
          path: '/settings',
          element: <SettingsPage />,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
