import type { ReactElement } from "react";
import { useRouteError } from "react-router";

/**
 * RouterError component
 *
 * A generic error boundary component for React Router v7 routes.
 * It is intended to be used as a route-level `errorElement` or as the
 * `errorElement` for `<Await>` when using deferred data.
 *
 * The component handles three main error cases:
 * 1. Loader errors that React Router transforms into plain objects with `status` and optional `data`.
 * 2. Standard JavaScript `Error` instances.
 * 3. Any other unknown errors.
 *
 * @component
 * @returns {ReactElement} A user-friendly error message.
 *
 * @example
 * <Route
 *   path="/course"
 *   element={<MyCourse />}
 *   loader={MyCourseDifferedLoader}
 *   errorElement={<RouterError />}
 * />
 */
export function RouterError(): ReactElement {
  const error = useRouteError();

  // React Router v7 loader errors often come as a plain object
  // with 'status' and optional 'data' instead of a real Response object
  if (error && typeof error === "object" && "status" in error) {
    const { status, data } = error as {
      status?: number;
      data?: string;
    };
    return (
      <div>
        Error {status ?? "Unknown"}: {data ?? "Unknown error"}
      </div>
    );
  }

  if (error instanceof Error) {
    return <div>{error.message}</div>;
  }

  return <div>Something went wrong.</div>;
}
