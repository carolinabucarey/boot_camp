import Link from "next/link";
import Wordmark from "./Wordmark";
import SocialLinks from "./SocialLinks";
import { siteContent } from "@/lib/site-content";

export default function SiteFooter({ columns }) {
  const { brand } = siteContent;
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Wordmark />
            <p>{brand.descriptor}</p>
          </div>
          {columns.map((column) => (
            <div key={column.title}>
              <p className="footer-title">{column.title}</p>
              <nav className="footer-links">
                {column.links.map((link) =>
                  link.social ? (
                    <SocialLinks key="socials" />
                  ) : link.external ? (
                    <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.label}
                    </a>
                  ) : (
                    <Link key={link.label} href={link.href}>
                      {link.label}
                    </Link>
                  )
                )}
              </nav>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>
            © {year} {brand.name}. Derechos reservados.
          </span>
          <span>De una necesidad real a una solución propia con tecnología.</span>
        </div>
      </div>
    </footer>
  );
}
