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

  const getShowInfo = isExpanded ? "Click to show less" : "Click to show more";

  const getStatusColor =
    activity.feedbacks[0]?.status === "Försenad"
      ? "status-red"
      : "status-green";

  function renderFeedback(activity: IActivity): ReactNode {
    if (!activity.feedbacks[0].feedback) return null;

    return <FeedbackItem feedback={activity.feedbacks[0]} />;
  }

  function renderIcon(activity: IActivity): ReactNode {
    return (
      <>
        {activity.feedbacks[0]?.status === "Försenad" ? (
          <span className="material-symbols-outlined">error</span>
        ) : (
          <span className="material-symbols-outlined">task_alt</span>
        )}
      </>
    );
  }

  function renderStatus(activity: IActivity): ReactNode {
    return (
      <>
        {activity.feedbacks[0]?.status && (
          <span className={`status-container ${getStatusColor}`}>
            {renderIcon(activity)}
            {activity.feedbacks[0]?.status}
          </span>
        )}
      </>
    );
  }

  return (
    <li
      key={activity.id}
      className={`activity-list-item list-group ${
        activity.description ? "clickable" : ""
      }`}
      onClick={() => handleClick(activity)}
      title={activity.description ? getShowInfo : ""}
    >
      <div className="activity-list-box">
        <TitleDate
          title={activity.name}
          startDate={activity.startDate}
          endDate={activity.endDate}
          activityType={activity.activityTypeName}
        />

        <div className="document-status-container">
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

          {renderStatus(activity)}
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
