import Link from "next/link";
import { siteContent } from "@/lib/site-content";
import { splitWordmark } from "@/lib/brand";

export default function Wordmark({ className = "wordmark" }) {
  const { brand } = siteContent;
  const { prefix, highlight, suffix } = splitWordmark(brand.name, brand.nameHighlight);
  return (
    <Link className={className} href={brand.links.home} aria-label={`${brand.name}, ir al inicio`}>
      <img className="brand-mark" src={brand.logo} alt="" width={40} height={40} />
      <span>
        {prefix}
        {highlight ? <span className="ai">{highlight}</span> : null}
        {suffix}
      </span>
    </Link>
  );
}
