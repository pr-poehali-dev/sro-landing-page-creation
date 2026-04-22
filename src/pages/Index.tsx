import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const useInView = (threshold = 0.15) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
};

const Reveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

const problems = [
  { icon: "Clock", title: "Бесконечные очереди", desc: "Месяцами ждёте одобрения документов, пока конкуренты уже работают" },
  { icon: "FileX", title: "Отказы из-за ошибок", desc: "Один неправильно оформленный документ — и всё начинается заново" },
  { icon: "ShieldAlert", title: "Непрозрачные требования", desc: "Каждое СРО выдвигает свои условия, разобраться самостоятельно крайне сложно" },
  { icon: "Wallet", title: "Скрытые расходы", desc: "Дополнительные взносы, штрафы и повторные подачи бьют по бюджету" },
];

const services = [
  {
    num: "01",
    icon: "ClipboardCheck",
    title: "Полное сопровождение",
    desc: "От подготовки документов до внесения во все государственные реестры — берём на себя весь процесс целиком",
    tag: "Ключевая услуга",
  },
  {
    num: "02",
    icon: "MessageSquare",
    title: "Консультация и подготовка",
    desc: "Детально разбираем требования вашего СРО и готовим компанию к успешному прохождению проверки",
    tag: "",
  },
  {
    num: "03",
    icon: "FileText",
    title: "Оформление документов",
    desc: "Подготавливаем и оформляем весь пакет необходимых документов в строгом соответствии с требованиями",
    tag: "",
  },
  {
    num: "04",
    icon: "Send",
    title: "Подача и регистрация",
    desc: "Подаём документы и сопровождаем регистрацию во всех государственных реестрах без вашего участия",
    tag: "",
  },
  {
    num: "05",
    icon: "Headphones",
    title: "Постоянная поддержка",
    desc: "После вступления в СРО остаёмся рядом — консультируем и помогаем при любых изменениях требований",
    tag: "",
  },
];

const steps = [
  { num: "1", title: "Первичная консультация", desc: "Бесплатно разбираем вашу ситуацию, определяем нужное СРО и стратегию вступления" },
  { num: "2", title: "Аудит документов", desc: "Проверяем имеющиеся документы, составляем список недостающих и план действий" },
  { num: "3", title: "Подготовка пакета", desc: "Собираем, оформляем и проверяем все необходимые документы на соответствие требованиям" },
  { num: "4", title: "Подача в СРО", desc: "Подаём документы, взаимодействуем с СРО и отслеживаем статус рассмотрения" },
  { num: "5", title: "Регистрация и реестры", desc: "После одобрения — вносим данные во все государственные реестры и передаём вам свидетельство" },
];

const results = [
  { value: "98%", label: "Успешных вступлений" },
  { value: "14", label: "Дней в среднем" },
  { value: "500+", label: "Компаний-клиентов" },
  { value: "0", label: "Отказов по нашей вине" },
];

