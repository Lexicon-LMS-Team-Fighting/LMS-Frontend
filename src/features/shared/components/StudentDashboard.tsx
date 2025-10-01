import { ReactElement } from "react";
import "../css/StudentDashboard.css";

//TODO, take fetch data when implemented and send it down to the different components
const getWeek = (date = new Date()): { week: number; year: number } => {
  const dateObj = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  const day = dateObj.getUTCDay() || 7;
  dateObj.setUTCDate(dateObj.getUTCDate() + 4 - day);
  const isoYear = dateObj.getUTCFullYear();
  const yearStart = new Date(Date.UTC(isoYear, 0, 1));
  const week = Math.ceil(((+dateObj - +yearStart) / 86400000 + 1) / 7);
  return { week, year: isoYear };
};

export default function StudentDashboard(): ReactElement {
  const { week } = getWeek();

  return (
    <main className="main-wrapper">
      <h1 className="fs-3 mb-4">Välkommen tillbaka!</h1>

      <section className="row-space-between mb-3">
        <h2 className="fs-5">Veckans Aktiviteter</h2>
        <div className="week-banner">
          <img id="calender-icon" src="calender-icon.svg" alt="Calender" />
          <span>Vecka {week}</span>
        </div>
      </section>

      <section className="dashboard-module-section">
        <div className="dashboard-module-header">
          <img id="book-icon" src="book-icon.svg" alt="LMS logo" />
          <span className="fs-6">Modul: Javascript</span>
        </div>
        <div className="dashboard-module-content mb-5">
          <span> Module components goes here </span>
        </div>
      </section>

      <section className="dashboard-upcoming-info">
        <div className="dashboard-upcoming-assignments">
          <h4 className="fs-5 mb-3">Kommande inlämningar</h4>
          <span>Assignments component goes here</span>
        </div>
        <div className="dashboard-module-progress">
          <h4 className="fs-5 mb-3">Modulframsteg</h4>
          <span>Moduleprogress component goes here</span>
        </div>
      </section>
    </main>
  );
}
