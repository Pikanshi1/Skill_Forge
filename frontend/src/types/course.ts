export type Difficulty =
  | "BEGINNER"
  | "INTERMEDIATE"
  | "ADVANCED";

export type CourseStatus =
  | "DRAFT"
  | "PUBLISHED"
  | "ARCHIVED";

export interface Lesson {
  id: string;

  title: string;

  description: string;

  content?: string;

  videoUrl?: string;

  duration: number;

  order: number;

  module?: {
    title: string;
  };
}

export interface Module {
  id: string;

  title: string;

  description: string;

  order: number;

  lessons: Lesson[];
}

export interface Course {
  id: string;

  title: string;

  description: string;

  goal?: string;

  thumbnail?: string;

  duration: number;

  difficulty: Difficulty;

  status: CourseStatus;

  createdAt: string;

  updatedAt: string;

  modules: Module[];
}

export interface CreateCourseRequest {
  title: string;

  description: string;

  goal?: string;

  duration: number;

  difficulty: Difficulty;
}

export interface UpdateCourseRequest {
  title?: string;

  description?: string;

  goal?: string;

  duration?: number;

  difficulty?: Difficulty;

  thumbnail?: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content?: string;
  videoUrl?: string;
  duration: number;
  order: number;
}

export interface GenerateCourseRequest {
  topic: string;
  difficulty: Difficulty;
  duration: number;
  studyHoursPerDay: number;
  goal: string;
}