const faqs = [
  { q: "Сколько времени занимает вступление в СРО?", a: "В среднем 14–21 рабочий день с момента передачи нам всех документов. В срочных случаях — ускоренная процедура от 7 дней." },
  { q: "Какие документы потребуются от нашей компании?", a: "Стандартный пакет: учредительные документы, свидетельства, дипломы специалистов, справки об отсутствии судимостей. Полный список составляем после консультации." },
  { q: "Гарантируете ли вы успешное вступление?", a: "Да. 98% наших клиентов вступают в СРО с первого раза. В редких случаях отказа — дорабатываем документы и повторно подаём бесплатно." },
  { q: "Работаете ли вы с иногородними компаниями?", a: "Да, работаем по всей России. Все процессы ведём дистанционно — электронный документооборот и курьерская доставка." },
  { q: "Сколько стоят ваши услуги?", a: "Стоимость зависит от вида СРО и объёма работ. Базовое сопровождение от 25 000 руб. Точную цену назовём после бесплатной консультации." },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0C10] text-white font-body overflow-x-hidden">

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0A0C10]/95 backdrop-blur-md border-b border-white/5 shadow-lg" : ""}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-display font-bold text-xl tracking-tight">
            <span className="text-[#39FF14]">СРО</span>
            <span className="text-white">Эксперт</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
            {[["problems","Проблемы"],["services","Услуги"],["process","Процесс"],["results","Результаты"],["faq","FAQ"]].map(([id,label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="hover:text-[#39FF14] transition-colors duration-200">{label}</button>
            ))}
          </div>
          <button
            onClick={() => scrollTo("contacts")}
            className="hidden md:block bg-[#39FF14] text-[#0A0C10] font-bold text-sm px-5 py-2.5 rounded-full hover:bg-[#57FF35] hover:scale-105 transition-all duration-200"
          >
            Получить консультацию
          </button>
          <button className="md:hidden text-white/70" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#0D1017] border-t border-white/10 px-6 py-4 flex flex-col gap-4 text-sm">
            {[["problems","Проблемы"],["services","Услуги"],["process","Процесс"],["results","Результаты"],["faq","FAQ"],["contacts","Контакты"]].map(([id,label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-white/60 hover:text-[#39FF14] text-left transition-colors">{label}</button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#39FF14]/6 blur-[120px]" />
          <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-[#00D4FF]/4 blur-[100px]" />
          <div className="absolute inset-0" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }} />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 border border-[#39FF14]/30 rounded-full px-4 py-1.5 mb-8 bg-[#39FF14]/5 text-sm text-[#39FF14] font-medium">
            <span className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse" />
            Профессиональное сопровождение в СРО
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black leading-none mb-6 tracking-tight">
            Вступление<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] to-[#00D4FF]">в СРО</span>
            <br />
            <span className="text-white/90">под ключ</span>
          </h1>
          <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Берём на себя весь процесс — от консультации до внесения в государственные реестры. Без лишней волокиты, в срок.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollTo("contacts")}
              className="bg-[#39FF14] text-[#0A0C10] font-bold text-base px-8 py-4 rounded-full hover:bg-[#57FF35] hover:scale-105 transition-all duration-200 shadow-[0_0_30px_rgba(57,255,20,0.3)]"
            >
              Бесплатная консультация
            </button>
            <button
              onClick={() => scrollTo("services")}
              className="border border-white/20 text-white font-medium text-base px-8 py-4 rounded-full hover:border-[#39FF14]/50 hover:text-[#39FF14] transition-all duration-200"
            >
              Наши услуги →
            </button>
          </div>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-5">
            {results.map((r, i) => (
              <div key={i} className="border border-white/8 rounded-2xl p-5 bg-white/[0.02] backdrop-blur-sm">
                <div className="font-display text-3xl md:text-4xl font-black text-[#39FF14]">{r.value}</div>
                <div className="text-white/40 text-sm mt-1">{r.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={24} className="text-white/20" />
        </div>
      </section>

      {/* PROBLEMS */}
      <section id="problems" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-[#39FF14] text-sm font-semibold uppercase tracking-widest mb-4 block">Знакомая ситуация?</span>
              <h2 className="font-display text-4xl md:text-5xl font-black">С чем сталкиваются<br /><span className="text-white/30">компании без помощника</span></h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-5">
            {problems.map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="group relative border border-white/8 rounded-2xl p-7 bg-white/[0.02] hover:border-red-500/30 hover:bg-red-500/[0.03] transition-all duration-300 overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-red-500/5 blur-3xl group-hover:bg-red-500/10 transition-all duration-500" />
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                      <Icon name={p.icon} size={22} className="text-red-400" fallback="AlertCircle" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg mb-2">{p.title}</h3>
                      <p className="text-white/45 text-sm leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION BANNER */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="relative rounded-3xl overflow-hidden border border-[#39FF14]/20 bg-gradient-to-br from-[#39FF14]/8 via-[#0A0C10] to-[#00D4FF]/5 p-10 md:p-16 text-center">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 rounded-full bg-[#39FF14]/10 blur-3xl" />
              </div>
              <div className="relative">
                <span className="text-[#39FF14] text-sm font-semibold uppercase tracking-widest mb-6 block">Наше решение</span>
                <h2 className="font-display text-3xl md:text-5xl font-black mb-6 leading-tight">
                  Мы делаем всё сами —<br />вы занимаетесь бизнесом
                </h2>
                <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
                  Наши эксперты знают требования каждого СРО и берут на себя полную ответственность за результат. Вы просто передаёте нам задачу и получаете готовое свидетельство.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="mb-16">
              <span className="text-[#39FF14] text-sm font-semibold uppercase tracking-widest mb-4 block">Услуги</span>
              <h2 className="font-display text-4xl md:text-5xl font-black">Что мы делаем<br /><span className="text-white/30">для вашей компании</span></h2>
            </div>
          </Reveal>
          <div className="space-y-4">
            {services.map((s, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="group border border-white/8 rounded-2xl p-6 md:p-8 bg-white/[0.02] hover:border-[#39FF14]/25 hover:bg-[#39FF14]/[0.03] transition-all duration-300 cursor-default">
                  <div className="flex items-start gap-6">
                    <div className="text-[#39FF14]/30 font-display font-black text-2xl w-10 shrink-0">{s.num}</div>
                    <div className="w-12 h-12 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center shrink-0 group-hover:border-[#39FF14]/30 group-hover:bg-[#39FF14]/8 transition-all duration-300">
                      <Icon name={s.icon} size={22} className="text-white/60 group-hover:text-[#39FF14] transition-colors duration-300" fallback="Star" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="font-display font-bold text-xl">{s.title}</h3>
                        {s.tag && (
                          <span className="text-xs px-3 py-1 rounded-full bg-[#39FF14]/10 text-[#39FF14] border border-[#39FF14]/20 font-medium">{s.tag}</span>
                        )}
                      </div>
                      <p className="text-white/45 leading-relaxed">{s.desc}</p>
                    </div>
                    <Icon name="ArrowRight" size={20} className="text-white/15 group-hover:text-[#39FF14]/50 transition-all duration-300 shrink-0 mt-1 hidden md:block" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-[#39FF14] text-sm font-semibold uppercase tracking-widest mb-4 block">Как мы работаем</span>
              <h2 className="font-display text-4xl md:text-5xl font-black">5 шагов до<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] to-[#00D4FF]">членства в СРО</span></h2>
            </div>
          </Reveal>
          <div className="relative">
            <div className="hidden md:block absolute left-[27px] top-8 bottom-8 w-[2px] bg-gradient-to-b from-[#39FF14]/30 via-[#00D4FF]/20 to-transparent" />
            <div className="space-y-6">
              {steps.map((s, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="flex gap-6 items-start">
                    <div className="relative shrink-0 w-14 h-14 rounded-full border-2 border-[#39FF14]/40 bg-[#39FF14]/10 flex items-center justify-center z-10">
                      <span className="font-display font-black text-[#39FF14] text-lg">{s.num}</span>
                    </div>
                    <div className="border border-white/8 rounded-2xl p-6 bg-white/[0.02] flex-1 hover:border-[#39FF14]/20 transition-all duration-300">
                      <h3 className="font-display font-bold text-lg mb-2">{s.title}</h3>
                      <p className="text-white/45 text-sm leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section id="results" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-[#39FF14] text-sm font-semibold uppercase tracking-widest mb-4 block">Наши результаты</span>
              <h2 className="font-display text-4xl md:text-5xl font-black">Цифры говорят<br /><span className="text-white/30">сами за себя</span></h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {results.map((r, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="relative overflow-hidden border border-white/8 rounded-2xl p-8 bg-white/[0.02] text-center group hover:border-[#39FF14]/25 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#39FF14]/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative font-display text-4xl md:text-5xl font-black text-[#39FF14] mb-2">{r.value}</div>
                  <div className="relative text-white/40 text-sm">{r.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.4}>
            <div className="mt-8 border border-white/8 rounded-2xl p-8 bg-white/[0.02] text-center">
              <p className="text-white/50 text-base leading-relaxed max-w-2xl mx-auto">
                За 7 лет работы мы помогли более чем <strong className="text-white">500 компаниям</strong> успешно вступить в СРО. Средний срок — <strong className="text-[#39FF14]">14 дней</strong> с момента первой консультации.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-[#39FF14] text-sm font-semibold uppercase tracking-widest mb-4 block">Частые вопросы</span>
              <h2 className="font-display text-4xl md:text-5xl font-black">FAQ</h2>
            </div>
          </Reveal>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="border border-white/8 rounded-2xl overflow-hidden bg-white/[0.02]">
                  <button
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-white/[0.03] transition-colors duration-200"
                    onClick={() => setActiveTab(activeTab === i ? null : i)}
                  >
                    <span className="font-medium text-white/85 text-sm md:text-base">{f.q}</span>
                    <Icon
                      name={activeTab === i ? "Minus" : "Plus"}
                      size={18}
                      className={`shrink-0 transition-colors duration-200 ${activeTab === i ? "text-[#39FF14]" : "text-white/30"}`}
                    />
                  </button>
                  <div
                    style={{
                      maxHeight: activeTab === i ? "200px" : "0",
                      opacity: activeTab === i ? 1 : 0,
                      overflow: "hidden",
                      transition: "max-height 0.35s ease, opacity 0.3s ease",
                    }}
                  >
                    <p className="px-6 pb-6 text-white/45 text-sm leading-relaxed border-t border-white/5 pt-4">{f.a}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="relative rounded-3xl overflow-hidden border border-[#39FF14]/25 bg-gradient-to-br from-[#39FF14]/10 via-[#0A0C10] to-[#00D4FF]/8 p-10 md:p-16 text-center">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-[#39FF14]/8 blur-3xl" />
                <div className="absolute bottom-0 right-0 w-60 h-60 rounded-full bg-[#00D4FF]/5 blur-3xl" />
              </div>
              <div className="relative">
                <h2 className="font-display text-3xl md:text-5xl font-black mb-4 leading-tight">
                  Готовы вступить в СРО?
                </h2>
                <p className="text-white/50 text-lg mb-8 max-w-xl mx-auto">
                  Оставьте заявку и получите бесплатную консультацию в течение 30 минут
                </p>
                <button
                  onClick={() => scrollTo("contacts")}
                  className="bg-[#39FF14] text-[#0A0C10] font-black text-base px-10 py-4 rounded-full hover:bg-[#57FF35] hover:scale-105 transition-all duration-200 shadow-[0_0_40px_rgba(57,255,20,0.35)]"
                >
                  Получить консультацию бесплатно
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="mb-12">
              <span className="text-[#39FF14] text-sm font-semibold uppercase tracking-widest mb-4 block">Контакты</span>
              <h2 className="font-display text-4xl md:text-5xl font-black">Свяжитесь с нами</h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-8">
            <Reveal>
              <div className="space-y-5">
                {[
                  { icon: "Phone", label: "Телефон", value: "+7 (800) 000-00-00" },
                  { icon: "Mail", label: "Email", value: "info@sro-expert.ru" },
                  { icon: "MapPin", label: "Адрес", value: "Москва, ул. Примерная, д. 1" },
                  { icon: "Clock", label: "Режим работы", value: "Пн–Пт 9:00–19:00" },
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-4 border border-white/8 rounded-2xl px-6 py-5 bg-white/[0.02]">
                    <div className="w-10 h-10 rounded-xl bg-[#39FF14]/10 border border-[#39FF14]/20 flex items-center justify-center shrink-0">
                      <Icon name={c.icon} size={18} className="text-[#39FF14]" fallback="Info" />
                    </div>
                    <div>
                      <div className="text-white/35 text-xs mb-0.5">{c.label}</div>
                      <div className="font-medium text-white">{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="border border-white/8 rounded-2xl p-8 bg-white/[0.02]">
                <h3 className="font-display font-bold text-xl mb-6">Оставить заявку</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-white/40 text-sm mb-1.5 block">Ваше имя</label>
                    <input
                      type="text"
                      placeholder="Иван Иванов"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#39FF14]/40 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-white/40 text-sm mb-1.5 block">Телефон</label>
                    <input
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#39FF14]/40 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-white/40 text-sm mb-1.5 block">Вид СРО / вопрос</label>
                    <textarea
                      rows={3}
                      placeholder="Опишите вашу задачу..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#39FF14]/40 transition-colors resize-none"
                    />
                  </div>
                  <button className="w-full bg-[#39FF14] text-[#0A0C10] font-bold py-3.5 rounded-xl hover:bg-[#57FF35] hover:scale-[1.02] transition-all duration-200 shadow-[0_0_25px_rgba(57,255,20,0.25)] text-sm">
                    Отправить заявку
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display font-bold text-lg">
            <span className="text-[#39FF14]">СРО</span>
            <span className="text-white">Эксперт</span>
          </div>
          <p className="text-white/20 text-sm text-center">© 2024 СРОЭксперт. Профессиональное сопровождение в СРО.</p>
          <div className="flex gap-6 text-sm text-white/30">
            <button className="hover:text-white/60 transition-colors">Политика конфиденциальности</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
