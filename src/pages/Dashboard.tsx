import { ReactElement } from "react";
import TeacherDashboard from "../features/shared/components/TeacherDashboard";
import StudentDashboard from "../features/shared/components/StudentDashboard";
import "../features/shared/css/Dashboard.css";
import { useLoaderData } from "react-router";
import { ICourseDifferedLoaderReturn } from "../features/auth/loaders/courseLoader";
import RoleSwitch from "./RoleSwitch";

export default function Dashboard(): ReactElement {
  const { userCourses } = useLoaderData<ICourseDifferedLoaderReturn>();

  console.log("");
  return (
    <main className="main-container bg-gray-50">
      {/* <TeacherDashboard /> */}
      <RoleSwitch />
    </main>
  );
}
