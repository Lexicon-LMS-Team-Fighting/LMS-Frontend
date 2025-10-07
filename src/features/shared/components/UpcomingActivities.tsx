// import { useState } from "react";
import { IActivity, IUpcomingActivity } from "../types";
import { TitleCourse } from "./TitleCourse";
import "../css/UpcomingActivities.css";

//TODO fix this later when activities are being fetched from backend
interface IActivityListProps {
  activities: IUpcomingActivity[];
  count: number;
}

export const UpcomingActivities: React.FC<IActivityListProps> = ({ activities, count }) => {
  //console.log("Activities in UpcomingActivities", activities);
  // const activities = devPops;
  // const [expandedActivities, setExpandedActivities] = useState<string[]>([]);

  const handleClick = (activity: IActivity) => {
    if (!activity.description) return;

    setExpandedActivities((prev) =>
      prev.includes(activity.id) ? prev.filter((id) => id !== activity.id) : [...prev, activity.id]
    );
  };

  const act = activities.slice(0, count); // Show only the first 5 activities

  return (
    <section className="activity-list-section">
      <ul className="list-group activity-list-group">
        {act?.map((activity) => {
          console.log("Activity:", activity.startDate);
          return (
            <li
              key={activity.id}
              className={`activity-list-item list-group ${activity.description ? "clickable" : ""}`}
              onClick={() => handleClick(activity)}
            >
              <div className="activity-list-box">
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
