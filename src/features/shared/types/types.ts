/**
 * Generic type representing a paginated API response.
 *
 * @template T The type of items returned in the response.
 * @property {T[]} items - The list of items for the current page.
 * @property {object} metadata - Information about the pagination state.
 * @property {number} metadata.totalItems - Total number of items across all pages.
 * @property {number} metadata.totalPages - Total number of available pages.
 * @property {number} metadata.currentPage - The current page number.
 * @property {number} metadata.pageSize - The number of items per page.
 * @property {boolean} metadata.hasPreviousPage - Whether a previous page exists.
 * @property {boolean} metadata.hasNextPage - Whether a next page exists.
 */
export type PagedResponse<T> = {
  items: T;
  metadata: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
};

/**
 * Represents a module within a course.
 * Used in the ModuleList.tsx component to display module details.
 */
export interface IModule {
  id: string;
  name: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  // Placeholders, should get removed when these are provided along with the implementation of Activity component.
  totalActivities?: number;
  completedActivities?: number;
}

/**
 * Represents an activity associated with a module.
 * Used in the ActivityList.tsx component to display activity details.
 */
export interface IActivity {
  id: string;
  moduleId: string;
  activityType: string;
  description?: string;
  name: string;
  startDate: string;
  endDate?: string;
  status?: "Genomförd" | "Försenad" | "Godkänd";
  feedback?: string;
}

/**
 * Represents a course with basic details.
 */
export interface ICourse {
  id: string;
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
}

/**
 * Represents a course with basic details and related modules.
 */
export interface ICourseWithModules extends ICourse {
  modules?: IModule[];
}

/**
 * Represents a user enrolled in courses.
 */
export interface IUser {
  id: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  refreshToken: string;
  refreshTokenExpireTime: Date;
}

/**
 * Represents a user with courses they attends. Extends IUser
 */
export interface IUserExtended extends IUser {
  courses: ICourse[];
}

/**
 * Represents a document uploaded or associated with a user, course, module, and activity.
 */
export interface IDocument {
  id: string;
  userId: string;
  courseId: string;
  moduleId: string;
  activityId: string;
  path: string;
  name: string;
  description: string;
  timeStamp: Date;
}

/** Interface type for the User data, used in UserList.tsx to plot the user for said list. Use the field name approptiate to what is wanted in the header label for UserList.tsx here as these are used as header labels aswell.*/
export interface IUser {
  userId: string;
  // userName: string;
  // name: string;
  // email: string;
  användarnamn: string; // userName
  namn: string; // name (will probably have to be firstName+" "+lastName)
  email: string; // email

  //Add more optional fields for multipurpose use, for example for Teachers View
  test?: string;
}
