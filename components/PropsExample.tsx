export default function PropsExample({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="example-card">
      <h2>{title}</h2>
      <p>{description}</p>
      <small>it's PropsExample file</small>
    </section>
  );
}