import { useState } from 'react';
import AddNewCourseForm from './AddNewCourseForm';
import { ICourse } from '../types';
import { createCourse } from '../../auth/api/course';
import { CustomError } from '../../shared/classes';

export type CourseDraft = {
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
};

export default function CourseCreatePage() {
  const [course, setCourse] = useState<CourseDraft>({name: '', description: '', startDate: new Date(""), endDate: new Date("") });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string|null>(null);
  const [errorMsg, setErrorMsg] = useState<string|null>(null);

  const isValid =
    course.name.trim().length > 0 &&
    !!course.startDate && !!course.endDate &&
    course.startDate < course.endDate;

  async function submitCourse() {
    if (!isValid || saving) {
      setMsg(null);
       setErrorMsg("Se till att alla fält är korrekt ifyllda")
        return;} 

    setSaving(true); 
    setMsg(null);
    setErrorMsg(null);

    try {
      const created: ICourse = await createCourse(course);

      setMsg(`Kurs skapad: ${created.name}`);
      setCourse({ name: '', description: '', startDate: new Date(""), endDate: new Date("") });
    } catch (e: unknown) {
      if (e instanceof CustomError) {
        const map: Record<number, string> = {
          400: "En kurs med det namnet finns redan",
          401: "Du saknar behörighet att skapa kurser.",
          403: "Du saknar behörighet att skapa kurser.",
          404: "Kursen hittades inte.",
          500: "Ett serverfel inträffade.",
        };
        const fallback = e.message || "Ett fel inträffade.";
        setErrorMsg(map[e.errorCode] ?? fallback);
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <AddNewCourseForm
        value={course}
        onChange={setCourse}
        onSubmit={submitCourse}
        disabled={!isValid || saving}
      />
      {msg && <div className="alert alert-success mt-3">{msg}</div>}
      {errorMsg && <div className="alert alert-danger mt-3">{errorMsg}</div>}
    </div>
  );
}
