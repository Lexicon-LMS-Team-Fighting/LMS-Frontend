import { ReactElement, ReactNode, useState } from "react";
import { IActivity } from "../types/types";
import { FeedbackItem } from "./FeedbackItem";
import { TitleDate } from "./TitleDate";

interface IActivityItemProps {
  activity: IActivity;
}

export function ActivityItem({ activity }: IActivityItemProps): ReactElement {
  const [expandedActivities, setExpandedActivities] = useState<string[]>([]);
  const isExpanded = expandedActivities.includes(activity.id);

  const handleClick = (activity: IActivity) => {
    if (!activity.description) return;

    setExpandedActivities((prev) =>
      prev.includes(activity.id)
        ? prev.filter((id) => id !== activity.id)
        : [...prev, activity.id]
    );
  };

  function renderFeedback(activity: IActivity): ReactNode {
    if (!activity.feedbacks[0].feedback) return null;

    return <FeedbackItem feedback={activity.feedbacks[0]} />;
  }

  return (
    <li
      key={activity.id}
      className={`activity-list-item list-group ${
        activity.description ? "clickable" : ""
      }`}
      onClick={() => handleClick(activity)}
      title={
        activity.description
          ? isExpanded
            ? "Click to show less"
            : "Click to show more"
          : ""
      }
    >
      <div className="activity-list-box">
        <TitleDate
          title={activity.name}
          startDate={activity.startDate}
          endDate={activity.endDate}
          activityType={activity.activityTypeName}
        />

        <div className="document-status-container">
          {/* TODO: This should be correctly implemented once the backend part 
                  for handling documents is in place */}
          {
            <a
              href=""
              className="document-container"
              title="Click to show document"
            >
              <span className="material-symbols-outlined">news</span>
              Dokument
            </a>
          }

          {activity.feedbacks[0]?.status && (
            <span
              className={`status-container ${
                activity.feedbacks[0]?.status === "Försenad"
                  ? "status-red"
                  : "status-green"
              }`}
            >
              {activity.feedbacks[0]?.status === "Försenad" ? (
                <span className="material-symbols-outlined">error</span>
              ) : (
                <span className="material-symbols-outlined">task_alt</span>
              )}
              {activity.feedbacks[0]?.status}
            </span>
          )}
        </div>
      </div>

      {renderFeedback(activity)}

      {isExpanded && activity.id && (
        <div className={`description-container`}>
          <strong>Beskrivning: </strong> <p>{activity.description}</p>
        </div>
      )}
    </li>
  );
}
