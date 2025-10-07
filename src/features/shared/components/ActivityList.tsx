import { ReactNode, useState } from "react";
import { IActivity } from "../types";
import { TitleDate } from "./TitleDate";
import { ActivityItem } from "./ActivityItem";
import { FeedbackItem } from "./FeedbackItem";

interface IActivityListProps {
  activities: IActivity[];
}

export const ActivityList: React.FC<IActivityListProps> = ({ activities }) => {
  // const [expandedActivities, setExpandedActivities] = useState<string[]>([]);

  // const handleClick = (activity: IActivity) => {
  //   if (!activity.description) return;

  //   setExpandedActivities((prev) =>
  //     prev.includes(activity.id)
  //       ? prev.filter((id) => id !== activity.id)
  //       : [...prev, activity.id]
  //   );
  // };

  // function renderFeedback(activity: IActivity): ReactNode {
  //   if (!activity.feedbacks[0].feedback) return null;

  //   return <FeedbackItem feedback={activity.feedbacks[0]} />;
  // }

  return (
    <section className="activity-list-section">
      <h3 className="activity-title">Aktiviteter</h3>
      <ul className="list-group activity-list-group">
        {activities?.map((activity) => (
          <ActivityItem activity={activity} key={activity.id} />
        ))}
      </ul>
    </section>
  );
};
