//A container component showing title, date and the optional activityType

interface ITitleDateProps {
  title?: string;
  startDate: Date;
  endDate: Date;
  activityType?: string;
}

export const TitleDate: React.FC<ITitleDateProps> = ({
  title,
  startDate,
  endDate,
  activityType,
}) => {
  return (
    <div
      className={
        activityType ? `titledate-container-activity` : "titledate-container"
      }
    >
      {title && (
        <div className="title-container">
          {activityType && (
            <span className="activity-wrapper">{activityType}</span>
          )}
          <p className="titledate-title">{title}</p>
        </div>
      )}
      <div className="date-container">
        <span className="material-symbols-outlined hidden">calendar_today</span>
        {endDate ? (
          <p className="titledate-date">
            {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
          </p>
        ) : (
          <p className="titledate-date">{startDate.toLocaleDateString()}</p>
        )}
      </div>
    </div>
  );
};
