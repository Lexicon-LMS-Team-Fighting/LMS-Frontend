import { ReactElement, Suspense, useState } from "react";
import "../css/TeacherDashboard.css";
import DashboardNavBar, { Tab } from "./DashboardNavBar";
import CourseCreatePage from "./CourseCreatePage";
import TeacherDashboardCourses from "./TeacherDashboardCourses";
import TeacherDashboardOverview from "./TeacherDashboardOverview";
import { Await, useLoaderData } from "react-router";
import { ICourseDifferedLoaderReturn } from "../../auth/loaders/courseLoader";

export default function TeacherDashboard(): ReactElement {
  const { userCourses } = useLoaderData<ICourseDifferedLoaderReturn>();

  console.log(userCourses);
  const [tab, setTab] = useState<Tab>("overview"); //setting default tab to "overview"
  console.log(tab);

  return (
    <main className="main-wrapper">
      <h1 className="fs-3 mb-4">Lärarens Dashboard</h1>

      <section className="quick-option">
        <h2 className="fs-5 mb-3">Snabbåtgärder</h2>
        <button
          className="quick-option-button shadow-sm font-weight-bold"
          onClick={() => setTab("new")}
        >
          <div className="plus-icon-container">
            <img src="plus.svg" className="asd" />
          </div>
          Skapa ny kurs
        </button>
      </section>

      <section className="tabs-container mb-4">
        <DashboardNavBar value={tab} onChange={setTab} />
      </section>

      <section className="options-view">
        {tab === "overview" && <TeacherDashboardOverview />}
        {tab === "courses" && (
          <Suspense>
            <Await resolve={userCourses}>
              {(uC) => (
                <TeacherDashboardCourses courses={uC} onChange={setTab} />
              )}
            </Await>
          </Suspense>
        )}
        {tab === "new" && <CourseCreatePage />}
      </section>
    </main>
  );
}
