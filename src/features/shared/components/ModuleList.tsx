import { useState } from "react";
import ProgressBar from "./ProgressBar";
import { IModule } from "../types/types";

interface IModuleListProps {
  modules: IModule[];
}

export const ModuleList: React.FC<IModuleListProps> = ({ modules }) => {
  const [openModules, setOpenModules] = useState<string[]>([]);

  const toggleModule = (id: string) => {
    setOpenModules((prev) =>
      prev.includes(id) ? prev.filter((mid) => mid !== id) : [...prev, id]
    );
  };

  return (
    // TODO: delete the main tag before PR
    <main className="module-page">
      <section className="module-list-container">
        <h2 className="module-h2">Moduler</h2>
        <ul className="list-group module-list-group">
          {modules.map((mod) => (
            <li className="module-list-item list-group-item">
              <button
                type="button"
                onClick={() => toggleModule(mod.id)}
                className="module-button-item list-group-item"
              >
                <div className="module-item-container">
                  <div className="icon-wrapper">
                    <span className="material-symbols-outlined ">menu_book</span>
                  </div>
                  <div className="title-date-container">
                    <p className="module-name">{mod.name}</p>
                    <div className="module-date-container">
                      <span className="material-symbols-outlined">calendar_today</span>
                      <p className="module-date">
                        {mod.startDate} - {mod.endDate}
                      </p>
                    </div>
                  </div>
                </div>
                {/* TODO: change these values to props where total= totalActivities and completed = completedActivities when Activities component and interface is implemented*/}
                <div className="progress-arrow-container">
                  <ProgressBar total={4} completed={1} />
                  {openModules.includes(mod.id) ? (
                    <span className="material-symbols-outlined">keyboard_arrow_down</span>
                  ) : (
                    <span className="material-symbols-outlined">keyboard_arrow_right</span>
                  )}
                </div>
              </button>
              {openModules.includes(mod.id) && (
                <div className="activity-container">
                  {/* Placeholder for "Aktiviteter" */}
                  <p>{mod.description}</p>
                  <p className="">Activity component goes here, this is just a placeholder.</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};
