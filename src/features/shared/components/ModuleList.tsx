import ProgressBar from "./ProgressBar";

interface IModule {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  progress: number;
  expanded?: boolean;
}

// Dummy data
const modules: IModule[] = [
  {
    id: 1,
    title: "HTML & CSS",
    startDate: "2023-08-15",
    endDate: "2023-09-01",
    progress: 100,
    expanded: true,
  },
  {
    id: 2,
    title: "JavaScript",
    startDate: "2023-09-02",
    endDate: "2023-09-20",
    progress: 60,
  },
  {
    id: 3,
    title: "React",
    startDate: "2023-09-21",
    endDate: "2023-10-15",
    progress: 20,
  },
  {
    id: 4,
    title: "Databasedesign",
    startDate: "2023-10-16",
    endDate: "2023-11-05",
    progress: 0,
  },
];

export const ModuleList: React.FC = () => {
  return (
    // TODO: delete the main tag before PR
    <main className="module-page">
      <section className="module-list-container">
        <h2 className="module-h2">Moduler</h2>
        <ul className="list-group module-list-group">
          {modules.map((mod) => (
            <li className="module-list-item list-group-item">
              <div className="module-item-container">
                <span className="material-symbols-outlined">check</span>
                <div className="title-date-container">
                  <p className="module-title">{mod.title}</p>
                  <div className="module-date-container">
                    <span className="material-symbols-outlined">calendar_today</span>
                    <p className="module-date">
                      {mod.startDate} - {mod.endDate}
                    </p>
                  </div>
                </div>
              </div>
              {/* TODO: change these values to props where total= totalActivities and completed = completedActivities */}
              <ProgressBar total={4} completed={1} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};
