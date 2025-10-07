import "../css/DashboardNavBar.css";

export type Tab = "overview" | "modules" | "assignments" | "students" | "documents";

export default function TeacherCourseNavBar({
  value,
  onChange,
}: { value: Tab; onChange: (t: Tab) => void }) {

  // adding a css class if tab is active
  const cx = (t: Tab) =>
    `dashboard-nav-button ${value === t ? "is-active" : ""}`;

  return (
    <nav className="dashboard-nav">
      <button className={cx("overview")} onClick={() => onChange("overview")}>Översikt</button>
      <button className={cx("modules")}  onClick={() => onChange("modules")}>Moduler</button>
      <button className={cx("assignments")}      onClick={() => onChange("assignments")}>Inlämningar</button>
      <button className={cx("students")}      onClick={() => onChange("students")}>Studenter</button>
      <button className={cx("documents")}      onClick={() => onChange("documents")}>Dokument</button>
    </nav>
  );
}
