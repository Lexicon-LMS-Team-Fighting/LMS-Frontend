//A container component showing title, date and courseName if available
//This component is based of the TitleDate component

//TODO rename classNames so they won't conflict with TitleDate.css
import React from "react";
import "../css/TitleCourse.css";

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
    <div className="titledate-container-activity">
      {/* Add title if available */}
      {title && (
        <div className="title-container">
          {activityType && <span className="activity-wrapper">{activityType}</span>}
          <p className="titledate-title">{title}</p>
        </div>
      )}
      {/* Add date or courseName if available */}
      <div className="date-container">
        {!courseName && (
          <span className="material-symbols-outlined hidden">calendar_today</span>
        )}
          
        <p className="titledate-date">{!courseName? (startDate) : (courseName)}</p>
      </div>
    </div>
  );
};
