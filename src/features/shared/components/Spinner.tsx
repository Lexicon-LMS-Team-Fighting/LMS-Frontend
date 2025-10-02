import type { ReactElement } from "react";

export function Spinner(): ReactElement {
  return (
    <div className="spinner-grow" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}
