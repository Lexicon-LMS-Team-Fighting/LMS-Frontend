import { ProgressBar } from "./ProgressBar";
import { IModule } from "../types/types";
import { TitleDate } from "./TitleDate";
import { useModuleList } from "../hooks/useModuleList";
import { ActivitiesForModule } from "./ActivitiesForModule";
import { useIsTeacher } from "../hooks/useIsTeacher";

interface IModuleListProps {
  modules: IModule[];
  progress: Record<string, { completed: number; total: number }>;
  onProgressChange: (
    moduleId: string,
    completed: number,
    total: number
  ) => void;
}

export const ModuleList: React.FC<IModuleListProps> = ({
  modules,
  progress,
  onProgressChange,
}) => {
  const { openModules, toggleModule } = useModuleList();
  const isTeacher = useIsTeacher()

  return (
    <section className="module-list-container">
      <h2 className="fs-5 mb-5">Moduler</h2>
      <ul className="list-group module-list-group">
        {modules.map((mod) => {
          const moduleProgress = progress[mod.id] ?? { completed: 0, total: 0 };
          const isCompleted =
            moduleProgress.total > 0 &&
            moduleProgress.completed === moduleProgress.total;
          const isOpen = openModules.includes(mod.id);

          return (
            <li key={mod.id} className="module-list-item list-group-item">
              <button
                type="button"
                onClick={() => toggleModule(mod.id)}
                className="module-button-item list-group-item"
              >
                <div className="module-item-container">
                  <div
                    className={`icon-wrapper ${
                      isCompleted ? "check" : "menu_book"
                    }`}
                  >
                    <span className={`material-symbols-outlined`}>
                      {isCompleted ? "task_alt" : "menu_book"}
                    </span>
                  </div>
                  <TitleDate
                    title={mod.name}
                    startDate={new Date(mod.startDate)}
                    endDate={mod.endDate ? new Date(mod.endDate) : new Date("")}
                  />
                </div>

                <div className="progress-arrow-container">
                  {/*If teacher, remove the progress bar for now*/}
                  {!isTeacher &&
                  <ProgressBar
                    total={moduleProgress.total || 1}
                    completed={moduleProgress.completed}
                  />
                  }
                  {isOpen ? (
                    <span className="material-symbols-outlined">
                      keyboard_arrow_down
                    </span>
                  ) : (
                    <span className="material-symbols-outlined">
                      keyboard_arrow_right
                    </span>
                  )}
                </div>
              </button>

              {/* Since we need to fetch the activity.status for the progress bar to render properly when loading this component, we need to put this outside with a isOpen hook to track it */}
              <ActivitiesForModule
                moduleId={mod.id}
                isOpen={isOpen}
                moduleDescription={mod.description}
                onProgressChange={onProgressChange}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
};
