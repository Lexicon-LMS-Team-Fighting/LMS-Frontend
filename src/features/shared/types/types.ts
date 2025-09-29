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
