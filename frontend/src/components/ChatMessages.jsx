import { GraduationCap } from "lucide-react";

export default function ChatMessages({ messages, isTyping }) {
  return (
    <div className="mt-6 space-y-4">
      {messages.map((message) => {
        const isUser = message.role === "user";

        return (
          <div
            key={message.id}
            className={`flex ${isUser ? "justify-end" : "justify-start"}`}
          >
            {isUser ? (
              <div className="max-w-2xl rounded-2xl bg-[#0a3b82] px-5 py-4 text-white shadow-sm">
                <p>{message.text}</p>
              </div>
            ) : (
              <div className="flex max-w-3xl items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0a3b82] text-white">
                  <GraduationCap className="h-5 w-5" />
                </div>

                <div className="rounded-2xl bg-white px-5 py-4 text-slate-800 shadow-sm">
                  <p>{message.text}</p>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {isTyping && (
        <div className="flex justify-start">
          <div className="flex max-w-3xl items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0a3b82] text-white">
              <GraduationCap className="h-5 w-5" />
            </div>

            <div className="rounded-2xl bg-white px-5 py-4 text-slate-500 shadow-sm">
              <p>El asistente está escribiendo...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}