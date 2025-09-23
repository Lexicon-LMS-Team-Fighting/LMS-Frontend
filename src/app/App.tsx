import { Outlet } from 'react-router';
import { HeaderNav } from '../features/shared/components/HeaderNav';

export function App() {
  return (
    <>
      <HeaderNav />
      <Outlet />
    </>
  );
}
