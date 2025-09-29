interface ProgressBarProps {
  total: number;
  completed: number;
  onComplete?: () => void;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ total, completed, onComplete }) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  // Notify parent if completed through callback
  if (percentage === 100 && onComplete) {
    onComplete();
  }

  return (
    <div className="progress-bar-container">
      <span className="progress-bar-text">{percentage}% avklarat</span>
      <div className="progress-bar">
        <div className="current-progress" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
};
