import SEO from "../components/SEO";
import Section from "../components/Section";
import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";

function Work() {
  return (
    <>
      <SEO
        title="Work"
        description="Selected project examples showcasing small-business websites."
      />
      <Section className="py-10">
        <h2 className="text-2xl font-bold mb-6">Projects</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.id} item={p} />
          ))}
        </div>
      </Section>
    </>
  );
}
export default Work;
