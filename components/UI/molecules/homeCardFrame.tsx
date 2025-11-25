import { Card, CardBody, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import Link from "next/link";
import React from "react";

interface IHomeCardFrames {
  img: string;
  title: string;
  content: string;
  color: string;
  // aceita tanto `href` quanto `link` para compatibilidade com diferentes chamadas
  href?: string;
  link?: string;
}

export default function HomeCardFrames({
  img,
  color,
  content,
  title,
  href,
  link,
}: IHomeCardFrames) {
  const target = href ?? link ?? "#";

  return (
    // `group` permite aplicar estilos filhos no hover do wrapper
    <Link href={target} className="block group">
      <Card
        className={`py-4 ${color} transition-transform duration-200 ease-out group-hover:shadow-xl hover:-translate-y-1 transform`}
      >
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-center basis-1/3">
          <Image
            alt="Card background"
            // aplica leve zoom na imagem ao passar o mouse
            className="object-cover rounded-xl transition-transform duration-200 ease-out group-hover:scale-105"
            src={img}
            width={80}
          />
        </CardHeader>
        <CardBody className="overflow-visible py-2 text-black text-center">
          <h3 className="font-headline text-xl font-bold my-1">{title}</h3>

          <p className="text-sm">{content}</p>
        </CardBody>
      </Card>
    </Link>
  );
}
