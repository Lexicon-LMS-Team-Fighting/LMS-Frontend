import "../css/DashboardNavBar.css";

export type Tab = "overview" | "courses" | "new";

export default function DashboardNavBar({
  value,
  onChange,
}: { value: Tab; onChange: (t: Tab) => void }) {

  // adding a css class if tab is active
  const cx = (t: Tab) =>
    `dashboard-nav-button ${value === t ? "is-active" : ""}`;

  return (
    <nav className="dashboard-nav">
      <button className={cx("overview")} onClick={() => onChange("overview")}>Översikt</button>
      <button className={cx("courses")}  onClick={() => onChange("courses")}>Kurser</button>
      <button className={cx("new")}      onClick={() => onChange("new")}>Skapa ny kurs</button>
    </nav>
  );
}
