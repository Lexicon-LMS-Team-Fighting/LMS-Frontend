// import { useState } from "react";
import { IActivity } from "../types";
import { TitleCourse } from "./TitleCourse";
import "../css/UpcomingActivities.css";

//TODO fix this later when activities are being fetched from backend
interface IActivityListProps {
  activities: IActivity[];
}

const devPops: IActivity[] = [
  {
    id: "1",
    moduleId: "1",
    activityType: "Lektion",
    name: "Introduktion till React",
    description: "Lär dig grunderna i React, inklusive komponenter, JSX och props.",
    startDate: "2024-10-01",
    endDate: "2024-10-01",
    status: "Genomförd",
    feedback: "Bra jobbat! Du har förstått grunderna i React.",
    courseName : "Webbutveckling 101"
  },
{
    id: "2",
    moduleId: "1",
    activityType: "Uppgift", 
    name: "Bygg en To-Do App",
    description: "Skapa en enkel To-Do applikation med React.",
    startDate: "2024-10-05",
    endDate: "2024-10-12",
    status: "Ej påbörjad",
    feedback: "",
    courseName : "ReactJS"
  }
];

  //TODO fix this later when activities are being fetched from backend
// export const UpcomingActivities: React.FC<IActivityListProps> = ({ activities }) => {
export const UpcomingActivities: React.FC<IActivityListProps> = () => {
  const activities = devPops;
  // const [expandedActivities, setExpandedActivities] = useState<string[]>([]);

  const handleClick = (activity: IActivity) => {
    if (!activity.description) return;

    setExpandedActivities((prev) =>
      prev.includes(activity.id) ? prev.filter((id) => id !== activity.id) : [...prev, activity.id]
    );
  };

  return (
    <section className="activity-list-section">
      <h3 className="activity-title">Kommande Aktiviteter</h3>
      <ul className="list-group activity-list-group">
        {activities?.map((activity) => {
          return (
            <li
              key={activity.id}
              className={`activity-list-item list-group ${activity.description ? "clickable" : ""}`}
              onClick={() => handleClick(activity)}
            >
              <div className="activity-list-box">
                <TitleCourse
                  title={activity.name}
                  startDate={activity.startDate}
                  activityType={activity.activityType}
                  courseName={activity.courseName}
                />

                <div className="document-status-container">
                  {/* <span className="material-symbols-outlined hidden">calendar_today</span>
                  <p className="titledate-date">{activity.startDate}</p> */}
                  {/* TODO: This should be correctly implemented once the backend part for handling documents is in place */}
                  {
                  <TitleCourse startDate={activity.startDate}/>
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
