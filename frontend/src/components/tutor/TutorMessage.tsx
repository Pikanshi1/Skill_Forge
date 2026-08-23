"use client";

import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

type Props = {
  role: "user" | "assistant";
  message: string;
};

export default function TutorMessage({ role, message }: Props) {
  const isUser = role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
          <Bot size={18} />
        </div>
      )}

      <div
        className={`
${isUser ? "bg-blue-600 text-white" : "bg-white border text-gray-800"}
max-w-3xl
rounded-2xl
px-5
py-4
shadow-sm
leading-7
`}
      >
        {isUser ? (
          message
        ) : (
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                code({ children, className }) {
                  return (
                    <pre className="bg-gray-900 text-white rounded-xl p-4 overflow-x-auto my-4">
                      <code className={className}>{children}</code>
                    </pre>
                  );
                },
              }}
            >
              {message}
            </ReactMarkdown>
          </div>
        )}
      </div>

      {isUser && (
        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
          <User size={18} />
        </div>
      )}
    </div>
  );
}
