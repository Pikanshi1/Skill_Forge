"use client";

import { create } from "zustand";

import courseService from "@/services/courseService";

import {
  Course,
  CreateCourseRequest,
  GenerateCourseRequest,
} from "@/types/course";

interface CourseState {
  courses: Course[];

  selectedCourse: Course | null;

  loading: boolean;

  fetchCourses: () => Promise<void>;

  getCourse: (
    id: string
  ) => Promise<void>;

  createCourse: (
    data: CreateCourseRequest
  ) => Promise<void>;

  updateCourse: (
    id: string,
    data: Partial<CreateCourseRequest>
  ) => Promise<void>;

  deleteCourse: (
    id: string
  ) => Promise<void>;

  publishCourse: (
    id: string
  ) => Promise<void>;

clearCourses: () => void;
generateCourse: (
  data: GenerateCourseRequest
) => Promise<void>;
}

export const useCourseStore =
  create<CourseState>((set) => ({
    courses: [],

    selectedCourse: null,

    loading: false,

    fetchCourses: async () => {
      set({
        loading: true,
      });

      try {
        const response =
          await courseService.getCourses();

        set({
          courses: response.data,
        });
      } finally {
        set({
          loading: false,
        });
      }
    },

    getCourse: async (
      id
    ) => {
      set({
        loading: true,
      });

      try {
        const response =
          await courseService.getCourse(id);

        set({
          selectedCourse:
            response.data,
        });
      } finally {
        set({
          loading: false,
        });
      }
    },

    createCourse: async (
      data
    ) => {
      await courseService.createCourse(
        data
      );

      const response =
        await courseService.getCourses();

      set({
        courses: response.data,
      });
    },

    updateCourse: async (
      id,
      data
    ) => {
      const response =
        await courseService.updateCourse(
          id,
          data
        );

      set((state) => ({
        courses:
          state.courses.map((course) =>
            course.id === id
              ? response.data
              : course
          ),

        selectedCourse:
          state.selectedCourse?.id ===
          id
            ? response.data
            : state.selectedCourse,
      }));
    },

    deleteCourse: async (
      id
    ) => {
      await courseService.deleteCourse(
        id
      );

      set((state) => ({
        courses:
          state.courses.filter(
            (course) =>
              course.id !== id
          ),

        selectedCourse:
          state.selectedCourse?.id ===
          id
            ? null
            : state.selectedCourse,
      }));
    },

publishCourse: async (
  id
) => {
  const response =
    await courseService.publishCourse(
      id
    );

  set((state) => ({
    courses:
      state.courses.map((course) =>
        course.id === id
          ? response.data
          : course
      ),

    selectedCourse:
      state.selectedCourse?.id === id
        ? response.data
        : state.selectedCourse,
  }));
},

clearCourses: () => {
  set({
    courses: [],
    selectedCourse: null,
  });
},

generateCourse: async (
  data
) => {

  set({
    loading:true,
  });

  try {

    const response =
      await courseService.generateCourse(
        data
      );


    set((state)=>({
      courses:[
        response.data,
        ...state.courses
      ]
    }));

  }
  finally {

    set({
      loading:false,
    });

  }

},

}));