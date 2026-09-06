import Wordmark from "./Wordmark";

export default function SecureBadgeHeader({ wrapperClassName, label }) {
  return (
    <header className={wrapperClassName}>
      <div className="container confirmation-nav">
        <Wordmark />
        <span className="confirmation-secure">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 10V8a5 5 0 0 1 10 0v2m-11 0h12v10H6V10Zm6 4v2" />
          </svg>
          {label}
        </span>
      </div>
    </header>
  );
}
