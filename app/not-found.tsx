import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-start justify-center bg-white px-4 pt-20">
      <div className="max-w-2xl text-center py-8">
        {/* imagem logo a baixo do header */}
        <img
          src="/assets/notfound.png"
          alt="Página não encontrada"
          className="mx-auto mb-8 w-80 h-80 object-contain"
        />

        <div className="flex justify-center gap-4">
          <Link
            href="/"
            className="inline-block bg-capi_green text-white px-5 py-3 rounded-md font-medium hover:bg-capi_green/90 transition"
          >
            Voltar para a Home
          </Link>

        </div>
      </div>
    </main>
  );
}
