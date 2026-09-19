import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 py-8 px-6 text-sm text-ink/60">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between gap-4">
        <p>© {new Date().getFullYear()} Recouvre</p>
        <nav className="flex gap-4 flex-wrap">
          <Link href="/mentions-legales" className="hover:text-ink underline underline-offset-2">
            Mentions légales
          </Link>
          <Link href="/cgv" className="hover:text-ink underline underline-offset-2">
            CGV
          </Link>
          <Link href="/confidentialite" className="hover:text-ink underline underline-offset-2">
            Confidentialité
          </Link>
        </nav>
      </div>
    </footer>
  );
}
