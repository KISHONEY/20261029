export default function PageTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="py-16 sm:py-24">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-4 text-4xl sm:text-5xl">{title}</h1>
      {description && <p className="mt-4 text-stone-600">{description}</p>}
    </header>
  );
}
