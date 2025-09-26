import { ReactElement } from "react";
import "../css/TeacherDashboardOverview.css"
import { Link } from "react-router";

//TODO, If needed, send down props to used components
export default function TeacherDashboardOverview(): ReactElement{
 


  return (
    <section>
      <div className="teacher-active-wrapper mb-4">
        
        <div className="teacher-courses-wrapper">
      <div className="teacher-active-courses-header">
        <h3 className="fs-5">Aktiva kurser</h3>
        {/* TODO, make sure this points to the correct route when implemented */}
        <Link to="/courses/all"> Visa alla <span><img id="right-arrow" src="right-arrow-blue.svg"/></span></Link>
        </div>

        <div className="teacher-courses-content">
            <span> Courses compontent goes here</span>
            
        </div>
      </div>

      <div className="teacher-latest-activity-wrapper">
        <div className="teacher-latest-activity-header">
        <h3 className="fs-5">Senaste aktivitet</h3>
        </div>
        <div className="teacher-latest-activity-content">
            <span>Latest Activity goes here</span>
        </div>
      </div>
      </div>

      <section>
        <div className="teacher-upcoming-activities">
          <h3 className="fs-5">
            Kommande aktiviteter
          </h3>

          <div className="upcoming-activities-content">
              <span>Activity components goes here</span>
          </div>
        </div>
      </section>
    </section>
  );
}
