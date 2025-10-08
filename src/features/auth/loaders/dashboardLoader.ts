import { fetchAllCourses } from "../../../fetchers/courseFetcher";
import { fetchAllModules } from "../../../fetchers/moduleFetcher";
import { fetchUpcomingActivities } from "../../../fetchers/activitiesFetcher";
import { getCurrentUserRole } from "../../shared/utilities/jwtDecoder";
import { ICourse, ICourseWithCounts, IUpcomingActivity, IModule } from "../../shared/types/types";

export interface IDashboardDifferedLoader {
  upcomingActivities?: IUpcomingActivity[] | null;
  userCourses: Promise<ICourseWithCounts[] | null>;
  modules: Promise<IModule[]>;
}

async function fetchAllCoursesAllPages(): Promise<ICourse[]> {
  let page = 1;
  const all: ICourse[] = [];
  while (true) {
    const res: any = await fetchAllCourses(page);         // OBS: se till att fetchern använder '?Page=${page}'
    const items: ICourse[] = res?.items ?? [];
    all.push(...items);
    if (!res?.metadata?.hasNextPage) break;
    page += 1;
  }
  return all;
}

export async function DashboardDifferedLoader(): Promise<IDashboardDifferedLoader> {
  const isTeacher = getCurrentUserRole()?.includes("Teacher") ?? false;


  const modulesP: Promise<IModule[]> = fetchAllModules().then(list =>
    list.map<IModule>(m => ({
      ...m,
      startDate: new Date(m.startDate),
      endDate: m.endDate ? new Date(m.endDate) : new Date(""), 
    }))
  );

  
  const coursesP: Promise<ICourse[]> = fetchAllCoursesAllPages().then(list =>
    list.map<ICourse>(c => ({
      ...c,
      startDate: new Date(c.startDate),
      endDate: c.endDate ? new Date(c.endDate) : new Date(""), 
    }))
  );


  const upcomingActivities: IUpcomingActivity[] | null =
    isTeacher ? await fetchUpcomingActivities() : null;

  const userCourses: Promise<ICourseWithCounts[] | null> = Promise.all([modulesP, coursesP]).then(
    ([mods, courses]) => {
      if (!courses?.length) return null;

      const modCounts = mods.reduce<Record<string, number>>((acc, m: any) => {
        const cid = m.courseId as string | undefined; 
        if (!cid) return acc;
        acc[cid] = (acc[cid] ?? 0) + 1;
        return acc;
      }, {});

      return courses.map<ICourseWithCounts>(c => ({
        ...c,
        moduleCount: modCounts[c.id] ?? 0,
        studentCount: 0, 
      }));
    }
  );

  return { userCourses, modules: modulesP, upcomingActivities };
}
