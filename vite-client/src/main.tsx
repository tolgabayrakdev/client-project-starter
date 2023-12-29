import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import routes from './routes';
import Loading from './components/Loading';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <RouterProvider router={routes} />
    </Suspense>
  </React.StrictMode>,
);
