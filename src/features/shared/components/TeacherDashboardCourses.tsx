import { ReactElement, useState, useEffect } from 'react';
import "../css/TeacherDashboardCourses.css"

type Course = { name: string; startDate: string, endDate: string, students: string[], modules: string[]}
export default function TeacherDashboardCourses():ReactElement {
  
  const [courseArr, setCourseArr] = useState<Course[] | null>(null);


   useEffect(() => {
      setCourseArr([{"name": "Lexicon LTU", "startDate": "2025-09-02", "endDate": "2025-12-08", "students": ["1","1","1","1","1","1","1","1","1","1","1",], "modules": ["1","1","1","1","1",]}, {"name": "Datorkurs", "startDate": "2025-10-08", "endDate": "2025-12-19", "students": ["1","1","1","1","1","1","1","1","1","1","1","1","1","1","1",], "modules": ["1","1","1","1",]} ])
  }, []);

  return (
    <section className="dashboard-courses-container">
        <div className="card-border-radius-top">
          <h2 className="fs-5">Alla kurser</h2>
          <p className="p-gray">En översikt över alla aktiva och kommande kurser</p>
          </div>

          <div className="search-course">
            <input type="text" placeholder="Sök efter kurs..." className="search-input"/>
            <button className="create-course-button-small">
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
            {courseArr?.map((course, i) => (
              <tr key={`${course.name}-${i}`} className="table-row-white">
                <td className="bold">{course.name}</td>
                <td className="text-gray">{course.startDate} - {course.endDate}</td>
                <td>{course.students.length}</td>
                <td>{course.modules.length}</td>
              </tr>
            ))}
            {courseArr?.length === 0 && (
              <tr><td>Inga kurser ännu</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
