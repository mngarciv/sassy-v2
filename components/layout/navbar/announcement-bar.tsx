const MESSAGES = [
  "Solo productos originales",
  "Venta · Compra · Permuta",
  "Envíos a todo Chile y el mundo",
  "+3000 ventas · 6 años",
];

/** Franja superior con los sellos de confianza de @sassy.snkrs. */
export function AnnouncementBar() {
  return (
    <div className="border-b border-white/10 bg-black">
      <ul className="mx-auto flex h-8 max-w-(--breakpoint-2xl) items-center justify-center gap-6 px-4 font-mono text-[10px] uppercase tracking-widest text-neutral-400 lg:px-6">
        {MESSAGES.map((message, i) => (
          <li
            key={message}
            className={i === 0 ? "text-white" : "hidden md:block"}
          >
            {message}
          </li>
        ))}
      </ul>
    </div>
  );
}
