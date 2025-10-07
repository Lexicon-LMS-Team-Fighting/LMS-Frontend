import { IUpcomingActivity } from "../types";
import { TitleCourse } from "./TitleCourse";
import "../css/UpcomingActivities.css";

interface IUpcomingProps {
  activities: IUpcomingActivity[] | null;
  count: number;
}

export const UpcomingActivities: React.FC<IUpcomingProps> = ({ activities, count }) => {


  if (!activities || activities.length === 0) {
    return <p>Inga kommande aktiviteter</p>;
  }

  //Slice using count prop to limit number of activities shown
  const act = activities.slice(0, count);

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

                <div className="date-container">
                  <TitleCourse startDate={activity.startDate.toISOString().split("T")[0]}/>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
