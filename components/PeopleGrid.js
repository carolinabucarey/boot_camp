export default function PeopleGrid({ people }) {
  return (
    <div className="people-grid">
      {people.map((person) => (
        <article className="person-card" key={person.name}>
          <div className="person-body">
            <div className="person-header">
              <div className="person-visual">
                {person.image ? (
                  <img src={person.image} alt={person.imageAlt} width={600} height={800} loading="lazy" />
                ) : (
                  <span aria-label={`Perfil de ${person.name}`}>{person.initials}</span>
                )}
              </div>
              <div>
                <h3>{person.name}</h3>
                <p className="person-role">{person.role}</p>
              </div>
            </div>
            {person.specialty && <p className="person-specialty">{person.specialty}</p>}
            {person.bio && <p className="person-bio">{person.bio}</p>}
            <p className="person-programs">
              <strong>Programas:</strong> {person.programs.join(", ")}
            </p>
            {person.links.length > 0 && (
              <p className="person-links">
                {person.links.map((link, index) => (
                  <span key={link.label}>
                    {index > 0 ? " · " : ""}
                    <a href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                      {link.label}
                    </a>
                  </span>
                ))}
              </p>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
