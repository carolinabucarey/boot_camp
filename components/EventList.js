import Link from "next/link";
import { getEventDisplay } from "@/lib/program-helpers";

export default function EventList({ events, eventsFallback, programs }) {
  if (!events.length) {
    return (
      <div className="empty-state">
        <div>
          <h3>{eventsFallback.title}</h3>
          <p>{eventsFallback.description}</p>
        </div>
        <Link className="btn btn-primary" href={eventsFallback.href}>
          {eventsFallback.action}
        </Link>
      </div>
    );
  }

  return (
    <div className="event-list">
      {events.map((event) => {
        const { href, action, registrationStatus, capacity } = getEventDisplay(event, programs);
        const details = [event.facilitators?.length ? event.facilitators.join(", ") : "", capacity, event.cost, registrationStatus].filter(
          Boolean
        );
        return (
          <article className="event-card" key={event.title}>
            <div>
              <strong>{event.date}</strong>
              <br />
              <span>{event.time}</span>
            </div>
            <div>
              <p className="eyebrow">{event.topic}</p>
              <h3>{event.title}</h3>
              <p>
                {event.city} · {event.host}
              </p>
              {details.length > 0 && <p>{details.join(" · ")}</p>}
            </div>
            <Link className="btn btn-primary" href={href}>
              {action}
            </Link>
          </article>
        );
      })}
    </div>
  );
}
