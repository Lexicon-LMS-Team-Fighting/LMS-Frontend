import { Outlet } from 'react-router';
import { Header } from '../features/shared/components';

export function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
