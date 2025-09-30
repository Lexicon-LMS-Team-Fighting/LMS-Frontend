/**
 * Represents a module within a course.
 * Used in the ModuleList.tsx component to display module details.
 */
export interface IModule {
  id: string;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
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
  CourseId: string;
  Name: string;
  Description: string;
  StartDate: Date;
  EndDate: Date;
}

/**
 * Represents a user enrolled in courses.
 */
export interface IUser {
  Id: string;
  UserName: string;
  Email: string;
  FirstName: string;
  LastName: string;
  RefreshToken: string;
  RefreshTokenExpireTime: Date;
  CourseIds: string[];
}

/**
 * Represents a document uploaded or associated with a user, course, module, and activity.
 */
export interface IDocument {
  Id: string;
  UserId: string;
  CourseId: string;
  ModuleId: string;
  ActivityId: string;
  Path: string;
  Name: string;
  Description: string;
  TimeStamp: Date;
}
