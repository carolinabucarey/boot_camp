import { siteContent } from "@/lib/site-content";

export default function SocialLinks() {
  const { brand } = siteContent;
  const socials = [
    ["Instagram", brand.links.instagram],
    ["WhatsApp", brand.links.whatsapp],
    ["LinkedIn", brand.links.linkedin]
  ].filter(([, href]) => href);
  if (!socials.length) return null;
  return (
    <span>
      {socials.map(([label, href], index) => (
        <span key={label}>
          {index > 0 ? " · " : ""}
          <a href={href} target="_blank" rel="noopener noreferrer">
            {label}
          </a>
        </span>
      ))}
    </span>
  );
}
