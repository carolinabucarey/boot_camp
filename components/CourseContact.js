import { siteContent } from "@/lib/site-content";

export default function CourseContact() {
  const { brand } = siteContent;
  const links = [
    ["WhatsApp", brand.links.whatsapp],
    ["Instagram", brand.links.instagram]
  ].filter(([, href]) => href);
  if (!links.length) return null;
  return (
    <p className="course-contact">
      ¿Tienes dudas?{" "}
      {links.map(([label, href], index) => (
        <span key={label}>
          {index > 0 ? " · " : ""}
          <a href={href} target="_blank" rel="noopener noreferrer">
            {label}
          </a>
        </span>
      ))}
    </p>
  );
}
