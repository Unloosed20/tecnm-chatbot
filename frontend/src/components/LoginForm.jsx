import { useState } from "react";

export default function LoginForm({ onLogin, isLoading, error }) {
  const [controlNumber, setControlNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin({ controlNumber, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f6f8] px-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#0a3b82]">TecNM Acapulco</h1>
          <p className="mt-2 text-slate-600">
            Inicia sesión con tu número de control
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Número de control
            </label>
            <input
              type="text"
              value={controlNumber}
              onChange={(event) => setControlNumber(event.target.value)}
              placeholder="22320809"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#0a3b82]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="********"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#0a3b82]"
            />
          </div>

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-2xl bg-[#0a3b82] px-4 py-3 font-medium text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Ingresando..." : "Iniciar sesión"}
          </button>
        </form>
      </div>
    </div>
  );
}