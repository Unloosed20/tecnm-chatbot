import { GraduationCap } from "lucide-react";

export default function WelcomeMessage({ message, time = "10:30 a.m." }) {
  return (
    <div className="max-w-4xl rounded-2xl bg-[#eef1f5] p-5">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0a3b82] text-white">
          <GraduationCap className="h-5 w-5" />
        </div>

        <div>
          <p className="text-lg text-slate-800">
            {message}
          </p>

          <p className="mt-2 text-xs text-slate-400">
            {time}
          </p>
        </div>
      </div>
    </div>
  );
}