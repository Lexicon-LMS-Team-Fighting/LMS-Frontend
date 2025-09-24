// components/ModuleList.tsx
import { ProgressBar } from "./ProgressBar";
import { IModule } from "../types/types";
import { TitleDate } from "./TitleDate";
import { useModuleList } from "../hooks/useModuleList";

interface IModuleListProps {
  modules: IModule[];
}

export const ModuleList: React.FC<IModuleListProps> = ({ modules }) => {
  const { openModules, completedModules, toggleModule, markModuleComplete } = useModuleList();

  return (
    <main className="module-page">
      <section className="module-list-container">
        <h2 className="module-h2">Moduler</h2>
        <ul className="list-group module-list-group">
          {modules.map((mod) => {
            //TODO: Remove these when Activity component is implemented as these are here as placeholders
            const totalActivities = mod.totalActivities ?? 4;
            const completedActivities = mod.completedActivities ?? 1;
            const isCompleted = completedModules.includes(mod.id);

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
                    <ProgressBar
                      total={totalActivities}
                      completed={completedActivities}
                      onComplete={() => markModuleComplete(mod.id)}
                    />
                    {openModules.includes(mod.id) ? (
                      <span className="material-symbols-outlined">keyboard_arrow_down</span>
                    ) : (
                      <span className="material-symbols-outlined">keyboard_arrow_right</span>
                    )}
                  </div>
                </button>

                {openModules.includes(mod.id) && (
                  <div className="activity-container">
                    <p>{mod.description}</p>
                    {/* Just a placeholder, remove this and replace with the Activity component */}
                    <p>Activity component goes here, this is just a placeholder.</p>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
};
