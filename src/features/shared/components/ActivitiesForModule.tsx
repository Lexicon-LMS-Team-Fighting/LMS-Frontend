import { useEffect, useState } from "react";
import { ActivityList } from "./ActivityList";
import { dummyActivities } from "../dummydata";
import { IActivity } from "../types";

// This component filters the activities using moduleId, it uses the ActivityList component to render the data.
// This component also tracks progress (for usage in progressBar) through the status field to show total progress for the module it belongs to.

interface IActivitiesForModuleProps {
  moduleId: string;
  isOpen: boolean;
  moduleDescription?: string;
  onProgressChange: (moduleId: string, completed: number, total: number) => void;
}

export const ActivitiesForModule: React.FC<IActivitiesForModuleProps> = ({
  moduleId,
  isOpen,
  moduleDescription,
  onProgressChange,
}) => {
  const [activities, setActivities] = useState<IActivity[]>([]);

  useEffect(() => {
    // The API call should be similar to this when backend gets implemented
    // const fetchActivities = async () => {
    //   try {
    //     const res = await fetch(`/api/modules/${moduleId}/activities`);
    //     if (!res.ok) {
    //       throw new Error("Failed to fetch activities");
    //     }
    //     const data: IActivity[] = await res.json();
    //     setActivities(data);

    //     // Calculate progress directly from backend data
    //     const completed = data.filter(
    //       (a) => a.status === "Genomförd" || a.status === "Godkänd"
    //     ).length;

    //     onProgressChange(completed, data.length);
    //   } catch (err) {
    //     console.error(err);
    //   }
    // };

    // fetchActivities();

    // Only here as placeholder for dummydata, remove/update when data from backend is implemented as shown above.
    const data = dummyActivities.filter((a) => a.moduleId === moduleId);
    setActivities(data);

    const completed = data.filter((a) => a.status === "Genomförd" || a.status === "Godkänd").length;

    onProgressChange(moduleId, completed, data.length);
  }, [moduleId, onProgressChange]);

  if (!isOpen) return null;

  return (
    <section className="activity-container">
      {moduleDescription && <p className="module-description">{moduleDescription}</p>}

      <ActivityList activities={activities} />
    </section>
  );
};
