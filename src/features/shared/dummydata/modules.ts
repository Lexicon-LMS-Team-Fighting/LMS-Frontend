import { IModule } from "../types";

// Dummy data, This is to be removed when backend is connected and implemented
export const modules: IModule[] = [
  {
    id: "1",
    name: "HTML & CSS",
    description: "Grundläggande webbutveckling med HTML5 och CSS3",
    startDate: "2023-08-15",
    endDate: "2023-09-01",

    //These should be provided through activities eventually, remove when it's implemented the correct way.
    totalActivities: 4,
    completedActivities: 4,
  },
  {
    id: "2",
    name: "JavaScript",
    description: "Grunderna i JavaScript programmering",
    startDate: "2023-09-02",
    endDate: "2023-09-20",

    totalActivities: 5,
    completedActivities: 4,
  },
  {
    id: "3",
    name: "React",
    description: "Utveckling av moderna webbapplikationer med React",
    startDate: "2023-09-21",
    endDate: "2023-10-15",
    totalActivities: 4,
    completedActivities: 1,
  },
  {
    id: "4",
    name: "Databasedesign",
    description: "Grundläggande databasdesign och SQL",
    startDate: "2023-10-16",
    endDate: "2023-11-05",

    totalActivities: 4,
    completedActivities: 0,
  },
];

// const sumTotalActivities = activities.length;
