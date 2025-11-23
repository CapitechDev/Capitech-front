import React from "react";
import Image from "next/image";

const Sobre = () => {
  return (
    <div>
      <section className="relative bg-capi_seaGreen_about text-white flex items-center justify-center gap-8 p-8">
        <Image
          alt="Ícone de contato."
          className="hidden absolute left-28 w-16 sm:block"
          src="/assets/about/img_about01.png"
          width={64}
          height={64}
        />
        <h1 className="font-headline font-semibold text-white text-4xl">
          Sobre nós
        </h1>
      </section>

      <section className="container mx-auto max-w-4xl p-8 flex flex-col items-center gap-8">
        {/* Área de imagem */}
        <div className="w-full bg-white rounded-xl overflow-hidden shadow-md">
          
          <div className="relative h-64 md:h-80 w-1/2 mx-auto">
            <Image
              src="/assets/about/about.png"
              alt="Equipe Capitech"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Texto explicativo */}
        <div className="w-full bg-white/80 rounded-lg p-6 shadow-sm">
          <h2 className="text-center font-headline font-bold text-2xl mb-3 text-gray-900">
            Quem somos
          </h2>
          <p className="text-center text-base leading-relaxed text-gray-700 max-w-3xl mx-auto">
            Somos um grupo de estudantes e entusiastas da FATEC que criou o
            Capitech para compartilhar conteúdo prático e gratuito sobre
            desenvolvimento de software. Nosso objetivo é oferecer material
            objetivo, exercícios e referências úteis para quem quer aprender ou
            se aperfeiçoar em tecnologias modernas.
          </p>

          <h3 className="mt-6 text-center font-semibold text-lg text-gray-900">
            A ideia do projeto
          </h3>
          <p className="text-center text-base leading-relaxed text-gray-700 max-w-3xl mx-auto">
            Criar uma plataforma acessível que ajude estudantes a evoluir com
            conteúdos organizados por temas e níveis, exemplos práticos e links
            úteis, preparando para projetos reais e o mercado de trabalho.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Sobre;
