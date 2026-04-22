import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const useInView = (threshold = 0.12) => {
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
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

const services = [
  { num: "01", title: "Полное сопровождение", desc: "Берём весь процесс на себя — от первичного аудита до внесения в государственные реестры." },
  { num: "02", title: "Подготовка документов", desc: "Собираем и оформляем полный пакет в строгом соответствии с требованиями СРО." },
  { num: "03", title: "Подача и контроль", desc: "Взаимодействуем с СРО, отслеживаем статус и оперативно устраняем замечания." },
  { num: "04", title: "Регистрация в реестрах", desc: "После одобрения вносим данные во все государственные реестры без вашего участия." },
  { num: "05", title: "Поддержка после вступления", desc: "Консультируем и сопровождаем при изменении требований или расширении допуска." },
];

const steps = [
  { title: "Консультация", desc: "Бесплатный разбор ситуации, выбор СРО и стратегии" },
  { title: "Аудит", desc: "Проверка имеющихся документов, составление списка недостающих" },
  { title: "Подготовка", desc: "Сбор и оформление пакета документов" },
  { title: "Подача", desc: "Подача в СРО и сопровождение рассмотрения" },
  { title: "Результат", desc: "Внесение в реестры и передача свидетельства" },
];

const faqs = [
  { q: "Сколько времени занимает вступление в СРО?", a: "В среднем 14–21 рабочий день. Срочная процедура — от 7 дней." },
  { q: "Какие документы нужны?", a: "Учредительные документы, дипломы специалистов, справки об отсутствии судимостей. Полный список — после консультации." },
  { q: "Гарантируете ли вы результат?", a: "98% клиентов вступают с первого раза. При отказе — дорабатываем и подаём повторно бесплатно." },
  { q: "Работаете с регионами?", a: "Да, по всей России. Все процессы ведём дистанционно." },
  { q: "Стоимость услуг?", a: "Базовое сопровождение от 25 000 руб. Точная цена — после консультации." },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1A1A1A] font-body overflow-x-hidden">

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-[#FAFAF8] transition-all duration-300 ${scrolled ? "border-b border-[#E8E5DF]" : ""}`}>
        <div className="max-w-6xl mx-auto px-8 py-5 flex items-center justify-between">
          <div className="font-display text-xl font-semibold tracking-wide text-[#1A1A1A]">
            СРОЭксперт
          </div>
          <div className="hidden md:flex items-center gap-10 text-sm text-[#888880]">
            {[["services","Услуги"],["process","Процесс"],["faq","Вопросы"],["contacts","Контакты"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="hover:text-[#1A1A1A] transition-colors duration-200 tracking-wide">{label}</button>
            ))}
          </div>
          <button
            onClick={() => scrollTo("contacts")}
            className="hidden md:block border border-[#1A1A1A] text-[#1A1A1A] text-sm px-6 py-2.5 hover:bg-[#1A1A1A] hover:text-[#FAFAF8] transition-all duration-200 tracking-wide"
          >
            Консультация
          </button>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} className="text-[#1A1A1A]" />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-[#E8E5DF] bg-[#FAFAF8] px-8 py-6 flex flex-col gap-5 text-sm">
            {[["services","Услуги"],["process","Процесс"],["faq","Вопросы"],["contacts","Контакты"]].map(([id,label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-[#888880] hover:text-[#1A1A1A] text-left tracking-wide">{label}</button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="pt-40 pb-32 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-4xl" style={{ animation: "fadeUp 0.8s ease forwards" }}>
            <p className="text-sm text-[#888880] tracking-widest uppercase mb-8">Профессиональное сопровождение</p>
            <h1 className="font-display text-6xl md:text-8xl font-semibold leading-[1.05] mb-10 text-[#1A1A1A] tracking-tight">
              Вступление<br />в СРО<br /><span className="text-[#888880]">под ключ</span>
            </h1>
            <p className="text-lg text-[#666660] max-w-xl leading-relaxed mb-12">
              Берём на себя полный процесс вступления — от подготовки документов до внесения в государственные реестры. В среднем 14 дней.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <button
                onClick={() => scrollTo("contacts")}
                className="bg-[#1A1A1A] text-[#FAFAF8] text-sm px-8 py-4 hover:bg-[#333330] transition-colors duration-200 tracking-wide"
              >
                Бесплатная консультация
              </button>
              <button
                onClick={() => scrollTo("services")}
                className="text-sm text-[#888880] hover:text-[#1A1A1A] transition-colors duration-200 flex items-center gap-2 tracking-wide"
              >
                Наши услуги <Icon name="ArrowRight" size={16} />
              </button>
            </div>
          </div>

          <div className="mt-24 pt-10 border-t border-[#E8E5DF] grid grid-cols-2 md:grid-cols-4 gap-10">
            {[
              { v: "98%", l: "Успешных вступлений" },
              { v: "14", l: "Дней в среднем" },
              { v: "500+", l: "Компаний-клиентов" },
              { v: "7 лет", l: "На рынке" },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div>
                  <div className="font-display text-4xl md:text-5xl font-semibold text-[#1A1A1A] mb-1">{s.v}</div>
                  <div className="text-sm text-[#888880] tracking-wide">{s.l}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-[#E8E5DF]" />

      {/* SERVICES */}
      <section id="services" className="py-28 px-8">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
              <div>
                <p className="text-sm text-[#888880] tracking-widest uppercase mb-4">Услуги</p>
                <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight">Что мы берём<br />на себя</h2>
              </div>
              <p className="text-[#666660] text-base max-w-xs leading-relaxed">
                Каждый этап — под нашим контролем. Вы занимаетесь бизнесом.
              </p>
            </div>
          </Reveal>

          <div>
            {services.map((s, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="group flex items-start gap-6 md:gap-10 py-7 border-t border-[#E8E5DF] hover:bg-[#F4F1EB] -mx-4 px-4 transition-colors duration-200 cursor-default">
                  <span className="text-xs text-[#BBBBAA] font-mono mt-1 w-6 shrink-0">{s.num}</span>
                  <h3 className="font-display text-lg font-semibold w-56 shrink-0">{s.title}</h3>
                  <p className="text-[#666660] text-sm leading-relaxed flex-1 hidden md:block">{s.desc}</p>
                  <Icon name="ArrowUpRight" size={14} className="text-[#DDDDCC] group-hover:text-[#888880] mt-1 shrink-0 transition-colors duration-200" />
                </div>
              </Reveal>
            ))}
            <div className="border-t border-[#E8E5DF]" />
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-28 px-8 bg-[#F4F1EB]">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="mb-16">
              <p className="text-sm text-[#888880] tracking-widest uppercase mb-4">Процесс</p>
              <h2 className="font-display text-4xl md:text-5xl font-semibold">Пять шагов<br />до результата</h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-5 gap-8 md:gap-4">
            {steps.map((s, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="relative flex flex-col items-start md:items-center md:text-center">
                  <div className="w-10 h-10 rounded-full bg-[#1A1A1A] text-[#FAFAF8] flex items-center justify-center text-xs font-mono mb-4 shrink-0">
                    {i + 1}
                  </div>
                  <h4 className="font-display text-base font-semibold mb-2 text-[#1A1A1A]">{s.title}</h4>
                  <p className="text-xs text-[#888880] leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="py-20 px-8 bg-[#1A1A1A]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#FAFAF8] max-w-xl leading-tight">
              Готовы начать?<br /><span className="text-[#666660]">Консультация — бесплатно.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <button
              onClick={() => scrollTo("contacts")}
              className="border border-[#FAFAF8] text-[#FAFAF8] text-sm px-8 py-4 hover:bg-[#FAFAF8] hover:text-[#1A1A1A] transition-all duration-200 tracking-wide shrink-0"
            >
              Оставить заявку
            </button>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-28 px-8">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row md:gap-24">
              <div className="md:w-64 shrink-0 mb-12 md:mb-0">
                <p className="text-sm text-[#888880] tracking-widest uppercase mb-4">Вопросы</p>
                <h2 className="font-display text-4xl font-semibold leading-tight">Частые<br />вопросы</h2>
              </div>
              <div className="flex-1">
                {faqs.map((f, i) => (
                  <div key={i} className="border-t border-[#E8E5DF]">
                    <button
                      className="w-full flex items-start justify-between gap-6 py-6 text-left group"
                      onClick={() => setActiveTab(activeTab === i ? null : i)}
                    >
                      <span className="font-display text-base font-semibold text-[#1A1A1A] group-hover:text-[#444440] leading-snug">{f.q}</span>
                      <Icon name={activeTab === i ? "Minus" : "Plus"} size={16} className="shrink-0 mt-0.5 text-[#888880]" />
                    </button>
                    <div style={{
                      maxHeight: activeTab === i ? "160px" : "0",
                      opacity: activeTab === i ? 1 : 0,
                      overflow: "hidden",
                      transition: "max-height 0.3s ease, opacity 0.25s ease",
                    }}>
                      <p className="pb-6 text-[#666660] text-sm leading-relaxed">{f.a}</p>
                    </div>
                  </div>
                ))}
                <div className="border-t border-[#E8E5DF]" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="border-t border-[#E8E5DF]" />

      {/* CONTACTS */}
      <section id="contacts" className="py-28 px-8">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row md:gap-24">
              <div className="md:w-64 shrink-0 mb-12 md:mb-0">
                <p className="text-sm text-[#888880] tracking-widest uppercase mb-4">Контакты</p>
                <h2 className="font-display text-4xl font-semibold leading-tight mb-10">Свяжитесь<br />с нами</h2>
                <div className="space-y-6 text-sm">
                  {[
                    { label: "Телефон", value: "+7 (800) 000-00-00" },
                    { label: "Email", value: "info@sro-expert.ru" },
                    { label: "Адрес", value: "Москва" },
                    { label: "Часы работы", value: "Пн–Пт, 9:00–19:00" },
                  ].map((c, i) => (
                    <div key={i}>
                      <div className="text-[#AAAAAA] text-xs tracking-widest uppercase mb-1">{c.label}</div>
                      <div className="text-[#1A1A1A] font-medium">{c.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1 max-w-lg">
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs text-[#888880] tracking-widest uppercase mb-2">Имя</label>
                    <input
                      type="text"
                      placeholder="Иван Иванов"
                      className="w-full bg-transparent border border-[#D8D5CF] px-4 py-3 text-sm text-[#1A1A1A] placeholder-[#BBBBAA] focus:outline-none focus:border-[#1A1A1A] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#888880] tracking-widest uppercase mb-2">Телефон</label>
                    <input
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      className="w-full bg-transparent border border-[#D8D5CF] px-4 py-3 text-sm text-[#1A1A1A] placeholder-[#BBBBAA] focus:outline-none focus:border-[#1A1A1A] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#888880] tracking-widest uppercase mb-2">Вопрос или вид СРО</label>
                    <textarea
                      rows={4}
                      placeholder="Опишите вашу задачу..."
                      className="w-full bg-transparent border border-[#D8D5CF] px-4 py-3 text-sm text-[#1A1A1A] placeholder-[#BBBBAA] focus:outline-none focus:border-[#1A1A1A] transition-colors resize-none"
                    />
                  </div>
                  <button className="w-full bg-[#1A1A1A] text-[#FAFAF8] text-sm py-4 hover:bg-[#333330] transition-colors duration-200 tracking-wide">
                    Отправить заявку
                  </button>
                  <p className="text-xs text-[#AAAAAA] leading-relaxed">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности. Ответим в течение 30 минут.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#E8E5DF] py-8 px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display text-base font-semibold text-[#1A1A1A]">СРОЭксперт</div>
          <p className="text-xs text-[#AAAAAA] tracking-wide">© 2024 СРОЭксперт. Профессиональное сопровождение.</p>
          <button className="text-xs text-[#AAAAAA] hover:text-[#666660] transition-colors tracking-wide">Политика конфиденциальности</button>
        </div>
      </footer>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
