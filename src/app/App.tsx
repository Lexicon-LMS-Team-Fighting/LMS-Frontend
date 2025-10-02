import { Outlet } from 'react-router';
import { HeaderNav } from '../features/shared/components/HeaderNav';
import RoleSwitch from '../pages/RoleSwitch';


export function App() {
  return (
    <>
      <HeaderNav />
      <Outlet />
      {/* used to chose compontents based on role */}
      <RoleSwitch />
    </>
  );
}
