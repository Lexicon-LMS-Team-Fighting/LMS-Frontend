import React from "react";

interface ProgressBarProps {
  total: number;
  completed: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ total, completed }) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="progress-bar-container">
      <span className="progress-bar-text">{percentage}% avklarat</span>
      <div className="progress-bar">
        <div className="current-progress" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
};

export default ProgressBar;
