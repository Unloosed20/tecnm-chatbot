export default function ChatHeader({ title, subtitle }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-[#0a3b82]">
        {title}
      </h2>

      <p className="mt-1 text-slate-600">
        {subtitle}
      </p>
    </div>
  );
}