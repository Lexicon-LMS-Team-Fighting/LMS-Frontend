import { ReactElement } from 'react';
import { CourseDraft } from './CourseCreatePage'; 

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
    <div className="container my-4 border-0">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10 col-xxl-8">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white border-0">
              <h2 className="h4 mb-0">Skapa ny kurs</h2>
            </div>

            <div className="card-body">
              <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
                <div className="mb-3">
                  <label htmlFor="courseName" className="form-label">Kursnamn</label>
                  <input
                    id="courseName"
                    type="text"
                    className="form-control"
                    placeholder="T.ex. Lexicon LTU"
                    value={value.name}
                    onChange={(e) => set({ name: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="courseDesc" className="form-label">Kursbeskrivning</label>
                  <textarea
                    id="courseDesc"
                    className="form-control"
                    rows={4}
                    placeholder="Beskriv kursen"
                    value={value.description ?? ''}
                    onChange={(e) => set({ description: e.target.value || undefined })}
                  />
                </div>

                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label htmlFor="startDate" className="form-label">Startdatum</label>
                    <input
                      id="startDate"
                      type="date"
                      className="form-control"
                      value={value.startDate}
                      onChange={(e) => set({ startDate: e.target.value })}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label htmlFor="endDate" className="form-label">Slutdatum</label>
                    <input
                      id="endDate"
                      type="date"
                      className="form-control"
                      value={value.endDate}
                      onChange={(e) => set({ endDate: e.target.value })}
                    />
                  </div>
                </div>

                
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
