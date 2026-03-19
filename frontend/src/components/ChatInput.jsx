import { Paperclip, Mic, Send } from "lucide-react";

export default function ChatInput({ inputValue, onChangeInput, onSendMessage }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSendMessage();
  };

  return (
    <div className="border-t border-slate-200 bg-white px-8 py-5">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-3 rounded-[24px] border border-slate-200 bg-white px-5 py-3 shadow-sm"
      >
        <button
          type="button"
          className="text-slate-400 transition hover:text-slate-600"
        >
          <Paperclip className="h-5 w-5" />
        </button>

        <input
          type="text"
          value={inputValue}
          onChange={(event) => onChangeInput(event.target.value)}
          placeholder="Escribe tu pregunta..."
          className="flex-1 bg-transparent text-base text-slate-700 outline-none placeholder:text-slate-400"
        />

        <button
          type="button"
          className="text-slate-400 transition hover:text-slate-600"
        >
          <Mic className="h-5 w-5" />
        </button>

        <button
          type="submit"
          className="rounded-full bg-slate-100 p-3 text-slate-500 transition hover:bg-slate-200"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}