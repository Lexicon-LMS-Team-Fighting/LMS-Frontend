// hooks/useModuleList.ts
import { useState, useCallback } from "react";

export const useModuleList = () => {
  const [openModules, setOpenModules] = useState<string[]>([]);

  const toggleModule = useCallback((id: string) => {
    setOpenModules((prev) =>
      prev.includes(id) ? prev.filter((mid) => mid !== id) : [...prev, id]
    );
  }, []);

  return {
    openModules,
    toggleModule,
  };
};
