/**
 * The old page rendered 30 <h1> elements. Section titles are h2 now, and the
 * only h1 lives in the hero.
 */
export default function SectionHeading({
  accent,
  rest,
  id,
}: {
  accent: string;
  rest: string;
  id?: string;
}) {
  return (
    <h2
      id={id}
      className="mb-10 text-center text-3xl font-bold tracking-tight text-ink sm:text-4xl"
    >
      <span className="text-brand-500">{accent}</span> {rest}
    </h2>
  );
}
