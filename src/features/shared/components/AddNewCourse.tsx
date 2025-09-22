import { ReactElement, useEffect, useState } from 'react';

export function AddNewCourse(): ReactElement {
  const [courseName, setCourseName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  console.log(courseName, description,startDate, endDate)

  //Checking if endDate is after startDate
  const isValidDate = (start: string, end: string):boolean => {
    let formattedStartDate = Number(start.replace(/-/g, ''));
    let formattedEndDate = Number(end.replace(/-/g, ''));

    return formattedStartDate < formattedEndDate 
  }

    useEffect(() => {
        console.log(isValidDate(startDate,endDate))
        
    }, [startDate,endDate]);

  return (
    <div className="container my-4 border-0">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10 col-xxl-8">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white border-0">
              <h2 className="h4 mb-0">Skapa ny kurs</h2>
            </div>

            <div className="card-body">
              <form>
                
                <div className="mb-3">
                  <label htmlFor="courseName" className="form-label">
                    Kursnamn
                  </label>
                  <input
                    id="courseName"
                    type="text"
                    className="form-control"
                    placeholder="T.ex. Lexicon LTU"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                  />
                </div>

                
                <div className="mb-3">
                  <label htmlFor="courseDesc" className="form-label">
                    Kursbeskrivning
                  </label>
                  <textarea
                    id="courseDesc"
                    className="form-control"
                    rows={4}
                    placeholder="Beskriv kursen"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label htmlFor="startDate" className="form-label">
                      Startdatum
                    </label>
                    <input
                      id="startDate"
                      type="date"
                      className="form-control"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label htmlFor="endDate" className="form-label">
                      Slutdatum
                    </label>
                    <input
                      id="endDate"
                      type="date"
                      className="form-control"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>

                
                <div className="d-flex gap-2 mt-4">
                  <button type="submit" className="btn btn-primary">
                    Skapa kurs
                  </button>
                  <button type="button" className="btn btn-outline-secondary">
                    Avbryt
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Sektion: Lägg till moduler (kan byggas ut senare) */}
          <div className="mt-4">
            <button type="button" className="btn btn-light border">
              + Lägg till modul
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
