import { ReactElement, useState } from "react";
import { Link } from "react-router";
import "../css/TeacherDashboardCourses.css";
import { Tab } from "./DashboardNavBar";
import { ICourse } from "../types/types";

type Props = {
  courses: ICourse[];
  onChange: (t: Tab) => void;
};

export default function TeacherDashboardCourses({
  courses,
  onChange,
}: Props): ReactElement {
  const [searchQuery, setSearchQuery] = useState("");

  courses = courses.filter((c) => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return true;

    return (
      c.name.toLowerCase().includes(query) ||
      c.startDate.toISOString().toLowerCase().includes(query) ||
      c.endDate.toISOString().toLowerCase().includes(query)
    );
  });

  function renderCourse() {
    return (
      <tbody>
        {courses?.map((course, i) => (
          <tr key={`${course.name}-${i}`} className="table-row-white">
            <td className="bold">{course.name}</td>
            <td className="text-gray">
              {course.startDate.toLocaleDateString()} -{" "}
              {course.endDate.toLocaleDateString()}
            </td>
            {/* Activate when modules and students get added. */}
            {/* <td>{course.students.length}</td> */}
            {/* <td>{course.modules.length}</td> */}
            {/*TODO, make sure we have the correct routes*/}
            <td className="table-links">
              <Link to={`/teacher/course/${course.id}`}>Visa</Link>{" "}
              <Link to={`/teacher/course/edit/${course.id}`}>Redigera</Link>
            </td>
          </tr>
        ))}
        {courses?.length === 0 && (
          <tr>
            <td>Inga kurser ännu</td>
          </tr>
        )}
      </tbody>
    );
  }

  return (
    <section className="dashboard-courses-container">
      <div className="card-border-radius-top">
        <h2 className="fs-5">Alla kurser</h2>
        <p className="p-gray">
          En översikt över alla aktiva och kommande kurser
        </p>
      </div>

      <div className="search-course">
        <input
          type="text"
          placeholder="Sök efter kurs..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button
          className="create-course-button-small"
          onClick={() => onChange("new")}
        >
          <img src="plus-white.svg" id="plus-icon" />
          Ny kurs
        </button>
      </div>

      <div className="courses-table-wrapper">
        <table className="courses-table">
          <thead>
            <tr className="table-header">
              <th>KURSNAMN</th>
              <th>PERIOD</th>
              <th>ELEVER</th>
              <th>MODULER</th>
            </tr>
          </thead>
          {renderCourse()}
        </table>
      </div>
    </section>
  );
}
