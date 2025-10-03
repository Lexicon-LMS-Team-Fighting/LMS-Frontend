import { ModuleList } from "../../features/shared/components";
import { Spinner } from "../../features/shared/components/Spinner";
import { IPaginatedLoaderResult } from "../../features/shared/hooks/usePaginatedLoader";
import { IModulePreview } from "../../features/shared/types";

interface TeacherModuleListProps {
  progress: Record<string, { completed: number; total: number }>;
  onProgressChange?: (moduleId: string, completed: number, total: number) => void;
  parinatedLoader: IPaginatedLoaderResult<IModulePreview>;
}

export const TeacherModuleList = (props: TeacherModuleListProps) => {
  const { progress, onProgressChange, parinatedLoader } = props;
  const {
    items: modules,
    loadMore: loadMoreModules,
    hasNext: modulesHasNext,
    loading: modulesLoading,
    error: modulesLoadingError,
  } = parinatedLoader;

  return (
    <div className="modules-container">
      {modulesLoading && <div className="text-center"><Spinner /></div>}
      {!modulesLoading && modules.length === 0 && (<p>Inga moduler att visa.</p>)}
      {modules.length > 0 && (
        <>
          <ModuleList modules={modules} progress={progress} onProgressChange={onProgressChange || (() => { })} />
          {modulesLoadingError && (
            <div className="alert alert-danger" role="alert">
              <strong>Ett fel uppstod:</strong> {modulesLoadingError}
            </div>
          )}
          {modulesHasNext && (
            <div className="text-center">
              <button onClick={loadMoreModules} disabled={modulesLoading} className="btn btn-outline-primary">
                {modulesLoading ? "Laddar..." : "Ladda fler moduler"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};