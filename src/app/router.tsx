import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import { App } from ".";
import { Login } from "../pages/login";
import { requireAuthLoader } from "../features/auth/loaders";
import { Companies, Company } from "../features/companies/components";
import { companiesLoader, companyLoader } from "../features/companies/loaders";
import { TestArea } from "../pages/testarea";
import Dashboard from "../pages/Dashboard";
import { ModuleList } from "../features/shared/components";
import { modules } from "../features/shared/dummydata";
import { DashboardDifferedLoader } from "../features/auth/loaders/courseLoader";
import RoleSwitch from "../pages/RoleSwitch";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* requireAuthLoader is a route guard that protects the App and its child routes. */}
      {/* TODO uncomment line below and remove "<Route element={<App />} path="/"></Route>" when front end login is done */}
      <Route element={<Login />} path="/login" />
      <Route element={<App />} loader={requireAuthLoader} path="/">
        <Route
          element={<RoleSwitch />}
          path="dashboard"
          loader={DashboardDifferedLoader}
        />
        {/* TODO: remove this in a production enviroment TestArea */}
        <Route element={<TestArea />} path="/testarea" />
        {/* TODO: remove this in a production enviroment ModuleList, only here temporarily. */}
        <Route element={<ModuleList modules={modules} />} path="/modulelist" />
      </Route>
    </>
  )
);

{
  /*    <Route element={<App />} path="/"> */
}
{
  /*         <Route element={<Companies />} index loader={companiesLoader} />
<Route
  element={<Company />}
  loader={({ params }) => {
    return companyLoader(params.id);
  }}
  path="companies/:id"
/> */
}
