import { useMemo } from "react";
import { ModuleList } from "../../features/shared/components";
import { Spinner } from "../../features/shared/components/Spinner";
import { IPaginatedLoaderResult } from "../../features/shared/hooks/usePaginatedLoader";
import { IModulePreview } from "../../features/shared/types";

interface TeacherModuleListProps {
  parinatedLoader: IPaginatedLoaderResult<IModulePreview>;
}

export const TeacherModuleList = (props: TeacherModuleListProps) => {
  const { parinatedLoader } = props;
  const {
    items: modules,
    loadMore: loadMoreModules,
    hasNext: modulesHasNext,
    loading: modulesLoading,
    error: modulesLoadingError,
  } = parinatedLoader;

  const progress = useMemo(() => {
    const progressMap: Record<string, { completed: number; total: number }> = {};
    modules.forEach(module => {
      const progressValue = module.progress;
      const isPercentage = progressValue > 1;
      
      progressMap[module.id] = {
        completed: isPercentage ? Math.round(progressValue) : Math.round(progressValue * 100),
        total: 100
      };
    });
    return progressMap;
  }, [modules]);

  const handleProgressChange = (moduleId: string, completed: number, total: number) => {
    console.log(`Module ${moduleId} progress changed: ${completed}/${total}`);
  };

  return (
    <div className="modules-container">
      {modulesLoadingError && (
        <div className="alert alert-danger" role="alert">
          <strong>Ett fel uppstod:</strong> {modulesLoadingError}
        </div>
      )}
      
      {modulesLoading && <div className="text-center"><Spinner /></div>}
      
      {!modulesLoading && modules.length === 0 && (
        <p>Inga moduler att visa.</p>
      )}
      
      {modules.length > 0 && (
        <>
          <ModuleList 
            modules={modules} 
            progress={progress} 
            onProgressChange={handleProgressChange} 
          />
          {modulesHasNext && (
            <div className="text-center mt-3">
              <button 
                onClick={loadMoreModules} 
                disabled={modulesLoading} 
                className="btn btn-outline-primary"
              >
                {modulesLoading ? "Laddar..." : "Ladda fler moduler"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};