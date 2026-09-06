"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Wordmark from "./Wordmark";

/*
 * Encabezado del sitio con menú móvil, portado de setupMenu() en script.js.
 * Se mantiene como un único componente cliente porque el botón (dentro de
 * nav-actions) y el panel (hermano del contenedor) comparten el mismo estado
 * de apertura, igual que en el HTML original.
 */
export default function SiteHeader({ navItems, current, ctaLabel, ctaHref }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    if (open) menuRef.current?.querySelector("a")?.focus();
  }, [open]);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape" && open) {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="site-header">
      <div className="container nav-shell">
        <Wordmark />
        <nav className="desktop-nav" aria-label="Navegación principal">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} aria-current={current === item.label ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <Link className="btn btn-primary" href={ctaHref}>
            {ctaLabel}
          </Link>
          <button
            ref={buttonRef}
            className="menu-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((value) => !value)}
          >
            <span></span>
          </button>
        </div>
      </div>
      <nav ref={menuRef} className={`mobile-nav${open ? " open" : ""}`} id="mobile-navigation" aria-label="Navegación móvil">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            aria-current={current === item.label ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        <div className="button-row">
          <Link className="btn btn-primary" href={ctaHref} onClick={() => setOpen(false)}>
            {ctaLabel}
          </Link>
        </div>
      </nav>
    </header>
  );
}
