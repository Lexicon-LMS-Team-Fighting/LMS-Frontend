import { useState } from "react";
import { ActivityList } from "./ActivityList";
import { IActivity, IModuleFull } from "../types";

// This component filters the activities using moduleId, it uses the ActivityList component to render the data.
// This component also tracks progress (for usage in progressBar) through the status field to show total progress for the module it belongs to.

interface IActivitiesForModuleProps {
  module: IModuleFull;
  isOpen: boolean;
  moduleDescription?: string;
  onProgressChange: (
    moduleId: string,
    completed: number,
    total: number
  ) => void;
}

export const ActivitiesForModule: React.FC<IActivitiesForModuleProps> = ({
  module,
  isOpen,
  moduleDescription,
  onProgressChange,
}) => {
  const [activities, setActivities] = useState<IActivity[]>(
    module.activities ?? []
  );

  if (!isOpen) return null;

  return (
    <section className="activity-container">
      {moduleDescription && (
        <p className="module-description">{moduleDescription}</p>
      )}

      <ActivityList activities={activities} />
    </section>
  );
};
