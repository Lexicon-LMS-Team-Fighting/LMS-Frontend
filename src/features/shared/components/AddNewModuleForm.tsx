import { useEffect, useState } from "react";

type CourseSummary = { id: string; name: string };
type ModuleDraft = {
  courseId: string;
  name: string;
  startDate: Date; 
  endDate: Date;  
  description?: string;
};

type AddModuleProps = {
  courses: CourseSummary[];
  initial?: Partial<ModuleDraft>;
  onSubmit: (draft: ModuleDraft) => void;
  disabled?: boolean;
};

export default function AddNewModule({
  courses = [],
  initial,
  onSubmit,
  disabled
}: AddModuleProps) {
  const [courseArr, setCourseArr] = useState<CourseSummary[]>(courses);


  useEffect(() => {
    if (!courses?.length) {
      setCourseArr([
        { id: "1", name: "Lexicon LTU" },
        { id: "2", name: "Datorkurs" },
        { id: "3", name: "Fullstack" },
      ]);
    }
  }, [courses]);

  const [draft, setDraft] = useState<ModuleDraft>({
    courseId: initial?.courseId ?? (courses[0]?.id ?? ""),
    name: initial?.name ?? "",
    startDate: new Date(""),
    endDate: new Date(""),
    description: initial?.description ?? "",
  });

  useEffect(() => {
    if (!draft.courseId && courseArr.length) {
      setDraft(d => ({ ...d, courseId: courseArr[0].id }));
    }
  }, [courseArr, draft.courseId]);

  const set = <K extends keyof ModuleDraft>(k: K, v: ModuleDraft[K]) =>
    setDraft(d => ({ ...d, [k]: v }));

  const isValid =
    draft.courseId &&
    draft.name.trim().length > 0 &&
    draft.startDate &&
    draft.endDate &&
    draft.startDate <= draft.endDate;

  return (
    <section className="form-wrapper shadow-sm">
      <h2 className="fs-5 mb-4">Skapa ny modul</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!isValid) return;
          onSubmit(draft);
        }}
      >
        <div className="select-wrap mb-3 cursor-pointer">
          <label htmlFor="course" className="form-label-bold mb-1">
            Välj kurs <span className="text-danger">*</span>
          </label>
          <select
            id="course"
            className="form-select cursor-pointer"
            value={draft.courseId}
            onChange={(e) => set("courseId", e.target.value)}
            disabled={disabled}
          >
            {courseArr.map(course => (
              <option key={course.id} value={course.id}>{course.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="moduleName" className="form-label-bold mb-1">
            Modulnamn <span className="text-danger">*</span>
          </label>
          <input
            id="moduleName"
            className="form-control"
            placeholder="T.ex. HTML & CSS"
            value={draft.name}
            onChange={(e) => set("name", e.target.value)}
            disabled={disabled}
          />
        </div>

        <div className="form-input-row mt-3">
          <div className="input-label-column">
            <label htmlFor="startDate" className="form-label-bold mb-1">Startdatum <span className="text-danger">*</span></label>
            <input
              id="startDate" type="date" className="form-control date-input"
              value={draft.startDate.toLocaleDateString()}    
              onChange={(e) => set("startDate", new Date(e.target.value))}
              disabled={disabled}
            />
          </div>
          <div className="input-label-column">
            <label htmlFor="endDate" className="form-label-bold mb-1">Slutdatum <span className="text-danger">*</span></label>
            <input
              id="endDate" type="date" className="form-control date-input"
              value={draft.endDate.toLocaleDateString()}
              onChange={(e) => set("endDate", new Date(e.target.value))}
              disabled={disabled}
            />
          </div>
        </div>

        <label htmlFor="moduleDesc" className="form-label-bold mb-1 mt-3">Beskrivning</label>
        <textarea
          id="moduleDesc" className="form-control" rows={4}
          value={draft.description}
          onChange={(e) => set("description", e.target.value)}
          disabled={disabled}
        />

        <div className="create-course-button-wrapper">
          <button type="submit" className="create-course-button" disabled={disabled || !isValid}>
            Lägg till
          </button>
        </div>
      </form>
    </section>
  );
}
