"use client";

import { useState } from "react";

export default function CopierTexte({ texte }: { texte: string }) {
  const [copie, setCopie] = useState(false);

  function handleClick() {
    navigator.clipboard.writeText(texte);
    setCopie(true);
    setTimeout(() => setCopie(false), 2000);
  }

  return (
    <button
      onClick={handleClick}
      className="rounded-lg bg-ink text-paper font-semibold px-6 py-3"
    >
      {copie ? "Copié !" : "Copier le texte"}
    </button>
  );
}
