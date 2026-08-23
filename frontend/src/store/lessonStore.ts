"use client";

import { create } from "zustand";

import lessonService from "@/services/lessonService";

import { Lesson } from "@/types/course";

interface LessonState {
  lesson: Lesson | null;

  loading: boolean;
  error: string | null;
  completed: boolean;

  getLesson: (id: string) => Promise<void>;

  markComplete: (id: string) => Promise<void>;
}

export const useLessonStore = create<LessonState>((set) => ({
  lesson: null,

  loading: false,
  error: null,

  completed: false,


  getLesson: async (id) => {
    set({
      loading: true,
      error: null,
    });

    try {
      const response = await lessonService.getLesson(id);
      const data = response.data as Lesson & { completed?: boolean };

      set({
        lesson: data,
        completed: data.completed ?? false,
      });

    } catch (error) {
      set({
        lesson: null,
        error: error instanceof Error ? error.message : "Unable to load this lesson.",
      });
    } finally {
      set({
        loading: false,
      });
    }
  },


  markComplete: async (id) => {
    try {

      await lessonService.markComplete(id);

      set({
        completed: true,
      });

    } catch (error) {
      console.error(
        "Failed to complete lesson",
        error
      );
    }
  },
}));