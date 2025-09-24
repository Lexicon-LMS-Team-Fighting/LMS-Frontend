// Interface type for the module data, used in ModuleList.tsx component
export interface IModule {
  id: string;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
}
