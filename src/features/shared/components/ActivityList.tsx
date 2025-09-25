import { IActivity } from "../types";
import { TitleDate } from "./TitleDate";

interface IActivityListProps {
  activities: IActivity[];
}

export const ActivityList: React.FC<IActivityListProps> = ({ activities }) => {
  return (
    <section className="activity-list-section">
      <h3 className="activity-title">Aktiviteter</h3>
      <ul className="list-group activity-list-group">
        {activities?.map((activity) => (
          <li key={activity.id} className="activity-list-item list-group">
            <TitleDate
              title={activity.name}
              startDate={activity.startDate}
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
          </li>
        ))}
      </ul>
    </section>
  );
};
