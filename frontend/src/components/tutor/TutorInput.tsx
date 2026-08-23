"use client";

import { Send } from "lucide-react";
import { useState } from "react";

type Props = {
  onSend: (message: string) => void;
};

export default function TutorInput({ onSend }: Props) {
  const [message, setMessage] = useState("");

  const send = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

  return (
    <div className="border-t p-4">
      <div className="flex gap-3">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ask anything..."
          className="flex-1 rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={send}
          className="px-5 rounded-xl bg-blue-600 text-white flex items-center gap-2"
        >
          <Send size={18} />
          Send
        </button>
      </div>
    </div>
  );
}
