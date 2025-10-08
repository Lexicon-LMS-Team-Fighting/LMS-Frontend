import type { ReactElement } from "react";
import { useAsyncError } from "react-router";

/**
 * AwaitError component
 *
 * Handles and displays errors that occur when using React Router's `<Await>` component
 * for deferred data loading.
 *
 * - Uses `useAsyncError` to access the error thrown during an awaited data fetch.
 * - Differentiates between:
 *    1. `Response` errors (e.g., HTTP errors) — shows status code and text.
 *    2. JavaScript `Error` objects — shows the error message.
 *    3. Unknown errors — displays a generic message.
 *
 * @component
 * @returns {ReactElement} A user-friendly error message.
 */
export function AwaitError(): ReactElement {
  const error = useAsyncError();

  if (error instanceof Response) {
    return (
      <div>
        Error {error.status}: {error.statusText}
      </div>
    );
  }

  if (error instanceof Error) {
    return <div>{error.message}</div>;
  }

  return <div>Something went wrong.</div>;
}
