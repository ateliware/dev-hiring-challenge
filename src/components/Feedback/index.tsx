import { FeedbackMessage } from "../../libs/shared";

export interface FeedbackProps {
  message?: FeedbackMessage;
  isPositiveMessage: boolean;
}
export const Feedback = (props: FeedbackProps): JSX.Element => {
  if (!props.message) {
    return <></>;
  }

  return (
    <ul>
      {
        Object.keys(props.message).flatMap((key, index) => {
          const feedbackMessages: string | string[] = props.message && props.message[key] || [];

          if (Array.isArray(feedbackMessages)) {
            return feedbackMessages.map((message, innerIndex) => (
              <li key={`${index}-${innerIndex}-${key}`} className="text-red-600">{key}: {message.toString()}</li>
            ));
          } else {
            return (
              <li>
                { props.isPositiveMessage
                    ? <span className="text-green-600">{feedbackMessages}</span>
                    : <span className="text-red-600">{feedbackMessages}</span>
                }
              </li>
            );
          }
        })
      }
    </ul>
  )
}
