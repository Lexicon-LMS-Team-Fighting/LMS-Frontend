import { ReactElement } from "react";
import "../features/shared/css/Dashboard.css";
import { useLoaderData } from "react-router";
import { ICourseForUserDifferedLoader } from "../features/auth/loaders/courseForUserLoader";
import RoleSwitch from "./RoleSwitch";

export default function Dashboard(): ReactElement {
  return (
    <main className="main-container bg-gray-50">
      <RoleSwitch />
    </main>
  );
}
