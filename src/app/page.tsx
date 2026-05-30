import { ContactForm } from "@/src/components/ui/ContactForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b1020] text-slate-950">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-10">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#0b1020_0%,#172554_48%,#064e3b_100%)]" />
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.16)_1px,transparent_1px)] [background-size:46px_46px]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(255,255,255,.18),transparent)]" />

        <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[8px] border border-white/20 bg-white shadow-2xl md:grid-cols-[0.92fr_1.08fr]">
          <aside className="hidden bg-[#111827] p-8 text-white md:flex md:flex-col md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-300">
                Thomas Salazar
              </p>
              <h1 className="mt-5 text-4xl font-black leading-tight">
                Un mensaje directo, elegante y privado.
              </h1>
            </div>

            <div className="space-y-4">
              <div className="h-px bg-white/15" />
              <p className="max-w-sm text-sm leading-7 text-slate-300">
                Cada envio llega a Gmail con una plantilla cuidada y lista para
                responder desde la bandeja de entrada.
              </p>
            </div>
          </aside>

          <div className="bg-white p-5 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
