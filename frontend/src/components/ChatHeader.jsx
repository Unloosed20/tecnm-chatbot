export default function ChatHeader({ title, subtitle }) {
  return (
    <header className="border-b border-slate-200 bg-white px-8 py-6">
      <h2 className="text-2xl font-bold text-[#0a3b82]">
        {title}
      </h2>

      <p className="mt-1 text-slate-600">
        {subtitle}
      </p>
    </header>
  );
}