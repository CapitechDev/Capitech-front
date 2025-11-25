import { Card, CardBody } from "@heroui/card";
import React from "react";
import { HomeTrailImage } from "../atoms/homeTrailImage";
import Link from "next/link";
import { findAllPublicTrailsCached } from "@/lib/trail/public-queries";

export default async function TrailsSection() {
  const trailsResponse = await findAllPublicTrailsCached();

  if (!trailsResponse) {
    return <img src="/assets/home/trails-notfound.png" alt="Trilha não encontrada" className="mx-auto mb-8 w-80 h-80 object-contain" />;
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {trailsResponse.map((trail: any) => (
        // usa `group` para efeitos de hover e transição suave
        (<Card
          key={trail.id}
          className="group transition-transform duration-200 ease-out hover:-translate-y-1 transform"
        >
          <CardBody className="overflow-visible py-2 flex flex-col justify-between items-center bg-capi_gray_login p-5">
            <HomeTrailImage
              trailName={trail.name}
              className="transition-transform duration-200 ease-out group-hover:scale-105"
            />
            <div className="text-center">
              <p className="text-3xl font-headline text-white font-bold transition duration-300 mb-2 hover:text-gray-200">
                {trail.name}
              </p>
              <Link href={`trilhas/${trail.id}`}>
                <p className="text-center text-xl font-headline text-white font-bold underline transition duration-300 hover:text-gray-200">
                  {trail.subtitle}
                </p>
              </Link>
            </div>
          </CardBody>
        </Card>)
      ))}
    </div>
  );
}
