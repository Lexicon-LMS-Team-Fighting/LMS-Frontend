import { ReactElement } from "react";

interface IFeedbackItemProps {
  feedback: string;
}

export function FeedbackItem({ feedback }: IFeedbackItemProps): ReactElement {
  return (
    <div className="feedback-container">
      <strong>Feedback: </strong> <p>{feedback}</p>
    </div>
  );
}
