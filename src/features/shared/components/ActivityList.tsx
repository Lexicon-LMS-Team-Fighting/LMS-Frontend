import { useState } from "react";
import { IActivity } from "../types";
import { TitleDate } from "./TitleDate";

interface IActivityListProps {
  activities: IActivity[];
}

export const ActivityList: React.FC<IActivityListProps> = ({ activities }) => {
  const [expandedActivities, setExpandedActivities] = useState<string[]>([]);

  const handleClick = (activity: IActivity) => {
    if (!activity.description) return;

    setExpandedActivities((prev) =>
      prev.includes(activity.id) ? prev.filter((id) => id !== activity.id) : [...prev, activity.id]
    );
  };

  return (
    <section className="activity-list-section">
      <h3 className="activity-title">Aktiviteter</h3>
      <ul className="list-group activity-list-group">
        {activities?.map((activity) => {
          const isExpanded = expandedActivities.includes(activity.id);
          return (
            <li
              key={activity.id}
              className={`activity-list-item list-group ${activity.description ? "clickable" : ""}`}
              onClick={() => handleClick(activity)}
              title={
                activity.description
                  ? isExpanded
                    ? "Click to show less"
                    : "Click to see more"
                  : ""
              }
            >
              <div className="activity-list-box">
                <TitleDate
                  title={activity.name}
                  startDate={activity.startDate}
                  endDate={activity.endDate}
                  activityType={activity.activityType}
                />

                <div className="document-status-container">
                  {/* TODO: This should be correctly implemented once the backend part for handling documents is in place */}
                  {
                    <a href="" className="document-container">
                      <span className="material-symbols-outlined">news</span>Dokument
                    </a>
                  }

                  {activity.status && (
                    <span
                      className={`status-container ${
                        activity.status === "Försenad" ? "status-red" : "status-green"
                      }`}
                    >
                      {activity.status === "Försenad" ? (
                        <span className="material-symbols-outlined">error</span>
                      ) : (
                        <span className="material-symbols-outlined">task_alt</span>
                      )}
                      {activity.status}
                    </span>
                  )}
                </div>
              </div>
              {activity.feedback && (
                <div className="feedback-container">
                  <strong>Feedback: </strong> <p>{activity.feedback}</p>
                </div>
              )}

              {isExpanded && activity.id && (
                <div className={`description-container`}>
                  <strong>Beskrivning: </strong> <p>{activity.description}</p>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
};
