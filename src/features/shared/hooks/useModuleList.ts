// hooks/useModuleList.ts
import { useState, useCallback } from "react";

export const useModuleList = () => {
  const [openModules, setOpenModules] = useState<string[]>([]);
  const [completedModules, setCompletedModules] = useState<string[]>([]);

  const toggleModule = useCallback((id: string) => {
    setOpenModules((prev) =>
      prev.includes(id) ? prev.filter((mid) => mid !== id) : [...prev, id]
    );
  }, []);

  const markModuleComplete = useCallback((id: string) => {
    setCompletedModules((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  return {
    openModules,
    completedModules,
    toggleModule,
    markModuleComplete,
  };
};
