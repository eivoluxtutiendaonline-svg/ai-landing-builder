"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProductForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.message ?? "No se pudo crear el producto");
      setLoading(false);
      return;
    }

    const data = await res.json();
    router.push(`/products/${data.product.id}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-night-700 bg-night-800/70 p-6 shadow-lg">
      <div>
        <h2 className="text-xl font-semibold text-slate-50">Crear producto</h2>
        <p className="text-sm text-slate-400">Define el contexto base para que la IA entienda el producto.</p>
      </div>

      <label className="block space-y-2 text-sm font-semibold text-slate-200">
        Nombre del producto
        <input
          className="w-full rounded-lg border border-night-700 bg-night-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-500/40"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

      <label className="block space-y-2 text-sm font-semibold text-slate-200">
        Descripción
        <textarea
          className="w-full rounded-lg border border-night-700 bg-night-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-500/40"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-night-900 shadow-glow transition hover:bg-brand-400 disabled:cursor-not-allowed"
        >
          {loading ? "Creando..." : "Guardar"}
        </button>
        {error && <span className="text-sm text-red-400">{error}</span>}
      </div>
    </form>
  );
}
