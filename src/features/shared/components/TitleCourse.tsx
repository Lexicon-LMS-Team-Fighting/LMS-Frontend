//A container component showing title, date and courseName if available
//This component is based of the TitleDate component

import React from "react";
import "../css/TitleCourse.css";

interface ITitelCourseProps {
  title?: string;
  startDate: string;
  activityType?: string;
  courseName?: string;
}

export const TitleCourse: React.FC<ITitelCourseProps> = ({
  title,
  startDate,
  activityType,
  courseName,
}) => {
  return (
    <div className="titlecourse-container-activity">
      {/* Add title if available */}
      {title && (
        <div className="title-container">
          {activityType && <span className="activity-wrapper">{activityType}</span>}
          <p className="titlecourse-title">{title}</p>
        </div>
      )}
      {/* Add date or courseName if available */}
      <div className="info-container">
        {!courseName && (
          <span className="material-symbols-outlined hidden">calendar_today</span>
        )}
          
        <p className="titlecourse-date">{!courseName? (startDate) : (courseName)}</p>
      </div>
    </div>
  );
};
