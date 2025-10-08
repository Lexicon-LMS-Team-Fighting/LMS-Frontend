//This progress bar can be universally used, it currently supports a fixed size use, for ModuleList component and a fullsize use for the MyCourse page component. It is in fixed size by defaule, set fullSize={true} to use the full size variant of progress bar.

interface ProgressBarProps {
  total: number;
  completed: number;
  onComplete?: () => void;
  fullSize?: boolean;
  preCalcPercentage?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  total,
  completed,
  onComplete,
  fullSize,
  preCalcPercentage,
}) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  // Notify parent if completed through callback
  if (percentage === 100 && onComplete) {
    onComplete();
  }

  return (
    <div className={`progress-bar-container ${fullSize ? "full-size" : ""}`}>
      <span className="progress-bar-text">
        {preCalcPercentage ? preCalcPercentage : percentage}% <p>avklarat</p>
      </span>
      <div className={`progress-bar`}>
        <div
          className={`current-progress`}
          style={{
            width: `${
              preCalcPercentage ? preCalcPercentage * 100 : percentage
            }%`,
          }}
        />
      </div>
    </div>
  );
};
