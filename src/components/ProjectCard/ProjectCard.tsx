import { Card, CardBody } from "../ui/Card";
import Badge from "../ui/Badge";
import type { Project } from "../../data/projects";

function ProjectCard({ item }: { item: Project }) {
  return (
    <Card>
      {item.image ? (
        <img
          src={item.image}
          alt={item.title}
          className="aspect-[16/9] w-full object-cover rounded-t-xl2"
        />
      ) : (
        <div
          className="aspect-[16/9] bg-dracula-muted/15 rounded-t-xl2"
          aria-hidden
        />
      )}
      <CardBody>
        <h3 className="text-lg font-semibold">
          {item.link ? (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {item.title}
            </a>
          ) : (
            item.title
          )}
        </h3>
        <p className="mt-1 text-sm text-dracula-muted">{item.blurb}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {item.tags.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}

export default ProjectCard;
