import { getCurrentUserRole } from "../utilities/jwtDecoder";

export function useIsTeacher(): Boolean | undefined {
  return getCurrentUserRole()?.includes("Teacher");
}
