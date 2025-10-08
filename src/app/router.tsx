import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import { App } from ".";
import { Login } from "../pages/login";
import { requireAuthLoader } from "../features/auth/loaders";
import { TestArea } from "../pages/testarea";
import { DashboardDifferedLoader } from "../features/auth/loaders/dashboardLoader";
import RoleSwitch from "../pages/RoleSwitch";
import { MyCourse } from "../pages/course/MyCourse";
import { MyCourseDifferedLoader } from "../features/auth/loaders/myCourseLoader";
import { RouterError } from "../features/shared/components/RouterError";
import { TeacherCourses } from "../pages/teacherCourses";
import { TeacherCoursesDifferedLoader } from "../features/auth/loaders/coursesLoader";
import { CourseParticipants } from "../pages/courseparticipant";
import Users from "../pages/Users";
import { usersDeferredLoader } from "../features/auth/loaders/UsersLoader";
import { participantsLoader } from "../features/auth/loaders/participantsLoader";
import { UpcomingActivities } from "../features/shared/components/UpcomingActivities";

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
          errorElement={<RouterError />}
        />
                <Route
          element={<Users />}
          path="users"
          loader={usersDeferredLoader}
          errorElement={<RouterError />}
        />
        {/* TODO: remove this in a production enviroment TestArea */}
        <Route element={<TestArea />} path="/testarea" />
        {/* TODO: Edit this when everything else is properly implemented (Login, Header, Side Menu etc.) */}
        <Route
          element={<MyCourse />}
          path="/courses"
          loader={MyCourseDifferedLoader}
          errorElement={<RouterError />}
        />
        <Route
          element={<TeacherCourses />}
          path="/teacher-courses"
          loader={TeacherCoursesDifferedLoader}
          errorElement={<RouterError />}
        />
        <Route
          element={<CourseParticipants />}
          path="/participants"
          loader={participantsLoader}
          errorElement={<RouterError />}
        />
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
