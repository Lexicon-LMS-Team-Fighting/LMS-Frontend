import { useState } from 'react';
import AddNewCourseForm from './AddNewCourseForm';
// import { createCourse } from 'path-to-api'; 
// import {AddNewModule} from 'path-to-modulecomponent'

export type CourseDraft = {
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
};

export default function CourseCreatePage() {
  const [course, setCourse] = useState<CourseDraft>({
    name: '', description: '', startDate: '', endDate: ''
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string|null>(null);

  const isValid =
    course.name.trim().length > 0 &&
    !!course.startDate && !!course.endDate &&
    course.startDate < course.endDate;

  async function postCourse() {
    if (!isValid || saving) return;
    setSaving(true); setMsg(null);
    try {
      // Todo, make API-call here
      // await <insertFetchFunctionOrHookHere>({ ...course });
      setMsg('Kurs skapad');
      setCourse({ name: '', description: '', startDate: '', endDate: '' });
    } catch (e:any) {
      setMsg(e?.message ?? 'Kunde inte spara kursen');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <AddNewCourseForm
        value={course}
        onChange={setCourse}
        onSubmit={postCourse}
        disabled={!isValid || saving}
      />
      {msg && <div className="alert alert-info mt-3">{msg}</div>}
    </div>
  );
}
