import { ReactElement, useState, useEffect } from 'react';
import { Link } from 'react-router';
import "../css/TeacherDashboardCourses.css"
import { Tab } from "./DashboardNavBar";
import Modal from './Modal';
import UpdateForm from './UpdateForm';
import { updateCourse } from '../../auth/api/course';
import { CustomError } from '../../shared/classes';
import type { CourseDraft } from './CourseCreatePage';
import { ICourse } from '../types';

type Course = {id: string, name: string; startDate: string, endDate: string, students: string[], modules: string[], description: string}
type Draft = CourseDraft
type Props = { onChange: (t: Tab) => void };
//TODO, receive course array as prop from parent instead

export default function TeacherDashboardCourses({ onChange }: Props):ReactElement {
  const [courseArr, setCourseArr] = useState<Course[] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [editing, setEditing] = useState<Course | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);
  const [modalMsg, setModalMsg] = useState<string | null>(null);

  function openEdit(course: Course) {
    setEditing(course);
    setDraft({
      name: course.name,
      description: course.description ?? "",
      startDate: course.startDate.slice(0, 10),
      endDate: course.endDate.slice(0, 10),
    });
    setModalMsg(null);
  }

  const filteredArr = !courseArr
  ? [] : courseArr.filter(c => {
      const query = searchQuery.trim().toLowerCase();
      if (!query) return true;
      return (
        c.name.toLowerCase().includes(query) ||
        c.startDate.includes(query) ||
        c.endDate.includes(query)
      );
    });

  useEffect(() => {
    setCourseArr([
      { id: "f82025d8-01a6-445c-9e9e-e73a9e8332cb", name: "Lexicon LTU", description:"test", startDate: "2025-09-02", endDate: "2025-12-08", students: Array(11).fill("1"), modules: Array(5).fill("1") },
      { id: "2", name: "Datorkurs", description:"test" ,  startDate: "2025-10-08", endDate: "2025-12-19", students: Array(15).fill("1"), modules: Array(4).fill("1") }
    ]);
  }, []);

const isValid =
    !!draft &&
    draft.name.trim().length > 0 &&
    !!draft.startDate && !!draft.endDate &&
    draft.startDate < draft.endDate;

  async function handleSubmit() {
      if (!editing || !draft) return;
      setSaving(true); setModalMsg(null);

      try {
            console.log(3)
        const updated: ICourse = await updateCourse(editing.id, draft); 
        setCourseArr(arr => arr?.map(c =>
          c.id === updated.id
            ? { ...c, ...updated, startDate: updated.startDate.slice(0,10), endDate: updated.endDate.slice(0,10) }
            : c
        ) ?? arr);
        setEditing(null);
        setDraft(null);
        setModalMsg(`${updated.name} har uppdaterats`);
      } catch (e: unknown) {
      if (e instanceof CustomError) {
        const map: Record<number, string> = {
          400: "Kontrollera att fälten är korrekt ifyllda",
          401: "Du saknar behörighet att ändra kurser.",
          403: "Du saknar behörighet att ändra kurser.",
          404: "Kursen hittades inte.",
          500: "Ett serverfel inträffade.",
        };
        const fallback = e.message || "Ett fel inträffade.";
        setModalMsg(map[e.errorCode] ?? fallback);
      }
      } finally {
        setSaving(false);
      }
}

  return (
    <section className="dashboard-courses-container">
        <div className="card-border-radius-top">
          <h2 className="fs-5">Alla kurser</h2>
          <p className="p-gray">En översikt över alla aktiva och kommande kurser</p>
          </div>

          <div className="search-course">
            <input type="text" 
            placeholder="Sök efter kurs..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}/>
            
            <button className="create-course-button-small" onClick={() => onChange("new")}>
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
                <td className="text-gray">{course.startDate} - {course.endDate}</td>
                <td>{course.students.length}</td>
                <td>{course.modules.length}</td>
                {/*TODO, make sure we have the correct routes*/ }
                <td className="table-links">
                  <Link to={`/course/${course.id}`}>Visa</Link>
                  <button className="edit-course-button" onClick={() => openEdit(course)}>Redigera</button>
                  </td>
              </tr>
            ))}
        
               <Modal open={!!editing} onClose={() => { setEditing(null); setDraft(null); }}>
              {editing && draft && (
                <>
                  <UpdateForm
                    data={draft}
                    buttonText="Spara ändringar"
                    title={`Redigerar kurs: ${editing.name}`}
                    onChange={setDraft}        
                    onSubmit={handleSubmit}        
                    disabled={!isValid || saving}
                  />
                  {modalMsg && (
                    <div className="alert alert-danger mt-2">{modalMsg}</div>
                  )}
                </>
              )}
            </Modal>
          
            {filteredArr?.length === 0 && (
              <tr><td>Inga kurser ännu</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
