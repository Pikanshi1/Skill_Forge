import LessonNavigation from "./LessonNavigation";
import LessonProgress from "./LessonProgress";

type LessonContentProps = {
  content: string;
  summary?: string;
  videoUrl?: string;
  completed?: boolean;
  onComplete?: () => void;
};

export default function LessonContent({
  content,
  summary,
  videoUrl,
  completed = false,
  onComplete,
}: LessonContentProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-5xl mx-auto p-10">
        <h1 className="text-4xl font-bold mb-8">
          Lesson
        </h1>

        {videoUrl && (
          <div className="mb-8">
            <video
              controls
              className="w-full rounded-xl"
              src={videoUrl}
            />
          </div>
        )}

        <div className="text-gray-700 leading-8 whitespace-pre-wrap">
          {content}
        </div>

        {summary && (
          <div className="mt-10 rounded-xl border p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Summary
            </h2>
            <p className="leading-8 text-gray-700">
              {summary}
            </p>
          </div>
        )}

        <LessonProgress progress={completed ? 100 : 0} />

        <button
          type="button"
          onClick={onComplete}
          disabled={completed || !onComplete}
          className={`mt-6 rounded-xl px-5 py-3 font-semibold text-white ${completed ? "bg-green-600" : "bg-purple-600 hover:bg-purple-700"}`}
        >
          {completed ? "Lesson completed" : "Mark lesson complete"}
        </button>

        <LessonNavigation />
      </div>
    </div>
  );
}