import { IActivity } from "../types";
import { ActivityItem } from "./ActivityItem";

interface IActivityListProps {
  activities: IActivity[];
}

export const ActivityList: React.FC<IActivityListProps> = ({ activities }) => {
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
