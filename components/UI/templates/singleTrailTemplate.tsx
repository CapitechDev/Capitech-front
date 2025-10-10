import { findOnePublicTrailCached } from "@/lib/trail/public-queries";
import { Image } from "@nextui-org/image";
import { notFound } from "next/navigation";
import React from "react";
import { SafeMarkdown } from "../molecules/safeMarkdown";

interface SingleTrailTemplateProps {
  id: string;
}

export default async function SingleTrailTemplate({
  id,
}: SingleTrailTemplateProps) {
  const trail = await findOnePublicTrailCached(id).catch((error) => null);

  if (!trail) {
    notFound();
  }

  return (
    <main>
      {trail && (
        <>
          <section className="bg-capi_blue_home_darker text-white text-center gap-8 p-8">
            <h2 className="font-headline font-semibold text-4xl">
              {trail.name}
            </h2>
          </section>
          <section className="container mx-auto max-w-5xl p-10 px-2 text-black">
            <div className="w-full flex justify-center items-center mb-5">
              <Image
                radius="none"
                src="/assets/trails/img_trilhas.png"
                width={700}
              />
            </div>

            <h2 className="text-center font-headline text-2xl font-semibold text-black mb-5">
              {trail.subtitle}
            </h2>

            <SafeMarkdown markdown={trail.description} />

            <h3 className="text-center text-xl font-semibold mb-7">
              Para se aprofundar no assunto, temos alguns vídeos como
              recomendação:
            </h3>

            <h3 className="text-lg font-bold text-center mb-5 sm:text-start">
              - {trail.video_title}
            </h3>

            <p className="text-lg mb-8">
              <b>Descrição: </b>
              {trail.video_description}
            </p>

            <a href={trail.references} rel="noreferrer" target="_blank">
              <p className="text-center underline text-blue-700 font-bold transition duration-300 hover:text-blue-800 mb-10">
                {trail.video_title}
              </p>
            </a>

            {/* {trail.iframe_references && ()} */}

            {trail && trail.iframe_references && (
              <div
                className="relative pb-[56.25%] h-0"
                style={{
                  position: "relative",
                  paddingBottom: "56.25%",
                  height: 0,
                }}
              >
                <iframe
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                  src={trail.iframe_references}
                  title="YouTube Video"
                />
              </div>
            )}
          </section>
        </>
      )}
    </main>
  );
}
