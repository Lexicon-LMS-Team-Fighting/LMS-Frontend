// components/ModuleList.tsx
import { ProgressBar } from "./ProgressBar";
import { IModule } from "../types/types";
import { TitleDate } from "./TitleDate";
import { useModuleList } from "../hooks/useModuleList";
import { ActivitiesForModule } from "./ActivitiesForModule";

interface IModuleListProps {
  modules: IModule[];
}

export const ModuleList: React.FC<IModuleListProps> = ({ modules }) => {
  const { openModules, progress, toggleModule, handleProgressChange } = useModuleList();

  return (
    <section className="module-list-container">
      <h2 className="module-h2">Moduler</h2>
      <ul className="list-group module-list-group">
        {modules.map((mod) => {
          const moduleProgress = progress[mod.id] ?? { completed: 0, total: 0 };
          const isCompleted = completedModules.includes(mod.id);
          const isOpen = openModules.includes(mod.id);

          return (
            <li key={mod.id} className="module-list-item list-group-item">
              <button
                type="button"
                onClick={() => toggleModule(mod.id)}
                className="module-button-item list-group-item"
              >
                <div className="module-item-container">
                  <div className="icon-wrapper">
                    <span className="material-symbols-outlined">
                      {isCompleted ? "check" : "menu_book"}
                    </span>
                  </div>
                  <TitleDate title={mod.name} startDate={mod.startDate} endDate={mod.endDate} />
                </div>

                <div className="progress-arrow-container">
                  <ProgressBar total={moduleProgress.total} completed={moduleProgress.completed} />
                  {isOpen ? (
                    <span className="material-symbols-outlined">keyboard_arrow_down</span>
                  ) : (
                    <span className="material-symbols-outlined">keyboard_arrow_right</span>
                  )}
                </div>
              </button>

              {/* Since we need to fetch the activity.status for the progress bar to render properly when loading this component, we need to put this outside with a isOpen hook to track it */}
              <ActivitiesForModule
                moduleId={mod.id}
                isOpen={isOpen}
                moduleDescription={mod.description}
                onProgressChange={(completed, total) =>
                  handleProgressChange(mod.id, completed, total)
                }
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
};
