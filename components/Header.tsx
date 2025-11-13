"use client";

import Link from "next/link";
import { useState } from "react";

const sections = [
  { href: "#builder", label: "Bill Builder" },
  { href: "#revision", label: "Revision Assistant" },
  { href: "#research", label: "Research Helper" },
  { href: "#examples", label: "Example Library" }
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-semibold text-primary">
          BillBuddy
        </Link>
        <nav className="hidden gap-6 text-sm font-medium text-slate-600 md:flex">
          {sections.map((section) => (
            <a key={section.href} href={section.href} className="hover:text-primary">
              {section.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="rounded-md border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 md:hidden"
          aria-expanded={open}
        >
          Menu
        </button>
      </div>
      {open ? (
        <nav className="border-t border-slate-200 bg-white px-4 py-2 md:hidden">
          <ul className="flex flex-col gap-2 text-sm font-medium text-slate-600">
            {sections.map((section) => (
              <li key={section.href}>
                <a
                  href={section.href}
                  className="block rounded-md px-3 py-2 hover:bg-slate-100 hover:text-primary"
                  onClick={() => setOpen(false)}
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
