"use client";

import { useState, FormEvent } from "react";
import { useInView } from "@/lib/useInView";
type FormStatus = "idle" | "submitting" | "success" | "error";
const factories = [{
  name: "Fábrica de Wuhan",
  tag: "Headquarters",
  address: "No. 17 Jinchuang Road, Wujin Industrial Park, Distrito Hannan, Wuhan",
  addressCN: "武汉市汉南区乌金工业园金创路17号",
  phone: "027-86338180 / 027-84858190",
  fax: "027-86338170",
  email: "xcglass@sina.cn",
  established: "Est. 2005",
  area: "17,000 m²",
  mapUrl: "https://maps.google.com/?q=30.3795,114.1573"
}, {
  name: "Fábrica de Honghu",
  tag: "Nueva Planta",
  address: "Edificios 4 y 6, Parque Industrial de Procesamiento de Vidrio, Xintan Town, Honghu, Hubei",
  addressCN: "湖北省洪湖市新滩镇工业园玻璃深加工产业园4、6号厂房",
  phone: "0716-2693006",
  fax: "0716-2693006",
  email: "1348767121@qq.com",
  established: "Est. 2019",
  area: "20,000 m²",
  mapUrl: "https://maps.google.com/?q=29.8261,113.9456"
}];
const contactMethods = [{
  label: "WhatsApp",
  value: "+86 134 8767 1210",
  href: "https://wa.me/8613487671210",
  desc: "Respuesta más rápida — normalmente en menos de 2 horas",
  icon: "M12 20.25c4.556 0 8.25-3.694 8.25-8.25S16.556 3.75 12 3.75 3.75 7.444 3.75 12c0 1.621.468 3.133 1.276 4.408L3.75 20.25l3.842-1.276A8.209 8.209 0 0012 20.25z"
}, {
  label: "Email",
  value: "xcglass@sina.cn",
  href: "mailto:xcglass@sina.cn",
  desc: "Consultas detalladas con especificaciones y planos",
  icon: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
}, {
  label: "Phone",
  value: "027-86338180",
  href: "tel:+862786338180",
  desc: "Lun–Sáb, 8:00 AM – 6:00 PM (CST)",
  icon: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
}];
export default function ContactClient() {
  const {
    ref: formRef,
    isInView: formVisible
  } = useInView();
  const {
    ref: factRef,
    isInView: factVisible
  } = useInView();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");
    const form = e.currentTarget;
    const data = {
      firstName: (form.elements.namedItem("firstName") as HTMLInputElement).value.trim(),
      lastName: (form.elements.namedItem("lastName") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value.trim(),
      subject: (form.elements.namedItem("subject") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim(),
      // Honeypot
      _hp_website: (form.elements.namedItem("_hp_website") as HTMLInputElement).value
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Submission failed");
      }
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }
  return <main>
      {/* Hero */}
      <section className="bg-brand-dark pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            <p className="text-brand-accent text-sm font-semibold uppercase tracking-wider mb-3">Contáctenos</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight">
              Hablemos de Su Proyecto
            </h1>
            <p className="mt-4 text-white/60 text-lg">
              Ya sea que necesite una cotización rápida o desee analizar una especificación compleja — respondemos en un plazo de 24 horas.
            </p>
          </div>
        </div>
      </section>

      {/* Quick contact methods */}
      <section className="py-10 md:py-14 bg-brand-lighter border-b border-brand-light">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {contactMethods.map(m => <a key={m.label} href={m.href} target={m.label === "WhatsApp" ? "_blank" : undefined} rel={m.label === "WhatsApp" ? "noopener noreferrer" : undefined} className="flex items-start gap-4 p-5 rounded-xl bg-white border border-brand-light hover:border-brand-accent/30 hover:shadow-md transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-accent/20 transition-colors">
                  <svg className="w-5 h-5 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={m.icon} />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-brand-muted uppercase tracking-wider">{m.label}</p>
                  <p className="text-sm font-semibold text-brand-dark mt-0.5 group-hover:text-brand-accent transition-colors">{m.value}</p>
                  <p className="text-xs text-brand-muted mt-1">{m.desc}</p>
                </div>
              </a>)}
          </div>
        </div>
      </section>

      {/* Form + Factory info */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 lg:gap-16">

            {/* Contact form */}
            <div ref={formRef} style={{
            opacity: formVisible ? 1 : 0,
            transform: formVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 700ms"
          }}>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-dark tracking-tight">Envíenos un Mensaje</h2>
              <p className="mt-2 text-brand-muted">Complete los datos a continuación y nos pondremos en contacto con usted en un plazo de un día hábil.</p>

              {status === "success" ? <div className="mt-10 p-8 rounded-2xl bg-brand-lighter border border-brand-light text-center">
                  <div className="w-14 h-14 mx-auto rounded-full bg-green-500/10 flex items-center justify-center">
                    <svg className="w-7 h-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-brand-dark">¡Mensaje enviado!</h3>
                  <p className="mt-2 text-brand-muted text-sm">Nuestro equipo revisará su consulta y responderá en un plazo de 24 horas.</p>
                  <button onClick={() => {
                setStatus("idle");
                setErrorMsg("");
              }} className="mt-4 px-6 py-2 bg-brand-accent text-brand-dark font-semibold rounded-lg hover:bg-brand-accent-hover transition-colors text-sm">
                    Enviar Otro Mensaje
                  </button>
                </div> : <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  {/* Honeypot — hidden from humans */}
                  <div className="absolute -left-[9999px]" aria-hidden="true">
                    <label htmlFor="_hp_website">Do not fill this</label>
                    <input type="text" id="_hp_website" name="_hp_website" tabIndex={-1} autoComplete="off" />
                  </div>

                  {status === "error" && <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
                      {errorMsg}
                    </div>}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-brand-dark mb-1.5">Nombre *</label>
                      <input type="text" name="firstName" required className="w-full px-4 py-2.5 bg-brand-lighter border border-brand-light rounded-lg text-sm text-brand-dark placeholder:text-brand-muted/50 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/30 transition-colors" placeholder="Su nombre" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-dark mb-1.5">Apellido *</label>
                      <input type="text" name="lastName" required className="w-full px-4 py-2.5 bg-brand-lighter border border-brand-light rounded-lg text-sm text-brand-dark placeholder:text-brand-muted/50 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/30 transition-colors" placeholder="Su apellido" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-brand-dark mb-1.5">Correo electrónico *</label>
                      <input type="email" name="email" required className="w-full px-4 py-2.5 bg-brand-lighter border border-brand-light rounded-lg text-sm text-brand-dark placeholder:text-brand-muted/50 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/30 transition-colors" placeholder="you@company.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-dark mb-1.5">Teléfono / WhatsApp</label>
                      <input type="tel" name="phone" className="w-full px-4 py-2.5 bg-brand-lighter border border-brand-light rounded-lg text-sm text-brand-dark placeholder:text-brand-muted/50 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/30 transition-colors" placeholder="+código de país" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-1.5">Subject</label>
                    <select name="subject" className="w-full px-4 py-2.5 bg-brand-lighter border border-brand-light rounded-lg text-sm text-brand-dark focus:outline-none focus:border-brand-accent transition-colors">
                      <option value="General Inquiry">Seleccione un tema</option>
                      <option value="Product Quote Request">Solicitar cotización</option>
                      <option value="Sample Request">Solicitar una muestra</option>
                      <option value="Factory Visit">Programar una visita a la fábrica</option>
                      <option value="Technical Specifications">Consulta técnica</option>
                      <option value="Partnership / Distribution">Consulta de asociación</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-1.5">Mensaje *</label>
                    <textarea name="message" required rows={5} className="w-full px-4 py-2.5 bg-brand-lighter border border-brand-light rounded-lg text-sm text-brand-dark placeholder:text-brand-muted/50 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/30 transition-colors resize-none" placeholder="Cuéntenos sobre su proyecto: tipo de vidrio, dimensiones, cantidad, plazos..." />
                  </div>
                  <button type="submit" disabled={status === "submitting"} className="w-full sm:w-auto px-8 py-3 bg-brand-accent hover:bg-brand-accent-hover disabled:opacity-60 text-brand-dark font-semibold rounded-lg transition-colors text-sm flex items-center justify-center gap-2">
                    {status === "submitting" ? <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Enviando...
                      </> : "Send Message"}
                  </button>
                </form>}
            </div>

            {/* Business info sidebar */}
            <div className="space-y-6" style={{
            opacity: formVisible ? 1 : 0,
            transform: formVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 700ms 200ms"
          }}>
              {/* Hours */}
              <div className="p-5 rounded-xl bg-brand-lighter border border-brand-light">
                <h3 className="font-semibold text-brand-dark text-sm flex items-center gap-2">
                  <svg className="w-4 h-4 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Horario de atención
                </h3>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-brand-muted">Lunes – Sábado</span><span className="text-brand-dark font-medium">8:00 AM – 6:00 PM</span></div>
                  <div className="flex justify-between"><span className="text-brand-muted">Sunday</span><span className="text-brand-dark font-medium">Closed</span></div>
                  <p className="text-xs text-brand-muted pt-2 border-t border-brand-light">Todos los horarios en Hora Estándar de China (CST / UTC+8)</p>
                </div>
              </div>

              {/* Response time */}
              <div className="p-5 rounded-xl bg-brand-accent/5 border border-brand-accent/15">
                <h3 className="font-semibold text-brand-dark text-sm flex items-center gap-2">
                  <svg className="w-4 h-4 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                  Tiempo de respuesta
                </h3>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-brand-muted">WhatsApp</span><span className="text-brand-accent font-medium">< 2 horas</span></div>
                  <div className="flex justify-between"><span className="text-brand-muted">Email</span><span className="text-brand-accent font-medium">< 24 horas</span></div>
                  <div className="flex justify-between"><span className="text-brand-muted">Cotización detallada</span><span className="text-brand-accent font-medium">1–2 días hábiles</span></div>
                </div>
              </div>

              {/* Website */}
              <div className="p-5 rounded-xl bg-brand-lighter border border-brand-light">
                <h3 className="font-semibold text-brand-dark text-sm mb-3">Online</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-brand-muted">Website</span><a href="https://www.xcglass.net" target="_blank" rel="noopener noreferrer" className="text-brand-accent hover:underline">www.xcglass.net</a></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Factory locations */}
      <section className="py-16 md:py-24 bg-brand-lighter" ref={factRef}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12" style={{
          opacity: factVisible ? 1 : 0,
          transform: factVisible ? "translateY(0)" : "translateY(16px)",
          transition: "all 600ms"
        }}>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark tracking-tight">Nuestras Fábricas</h2>
            <p className="mt-4 text-brand-muted text-base md:text-lg">Dos bases de producción en la provincia de Hubei, con una superficie total de 37,000m².</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {factories.map((f, i) => <div key={f.name} className="bg-white rounded-2xl overflow-hidden border border-brand-light hover:shadow-md transition-all duration-300" style={{
            opacity: factVisible ? 1 : 0,
            transform: factVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 600ms",
            transitionDelay: 200 + i * 150 + "ms"
          }}>

                {/* Map placeholder */}
                <div className="aspect-[16/7] bg-brand-lighter relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-8 h-8 text-brand-muted/30 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
                      </svg>
                      <p className="mt-1 text-xs text-brand-muted/40">Área de mapa integrado</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="font-display text-lg font-bold text-brand-dark">{f.name}</h3>
                    <span className="px-2 py-0.5 bg-brand-accent/10 text-brand-accent text-[10px] font-bold rounded-full">{f.tag}</span>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex gap-3">
                      <svg className="w-4 h-4 text-brand-muted flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
                      </svg>
                      <div>
                        <p className="text-brand-dark">{f.address}</p>
                        <p className="text-brand-muted text-xs mt-0.5">{f.addressCN}</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <svg className="w-4 h-4 text-brand-muted flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                      <p className="text-brand-dark">{f.phone}</p>
                    </div>

                    <div className="flex gap-3">
                      <svg className="w-4 h-4 text-brand-muted flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                      <a href={"mailto:" + f.email} className="text-brand-accent hover:underline">{f.email}</a>
                    </div>

                    <div className="flex gap-4 pt-2 border-t border-brand-light mt-3">
                      <span className="text-xs text-brand-muted">{f.established}</span>
                      <span className="text-xs text-brand-muted">{f.area}</span>
                    </div>
                  </div>

                  <a href={f.mapUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-brand-accent hover:text-brand-accent-hover transition-colors">
                    Abrir en Google Maps
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                </div>
              </div>)}
          </div>
        </div>
      </section>
    </main>;
}