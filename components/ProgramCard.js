import Link from "next/link";
import { capacityLabel } from "@/lib/program-helpers";

export default function ProgramCard({ program }) {
  const capacity = capacityLabel(program.capacity);
  return (
    <article className="program-card">
      <div className="program-image">
        <img src={program.image} alt={program.imageAlt} width={800} height={600} loading="lazy" />
        <span className="status">{program.status}</span>
      </div>
      <div className="program-body">
        <div className="meta-row">
          <span className="meta">{program.modality}</span>
          <span className="meta">Nivel {program.level}</span>
          {program.duration !== "Por definir" && <span className="meta">{program.duration}</span>}
          {capacity && <span className="meta">{capacity}</span>}
        </div>
        <h3>
          {program.name}
          {program.tagline && <span className="program-tagline">{program.tagline}</span>}
        </h3>
        {program.need && (
          <div className="program-detail">
            <small>Necesidad</small>
            <p>{program.need}</p>
          </div>
        )}
        <p>{program.description}</p>
        <div className="result">
          <small>Qué podrás crear</small>
          <strong>{program.result}</strong>
        </div>
        <Link className="btn btn-secondary btn-arrow" href={program.href} data-track="select_program" data-program={program.slug}>
          {program.action}
        </Link>
      </div>
    </article>
  );
}
