import ProgramCard from "./ProgramCard";

export default function ProgramGrid({ programs }) {
  return (
    <div className="cards-grid" id="program-list">
      {programs.map((program) => (
        <ProgramCard key={program.slug} program={program} />
      ))}
    </div>
  );
}
