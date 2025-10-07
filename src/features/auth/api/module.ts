import { BASE_URL } from "../../shared/constants";
import { fetchWithToken } from "../../shared/utilities";
import { IModule } from "../../shared/types";

export type CreateModuleDto = {
  name: string;
  description?: string;
  startDate: Date; 
  endDate: Date;  
};

export type UpdateModuleDto = {
  name: string;
  description?: string;
  startDate: Date; 
  endDate: Date;  
};

export async function createModule(course: CreateModuleDto): Promise<IModule> {
  return await fetchWithToken<IModule>(`${BASE_URL}/modules`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(course),
  });
}

export async function updateModule(id: string, module: UpdateModuleDto): Promise<IModule> {
  await fetchWithToken<void>(`${BASE_URL}/modules/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(module),
  });

  return await fetchWithToken<IModule>(`${BASE_URL}/modules/${id}`, {
    method: "GET",
  });
}