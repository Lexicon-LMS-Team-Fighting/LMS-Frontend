import { ReactElement, useState, useEffect } from "react";
import { Link } from "react-router";
import "../css/TeacherDashboardCourses.css";
import { Tab } from "./DashboardNavBar";
import Modal from './Modal';
import UpdateForm from './UpdateForm';
import { updateCourse } from '../../auth/api/course';
import { CustomError } from '../../shared/classes';
import type { CourseDraft } from './CourseCreatePage';
import { ICourse, ICourseWithCounts } from "../types/types";

type Draft = CourseDraft
type Props = {
  courses: ICourseWithCounts[];
  onChange: (t: Tab) => void;
};
//TODO, receive course array as prop from parent instead


export default function TeacherDashboardCourses({
  courses,
  onChange,
}: Props): ReactElement {
  const [courseArr, setCourseArr] = useState<ICourseWithCounts[] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [editing, setEditing] = useState<ICourse | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);
  const [modalMsg, setModalMsg] = useState<string | null>(null);



  function openEdit(course: ICourse) {
    setEditing(course);
    setDraft({
      name: course.name,
      description: course.description ?? "",
      startDate: new Date(course.startDate),
      endDate: new Date(course.endDate)
    });
    setModalMsg(null);
  }

  const filteredArr = (courseArr ?? []).filter((c) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      c.name.toLowerCase().includes(q) ||
      new Date(c.startDate).toISOString().toLowerCase().includes(q) ||
      new Date(c.endDate).toISOString().toLowerCase().includes(q)
    );
  });

    useEffect(() => {
    setCourseArr(courses)
  },[courses])

  function renderCourse() {
    return (
      <tbody>
        {filteredArr?.map((course, i) => (
          <tr key={`${course.name}-${i}`} className="table-row-white">
            <td className="bold">{course.name}</td>
            <td className="text-gray">
              {course.startDate.toLocaleDateString()} - {" "}
              {course.endDate.toLocaleDateString()}

            </td>
            <td>{course.studentCount}</td>
            <td>{course.moduleCount}</td>
            <td className="table-links">
              <Link to={`/teacher/course/${course.id}`}>Visa</Link>{" "}
              <button className="edit-course-button" onClick={() => openEdit(course)}>Redigera</button>
            </td>
          </tr>
        ))}
              
        {courseArr?.length === 0 && (
          <tr>
            <td>Inga kurser ännu</td>
          </tr>
        )}
      </tbody>
    );
  }

const isValid =
    !!draft &&
    draft.name.trim().length > 0 &&
    !!draft.startDate && !!draft.endDate &&
    draft.startDate < draft.endDate;

  async function handleSubmit() {
      if (!editing || !draft) return;
      setSaving(true); setModalMsg(null);

      try {
        const updated: ICourse = await updateCourse(editing.id, draft); 
        setCourseArr(arr => arr?.map(c =>
          c.id === updated.id
            ? { ...c, ...updated, startDate: new Date(updated.startDate) , endDate: new Date(updated.endDate) }
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
      </div>
    </section>
  );
}
