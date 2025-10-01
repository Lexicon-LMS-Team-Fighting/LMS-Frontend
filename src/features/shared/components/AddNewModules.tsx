import { useState,useEffect } from "react";

type CourseSummary = { id: string; name: string };
type ModuleDraft = {
  courseId: string;
  name: string;
  startDate: string;
  endDate: string;
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
  const [draft, setDraft] = useState<ModuleDraft>({
    courseId: initial?.courseId ?? courses[0]?.id ?? "",
    name: initial?.name ?? "",
    startDate: initial?.startDate ?? "",
    endDate: initial?.endDate ?? "",
    description: initial?.description ?? "",
  });


    const [courseArr, setCourseArr] = useState<CourseSummary[] | null>(null);
  
  

  // the useeffects are here to see if it works and not crash the component while nothing is sending props
     useEffect(() => {
        setCourseArr([{"id":"1", "name": "Lexicon LTU"}, {"id":"2", "name": "Datorkurs"}, {"id":"3", "name": "Fullstack"}])
    }, []);

    useEffect(() => {
  if (!draft.courseId && courseArr?.length) {
    setDraft(d => ({ ...d, courseId: courseArr[0].id }));
  }
}, [courseArr, draft.courseId]);
  
  const set = <K extends keyof ModuleDraft>(k: K, v: ModuleDraft[K]) =>
    setDraft(d => ({ ...d, [k]: v }));

  return (
    <section className="form-wrapper shadow-sm">
      <h2 className="fs-5 mb-4">Lägg till modul</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(draft);
        }}
      >

        <div className="select-wrap mb-3 cursor-pointer">
          <label htmlFor="course" className="form-label-bold mb-1">Välj kurs <span className="text-danger">*</span></label>
          <select
            id="course"
            className="form-select cursor-pointer"
            value={draft.courseId}
            onChange={(e) => set("courseId", e.target.value)}
            disabled={disabled}
          >
            {courseArr?.map(course => (
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
              value={draft.startDate}
              onChange={(e) => set("startDate", e.target.value)}
              disabled={disabled}
            />
          </div>
          <div className="input-label-column">
            <label htmlFor="endDate" className="form-label-bold mb-1">Slutdatum <span className="text-danger">*</span></label>
            <input
              id="endDate" type="date" className="form-control date-input"
              value={draft.endDate}
              onChange={(e) => set("endDate", e.target.value)}
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
          <button type="submit" className="create-course-button" disabled={disabled}>Lägg till</button>
        </div>
      </form>
    </section>
  );
}
