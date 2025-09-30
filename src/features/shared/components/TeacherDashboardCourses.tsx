import { ReactElement, useState, useEffect } from "react";
import { Link } from "react-router";
import "../css/TeacherDashboardCourses.css";
import { Tab } from "./DashboardNavBar";
import { ICourse } from "../types/types";

// type Course = {
//   id: string;
//   name: string;
//   startDate: string;
//   endDate: string;
//   students: string[];
//   modules: string[];
// };

type Props = {
  courses: ICourse[];
  onChange: (t: Tab) => void;
};

//TODO, receive course array as prop from parent instead

export default function TeacherDashboardCourses({
  courses,
  onChange,
}: Props): ReactElement {
  const [courseArr, setCourseArr] = useState<ICourse[] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArr = !courseArr
    ? []
    : courseArr.filter((c) => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return true;
        return (
          c.name.toLowerCase().includes(query) ||
          c.startDate.toISOString().toLowerCase().includes(query) ||
          c.endDate.toISOString().toLowerCase().includes(query)
        );
      });

  useEffect(() => {
    setCourseArr(courses);
    // setCourseArr([
    //   {
    //     id: "1",
    //     name: "Lexicon LTU",
    //     startDate: "2025-09-02",
    //     endDate: "2025-12-08",
    //     students: ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1"],
    //     modules: ["1", "1", "1", "1", "1"],
    //   },
    //   {
    //     id: "1",
    //     name: "Datorkurs",
    //     startDate: "2025-10-08",
    //     endDate: "2025-12-19",
    //     students: [
    //       "1",
    //       "1",
    //       "1",
    //       "1",
    //       "1",
    //       "1",
    //       "1",
    //       "1",
    //       "1",
    //       "1",
    //       "1",
    //       "1",
    //       "1",
    //       "1",
    //       "1",
    //     ],
    //     modules: ["1", "1", "1", "1"],
    //   },
    // ]);
  }, []);

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
          <tbody>
            {filteredArr?.map((course, i) => (
              <tr key={`${course.name}-${i}`} className="table-row-white">
                <td className="bold">{course.name}</td>
                <td className="text-gray">
                  {course.startDate.toISOString()} -{" "}
                  {course.endDate.toISOString()}
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
            {filteredArr?.length === 0 && (
              <tr>
                <td>Inga kurser ännu</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
