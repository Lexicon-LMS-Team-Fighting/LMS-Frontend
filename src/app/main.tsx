import '../css/index.css';

import { createRoot } from 'react-dom/client';
import { router } from '.';
import { AuthProvider } from '../features/auth/context/authProvider';
import { RouterProvider } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')!).render(
  //TODO: Authprovider needs to be uncommented once Login is done
  // <AuthProvider>
    <RouterProvider router={router} />
  // </AuthProvider>
);
