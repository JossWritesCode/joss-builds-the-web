import Section from "../Section";

function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="bg-white border-b border-dracula-muted/20">
      <Section className="py-10">
        <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
        {subtitle && <p className="mt-2 text-dracula-muted">{subtitle}</p>}
      </Section>
    </div>
  );
}
export default PageHeader;
