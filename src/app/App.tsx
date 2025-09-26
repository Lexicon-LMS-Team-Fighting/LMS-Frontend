import { Outlet } from 'react-router';
import { HeaderNav } from '../features/shared/components/HeaderNav';
import { SideBar } from '../features/shared/components/SideBar';

export function App() {
  return (
    <>
      <HeaderNav />
      <SideBar />
      <Outlet />
    </>
  );
}
