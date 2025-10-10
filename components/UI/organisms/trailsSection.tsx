import { Card, CardBody } from "@nextui-org/card";
import React from "react";
import { HomeTrailImage } from "../atoms/homeTrailImage";
import Link from "next/link";
import { findAllPublicTrailsCached } from "@/lib/trail/public-queries";

export default async function TrailsSection() {
  const trailsResponse = await findAllPublicTrailsCached();
  console.log({trailsResponse})

  if (!trailsResponse) {
    return <p className="text-center">Erro ao buscar trilhas.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {trailsResponse.map((trail: any) => (
        <Card key={trail.id}>
          <CardBody className="overflow-visible py-2 flex flex-col justify-between items-center bg-capi_gray_login p-5">
            <HomeTrailImage trailName={trail.name} />
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
        </Card>
      ))}
    </div>
  );
}
