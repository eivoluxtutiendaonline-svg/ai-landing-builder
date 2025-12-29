import Link from "next/link";

const navLinks = [
  { href: "/", label: "Dashboard" },
  { href: "/products", label: "Productos" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-night-700 bg-night-900/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-brand-200">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-700 text-night-900 shadow-glow">
            EM
          </span>
          <div className="flex flex-col leading-tight">
            <span>Eiva Magic</span>
            <span className="text-xs font-normal text-slate-400">Landing AI Engine</span>
          </div>
        </Link>
        <nav className="flex gap-3 text-sm font-medium text-slate-200">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 transition hover:bg-night-700 hover:text-brand-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
