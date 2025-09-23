import { ReactElement } from 'react';
import { CourseDraft } from './CourseCreatePage'; 
import "../css/NewCourseForm.css"

type Props = {
  value: CourseDraft;
  onChange: (next: CourseDraft) => void;
  onSubmit: () => void;
  disabled?: boolean;
};

export default function AddNewCourseForm({
  value, onChange, onSubmit, disabled,
}: Props): ReactElement {

  const set = (patch: Partial<CourseDraft>) => onChange({ ...value, ...patch });

  return (
    <section className="form-wrapper shadow-sm">
           
              <h2 className="fs-5 mb-4">Skapa ny kurs</h2>
         

            
              <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
                <div className="mb-3">
                  <label htmlFor="courseName" className="form-label-bold mb-1">Kursnamn</label>
                  <input
                    id="courseName"
                    type="text"
                    className="form-control"
                    placeholder="T.ex. Lexicon LTU"
                    value={value.name}
                    onChange={(e) => set({ name: e.target.value })}
                  />
                </div>

                
                  <label htmlFor="courseDesc" className="form-label-bold mb-1">Kursbeskrivning</label>
                  <textarea
                    id="courseDesc"
                    className="form-control"
                    rows={4}
                    placeholder="Beskriv kursen"
                    value={value.description ?? ''}
                    onChange={(e) => set({ description: e.target.value || undefined })}
                  />
               

                <div className="form-input-row mt-3">
                  <div className="input-label-column">
                    <label htmlFor="startDate" className="form-label-bold mb-1">Startdatum</label>
                    <input
                      id="startDate"
                      type="date"
                      className="form-control date-input"
                      value={value.startDate}
                      onChange={(e) => set({ startDate: e.target.value })}
                    />
                  </div>

                  <div className="input-label-column">
                    <label htmlFor="endDate" className="form-label-bold mb-1">Slutdatum</label>
                    <input
                      id="endDate"
                      type="date"
                      className="form-control date-input"
                      value={value.endDate}
                      onChange={(e) => set({ endDate: e.target.value })}
                    />
                  </div>
                  </div>
                <div className="create-course-button-wrapper">
                  <button className="create-course-button">Skapa kurs</button>
                </div>
              </form>
            
    </section>
  );
}
