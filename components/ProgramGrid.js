import ProgramCard from "./ProgramCard";

// Los programas con inscripciones abiertas se muestran primero.
const STATUS_ORDER = { open: 0, soon: 1, preparing: 2 };

function byStatus(programs) {
  return programs
    .map((program, index) => ({ program, index }))
    .sort((a, b) => {
      const rankA = STATUS_ORDER[a.program.statusKey] ?? 3;
      const rankB = STATUS_ORDER[b.program.statusKey] ?? 3;
      return rankA - rankB || a.index - b.index;
    })
    .map((item) => item.program);
}

export default function ProgramGrid({ programs }) {
  return (
    <div className="cards-grid" id="program-list">
      {byStatus(programs).map((program) => (
        <ProgramCard key={program.slug} program={program} />
      ))}
    </div>
  );
}
