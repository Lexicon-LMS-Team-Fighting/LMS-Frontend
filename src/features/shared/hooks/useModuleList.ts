// hooks/useModuleList.ts
import { useState, useCallback } from "react";

export const useModuleList = () => {
  const [openModules, setOpenModules] = useState<string[]>([]);
  const [progress, setProgress] = useState<Record<string, { completed: number; total: number }>>(
    {}
  );

  const toggleModule = useCallback((id: string) => {
    setOpenModules((prev) =>
      prev.includes(id) ? prev.filter((mid) => mid !== id) : [...prev, id]
    );
  }, []);

  const handleProgressChange = (moduleId: string, completed: number, total: number) => {
    setProgress((prev) => ({
      ...prev,
      [moduleId]: { completed, total },
    }));
  };

  return {
    openModules,
    progress,
    toggleModule,
    handleProgressChange,
  };
};
