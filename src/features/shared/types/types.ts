// Interface type for the module data, used in ModuleList.tsx component
export interface IModule {
  id: string;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  // Placeholders, should get removed when these are provided along with the implementation of Activity component.
  totalActivities?: number;
  completedActivities?: number;
}

// Interface type for the activity data, used in ActivityList.tsx
export interface IActivity {
  id: string;
  moduleId: string;
  activityType: string;
  name: string;
  startDate: string;
  endDate?: string;
  status?: "Genomförd" | "Försenad" | "Godkänd";
  feedback?: string;
}
