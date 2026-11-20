import clsx from "clsx";

const Prose = ({ html, className }: { html: string; className?: string }) => {
  return (
    <div
      className={clsx(
        "prose max-w-none text-sm leading-relaxed text-inherit prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-ink prose-p:text-inherit prose-a:text-ink prose-a:underline prose-strong:text-ink prose-ol:list-decimal prose-ol:pl-6 prose-ul:list-disc prose-ul:pl-6 prose-li:text-inherit",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default Prose;
