import {
  Home,
  FileText,
  BadgeHelp,
  GraduationCap,
  Users,
  Briefcase,
  Languages,
  BookOpen,
  MessageSquare,
  Plus,
} from "lucide-react";

const menuItems = [
  { label: "Inicio", icon: Home },
  { label: "Trámites escolares", icon: FileText },
  { label: "Becas", icon: BadgeHelp },
  { label: "Titulación", icon: GraduationCap },
  { label: "Servicio social", icon: Users },
  { label: "Residencias profesionales", icon: Briefcase },
  { label: "Inglés", icon: Languages },
  { label: "Créditos Complementarios", icon: BookOpen },
];

export default function Sidebar({
  activeItem,
  onSelectItem,
  chats,
  activeChatId,
  onSelectChat,
  onCreateNewChat,
}) {
  return (
    <aside className="flex h-screen flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0a3b82] text-white">
            <GraduationCap className="h-6 w-6" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-[#0a3b82]">TecNM</h1>
            <p className="text-sm text-slate-500">Acapulco</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.label;

              return (
                <li key={item.label}>
                  <button
                    onClick={() => onSelectItem(item.label)}
                    className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                      isActive
                        ? "bg-[#0a3b82] text-white shadow-sm"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    <span className="leading-5">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-6 border-t border-slate-200 pt-4">
          <div className="mb-3 flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-slate-500" />
              <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Tus chats
              </h2>
            </div>

            <button
              onClick={onCreateNewChat}
              className="rounded-lg p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
              title="Nuevo chat"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-1">
            {chats.map((chat) => {
              const isActiveChat = activeChatId === chat.id;

              return (
                <button
                  key={chat.id}
                  onClick={() => onSelectChat(chat.id)}
                  className={`w-full rounded-xl px-3 py-2 text-left text-sm transition ${
                    isActiveChat
                      ? "bg-slate-100 text-slate-900"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
                  }`}
                >
                  <span className="block truncate font-medium">{chat.title}</span>
                  <span className="mt-0.5 block truncate text-xs text-slate-400">
                    {chat.section}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0a3b82] font-semibold text-white">
            JS
          </div>

          <div>
            <p className="font-semibold text-slate-900">Juan Sánchez</p>
            <p className="text-sm text-slate-500">Estudiante</p>
          </div>
        </div>
      </div>
    </aside>
  );
}