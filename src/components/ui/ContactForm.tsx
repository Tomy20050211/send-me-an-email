"use client";

import { useEmail } from "@/src/hooks/useEmail";

export function ContactForm() {
  const {
    name,
    email,
    subject,
    message,
    status,
    feedback,
    setName,
    setEmail,
    setSubject,
    setMessage,
    handleSubmit,
  } = useEmail();

  const isLoading = status === "loading";

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-5 rounded-[8px] bg-white"
    >
      <div className="space-y-2">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">
          Contacto seguro
        </p>
        <h2 className="text-3xl font-black leading-tight text-slate-950">
          Envia tu mensaje
        </h2>
        <p className="text-sm leading-6 text-slate-500">
          Completa los datos y Thomas recibira tu correo en una plantilla
          elegante.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-slate-700">
          Nombre
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            name="name"
            type="text"
            autoComplete="name"
            required
            minLength={2}
            placeholder="Tu nombre"
            className="h-13 rounded-[8px] border border-slate-200 bg-slate-50 px-4 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
          />
        </label>

        <label className="grid gap-2 text-sm font-bold text-slate-700">
          Correo
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="tu@email.com"
            className="h-13 rounded-[8px] border border-slate-200 bg-slate-50 px-4 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
          />
        </label>
      </div>

      <label className="grid gap-2 text-sm font-bold text-slate-700">
        Asunto
        <input
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          name="subject"
          type="text"
          required
          minLength={3}
          placeholder="Quiero contactarte"
          className="h-13 rounded-[8px] border border-slate-200 bg-slate-50 px-4 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
        />
      </label>

      <label className="grid gap-2 text-sm font-bold text-slate-700">
        Mensaje
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          name="message"
          required
          minLength={10}
          rows={6}
          placeholder="Cuentame que necesitas..."
          className="resize-none rounded-[8px] border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
        />
      </label>

      <div className="grid gap-3">
        <button
          type="submit"
          disabled={isLoading}
          className="h-13 rounded-[8px] bg-[#111827] px-6 text-sm font-black uppercase tracking-[0.12em] text-white shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isLoading ? "Enviando..." : "Enviar mensaje"}
        </button>

        <p
          aria-live="polite"
          className={`min-h-6 text-center text-sm font-medium ${
            status === "error" ? "text-red-600" : "text-emerald-700"
          }`}
        >
          {feedback}
        </p>
      </div>
    </form>
  );
}
