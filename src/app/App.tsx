import { Outlet } from "react-router";
import { HeaderNav } from "../features/shared/components/HeaderNav";
import Menu from "../features/shared/components/Menu";

export function App() {
  return (
    <>
      <HeaderNav />
      <div className="master-row">
        <Menu />
        <Outlet />
      </div>
    </>
  );
}
