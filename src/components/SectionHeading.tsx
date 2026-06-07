import Reveal from "./Reveal";

type Props = {
  index: string;
  command: string;
  title: string;
  subtitle?: string;
};

export default function SectionHeading({ index, command, title, subtitle }: Props) {
  return (
    <Reveal className="mb-12 text-center">
      <p className="section-label mb-2">
        <span className="text-neon-blue">{index}</span> {command}
      </p>
      <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl md:text-5xl">
        <span className="gradient-text">{title}</span>
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl font-mono text-sm text-muted">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
