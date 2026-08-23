"use client";

import { useState } from "react";

import {
  Upload,
  Clock3,
  Target,
  BookOpen,
} from "lucide-react";

import useCourse from "@/hooks/useCourse";

import {
  Difficulty,
  CreateCourseRequest,
} from "@/types/course";

interface CourseFormProps {
  initialValues?: Partial<CreateCourseRequest>;

  onSubmit: (
    data: CreateCourseRequest
  ) => Promise<void>;

  onSaveDraft?: (
    data: CreateCourseRequest
  ) => Promise<void>;

  submitText?: string;
}

export default function CourseForm({
  initialValues,
  onSubmit,
  onSaveDraft,
  submitText = "Create Course",
}: CourseFormProps) {


  const loading = useCourse(
    (state) => state.loading
  );

const [formData, setFormData] =
  useState<CreateCourseRequest>({
    title: initialValues?.title ?? "",
    description: initialValues?.description ?? "",
    goal: initialValues?.goal ?? "",
    duration: initialValues?.duration ?? 5,
    difficulty:
      initialValues?.difficulty ??
      "BEGINNER",
  });

  const [category, setCategory] =
    useState("");

  const [thumbnail, setThumbnail] =
    useState<File | null>(null);

  const [tags, setTags] =
    useState("");

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "duration"
          ? Number(value)
          : value,
    }));
  }

  function handleDifficulty(
    difficulty: Difficulty
  ) {
    setFormData((prev) => ({
      ...prev,
      difficulty,
    }));
  }

  function handleThumbnail(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    if (!e.target.files?.length) return;

    setThumbnail(e.target.files[0]);
  }

 
async function handleSaveDraft() {
  if (formData.title.trim().length < 3) {
    alert("Course title must be at least 3 characters.");
    return;
  }

  if (formData.description.trim().length < 10) {
    alert("Description must be at least 10 characters.");
    return;
  }

  if (formData.duration < 1 || formData.duration > 365) {
    alert("Duration must be between 1 and 365 days.");
    return;
  }

  if (!onSaveDraft) return;

  await onSaveDraft(formData);
}


async function handleSubmit(
  e: React.FormEvent
) {
  e.preventDefault();

  if (formData.title.trim().length < 3) {
    alert("Course title must be at least 3 characters.");
    return;
  }

  if (formData.description.trim().length < 10) {
    alert("Description must be at least 10 characters.");
    return;
  }

  if (formData.duration < 1 || formData.duration > 365) {
    alert("Duration must be between 1 and 365 days.");
    return;
  }

  await onSubmit(formData);
}

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 rounded-3xl bg-white p-10 shadow-xl"
    >
      <div>

        <h2 className="text-3xl font-bold">
          Course Information
        </h2>

        <p className="mt-2 text-gray-500">
          Fill in the basic details of your
          course or let AI generate everything.
        </p>

      </div>

      <div>

        <label className="mb-2 block font-semibold">
          Course Title
        </label>

        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Complete React Masterclass"
          className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-purple-600"
          required
        />

      </div>

      <div>

        <label className="mb-2 block font-semibold">
          Description
        </label>

        <textarea
          rows={5}
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your course..."
          className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-purple-600"
          required
        />

      </div>

      <div>

        <label className="mb-2 flex items-center gap-2 font-semibold">

          <Target size={18} />

          Learning Goal

        </label>

        <input
          name="goal"
          value={formData.goal}
          onChange={handleChange}
          placeholder="Become job ready in React."
          className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-purple-600"
        />

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <div>

          <label className="mb-2 flex items-center gap-2 font-semibold">

            <Clock3 size={18} />

            Estimated Duration

          </label>

          <input
            type="number"
            name="duration"
            min={1}
            value={formData.duration}
            onChange={handleChange}
            className="w-full rounded-2xl border border-gray-300 px-4 py-3"
          />

        </div>

        <div>

          <label className="mb-2 flex items-center gap-2 font-semibold">

            <BookOpen size={18} />

            Category

          </label>

          <input
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            placeholder="Web Development"
            className="w-full rounded-2xl border border-gray-300 px-4 py-3"
          />

        </div>

      </div>

      <div>

        <label className="mb-4 block font-semibold">
          Difficulty
        </label>

        <div className="flex gap-4">

          {(
            [
              "BEGINNER",
              "INTERMEDIATE",
              "ADVANCED",
            ] as Difficulty[]
          ).map((level) => (

            <button
              type="button"
              key={level}
              onClick={() =>
                handleDifficulty(level)
              }
              className={`rounded-xl px-5 py-3 font-semibold transition

              ${
                formData.difficulty === level
                  ? "bg-purple-600 text-white"
                  : "border border-gray-300"
              }`}
            >
              {level}
            </button>

          ))}

        </div>

      </div>

      <div>

        <label className="mb-2 block font-semibold">
          Course Thumbnail
        </label>

        <label className="flex cursor-pointer items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-purple-300 py-8 transition hover:bg-purple-50">

          <Upload />

          <span>

            {thumbnail
              ? thumbnail.name
              : "Upload Thumbnail"}

          </span>

          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleThumbnail}
          />

        </label>

      </div>
      <div>

        <label className="mb-2 block font-semibold">
          Tags
        </label>

        <input
          value={tags}
          onChange={(e) =>
            setTags(e.target.value)
          }
          placeholder="react, frontend, javascript"
          className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-purple-600"
        />

        <p className="mt-2 text-sm text-gray-500">
          Separate tags using commas.
        </p>

      </div>

      {/* <div className="rounded-3xl border border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 p-6">

        <div className="flex items-start justify-between">

          <div>

            <h3 className="flex items-center gap-2 text-xl font-bold">

              <Sparkles
                className="text-purple-600"
                size={22}
              />

              AI Course Generator

            </h3>

            <p className="mt-2 text-gray-600">
              Let AI generate modules, lessons,
              quizzes and learning content from
              your course idea.
            </p>

          </div>

          <button
            type="button"
            onClick={handleGenerateAI}
            disabled={
              aiLoading ||
              !formData.title ||
              !formData.description
            }
            className="rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 font-semibold text-white transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {aiLoading
              ? "Generating..."
              : "Generate with AI"}
          </button>

        </div>

      </div> */}

      <div className="flex flex-col gap-4 pt-4 md:flex-row">

        <button
  type="button"
  onClick={handleSaveDraft}
  disabled={loading}
  className="flex-1 rounded-2xl border border-gray-300 py-4 font-semibold transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
>
  Save Draft
</button>

        <button
          type="submit"
          disabled={loading}
          className="flex-1 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 py-4 font-semibold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
        >
         {loading
  ? "Saving..."
  : submitText}
        </button>

      </div>

    </form>
  );
}
