//A container component showing title, date and courseName if available
//This component is based of the TitleDate component

interface ICourseDateProps {
  title?: string;
  startDate: string;
  activityType?: string;
  courseName?: string;
}

export const TitleCourse: React.FC<ICourseDateProps> = ({
  title,
  startDate,
  activityType,
  courseName,
}) => {
  return (
    <div className={activityType ? `titledate-container-activity` : "titledate-container"}>
      {title && (
        <div className="title-container">
          {activityType && <span className="activity-wrapper">{activityType}</span>}
          <p className="titledate-title">{title}</p>
        </div>
      )}
      <div className="date-container">
        {!courseName ? (
          <span className="material-symbols-outlined hidden">calendar_today</span>
        ) : null}
        
          <p className="titledate-date">{!courseName? (startDate) : (courseName)}</p>
      </div>
    </div>
  );
};
