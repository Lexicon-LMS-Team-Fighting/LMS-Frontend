import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import { App } from ".";
import { Login } from "../pages/login";
import { requireAuthLoader } from "../features/auth/loaders";
import { Companies, Company } from "../features/companies/components";
import { companiesLoader, companyLoader } from "../features/companies/loaders";
import { TestArea } from "../pages/testarea";
import { modules } from "../features/shared/dummydata";
import { course } from "../features/shared/dummydata/courses";
import { MyCourse } from "../pages/course";
import { ActivitiesForModule, ActivityList, ModuleList } from "../features/shared/components";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* requireAuthLoader is a route guard that protects the App and its child routes. */}
      {/* TODO uncomment line below and remove "<Route element={<App />} path="/"></Route>" when front end login is done */}
      {/* <Route element={<App />} loader={requireAuthLoader} path="/"> */}
      <Route element={<App />} path="/">
        <Route element={<Companies />} index loader={companiesLoader} />
        <Route
          element={<Company />}
          loader={({ params }) => {
            return companyLoader(params.id);
          }}
          path="companies/:id"
        />
      </Route>
      <Route element={<Login />} path="/login" />
      {/* TODO: remove this in a production enviroment TestArea */}
      <Route element={<TestArea />} path="/testarea" />
      {/* TODO: Edit this when everything else is properly implemented (Login, Header, Side Menu etc.) */}
      <Route element={<MyCourse course={course} modules={modules} />} path="/course" />
    </>
  )
);
