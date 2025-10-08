import { ReactElement, Suspense, useState } from "react";
import "../css/TeacherDashboard.css";
import DashboardNavBar, { Tab } from "./DashboardNavBar";
import CourseCreatePage from "./CourseCreatePage";
import TeacherDashboardCourses from "./TeacherDashboardCourses";
import TeacherDashboardOverview from "./TeacherDashboardOverview";
import TeacherDashboardModules from "./TeacherDashoardModules";
import ModuleCreatePage from "./ModuleCreatePage";
import { Await, useLoaderData } from "react-router";
import { IDashboardDifferedLoader } from "../../auth/loaders/dashboardLoader";
import { Spinner } from "./Spinner";
import { AwaitError } from "./AwaitError";




export default function TeacherDashboard(): ReactElement {
  const { userCourses, modules } = useLoaderData<IDashboardDifferedLoader>();
  const [tab, setTab] = useState<Tab>("overview"); //setting default tab to "overview"

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
          <Suspense fallback={<Spinner />}>
            <Await resolve={userCourses} errorElement={<AwaitError />}>
              {(uC) => (
                <TeacherDashboardCourses
                  courses={uC ? uC : []}
                  onChange={setTab}
                />
              )}
            </Await>
          </Suspense>
        )}
        {tab === "new" && <CourseCreatePage />}

        {tab === "modules" && (
          <Suspense fallback={<Spinner />}>
            <Await resolve={modules} errorElement={<AwaitError />}>
              {(m) => (
                <TeacherDashboardModules
                  modules={m ? m : []}
                  onChange={setTab}
                />
              )}
            </Await>
          </Suspense>
        )}

       {tab === "new-module" && (
        <Suspense fallback={<Spinner />}>
          <Await resolve={userCourses} errorElement={<AwaitError />}>
            {(uC) => {
              const cs = (uC ?? []).map((c: any) => ({ id: c.id, name: c.name })); 
              return <ModuleCreatePage courses={cs} />;
            }}
          </Await>
        </Suspense>
       )}
      </section>
    </main>
  );
}
