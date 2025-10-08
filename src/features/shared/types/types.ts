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
}

/**
 * Represents a module with extended details including activities, participants, and documents.
 */
export interface IModuleFull extends IModule {
  activities?: IActivity[];
  participants?: IUserParticipants[];
  documents?: IDocument[];
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
 * Represents an activity with no association.
 * Used in the UpcomingActivity.tsx component to display activity details.
 */
export interface IUpcomingActivity {
  id : string;
  name : string;
  courseName : string;
  courseId : string;
  moduleId : string;
  activityTypeName : string;
  startDate : Date;
  endDate? : Date;
  status? : "Genomförd" | "Försenad" | "Godkänd";
  feedback? : string;
  description? : string;
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

export interface ICourseWithCounts {
  id: string;
  name: string;
  description?: string;
  moduleCount: number;
  studentCount: number;
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
  role?: string;
  firstName: string;
  lastName: string;
  refreshToken: string;
  refreshTokenExpireTime: Date;
}

export interface IUserCreate {
  id: string;
  userName: string;
  email: string;
  role: "Student" | "Teacher";
  firstName: string;
  lastName: string;
  password: string;
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

/**=====================================================================
 * Types for teacher courses view
 ======================================================================*/

export interface IModulePreview {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  progress: number; 
}

export interface ICoursePreview {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  progress: number; 
}

export interface IPaginatedResponseMetadata {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface IPaginatedResponse<T> {
  items: T[];
  metadata: IPaginatedResponseMetadata;
}
/** Interface type for the User data, used in UserList.tsx and UserInfo.tsx to plot the user for said list.
 * Use the field name approptiate to what is wanted in the header label for UserList.tsx here as these are used as header labels aswell.
 * Also note that since UserList.tsx and UserInfo.tsx uses the first index in the array as reference for which header/label names are used
 * derived from the arrays field names, the first array element would have to have all the field names even if strings are empty.
 * Else they won't show up as header/label.
 * Note: It is suspected that backend data is already sent this way from the endpoint, but when testing using dummy data, this is a problem
 * that can occur.
 *
 */
export interface IUserParticipants {
  userId: string;
  användarnamn: string;
  namn: string;
  email: string;

  //Add more optional fields for multipurpose use, for example for Teachers View
  test?: string;
}
