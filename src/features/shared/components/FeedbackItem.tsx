import { ReactElement } from "react";
import { IFeedbacks } from "../types";

interface IFeedbackItemProps {
  feedback: IFeedbacks;
}

export function FeedbackItem({ feedback }: IFeedbackItemProps): ReactElement {
  return (
    <div className="feedback-container">
      <strong>Feedback: </strong> <p>{feedback.feedback}</p>
    </div>
  );
}
