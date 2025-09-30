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
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
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
  courseIds: string[];
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

export interface ICourse {
  id: string;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
}
