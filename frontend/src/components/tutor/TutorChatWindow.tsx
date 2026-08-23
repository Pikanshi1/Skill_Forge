import TutorMessage from "./TutorMessage";

type Message = {
  role: "user" | "assistant";
  message: string;
};

type Props = {
  messages: Message[];
};

export default function TutorChat({ messages }: Props) {
  return (
    <div className="flex-1 overflow-y-auto p-5 space-y-5">
      {messages.map((msg, index) => (
        <TutorMessage key={index} role={msg.role} message={msg.message} />
      ))}
    </div>
  );
}
