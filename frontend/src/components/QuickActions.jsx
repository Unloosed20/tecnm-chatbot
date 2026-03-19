export default function QuickActions({ actions, onSelectAction }) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {actions.map((action) => (
        <button
          key={action}
          onClick={() => onSelectAction(action)}
          className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50"
        >
          {action}
        </button>
      ))}
    </div>
  );
}