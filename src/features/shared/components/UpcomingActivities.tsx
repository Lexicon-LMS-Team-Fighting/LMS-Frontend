import { IUpcomingActivity } from "../types";
import { TitleCourse } from "./TitleCourse";
import "../css/UpcomingActivities.css";

interface IActivityListProps {
  activities: IUpcomingActivity[];
  count: number;
}

export const UpcomingActivities: React.FC<IActivityListProps> = ({ activities, count }) => {


  if (!activities || activities.length === 0) {
    return <p>Inga kommande aktiviteter</p>;
  }

  console.log("Activities in UpcomingActivities component:", activities);
  const act = activities.slice(0, count); // Show only the first 5 activities

  return (
    <section className="uc-activity-list-section">
      <ul className="list-group uc-activity-list-group">
        {act?.map((activity) => {
          return (
            <li
              key={activity.id}
              className={`uc-activity-list-item list-group ${activity.description ? "clickable" : ""}`}
            >
              <div className="uc-activity-list-box">
                <TitleCourse
                  title={activity.name}
                  startDate={activity.startDate.toISOString().split("T")[0]}
                  activityType={activity.activityTypeName}
                  courseName={activity.courseName}
                />

                <div className="document-status-container">
                  {/* <span className="material-symbols-outlined hidden">calendar_today</span>
                  <p className="titledate-date">{activity.startDate}</p> */}
                  {/* TODO: This should be correctly implemented once the backend part for handling documents is in place */}
                  {
                  <TitleCourse startDate={activity.startDate.toISOString().split("T")[0]}/>
                  }
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
