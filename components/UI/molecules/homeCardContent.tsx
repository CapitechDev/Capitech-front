import { Card, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import React from "react";

interface IHomeCardContent {
  img: string;
  title: string;
  content: string;
  flexRowReverse: boolean;
  bgColor: string;
}

export default function HomeCardContent({
  img,
  title,
  content,
  flexRowReverse,
  bgColor,
}: IHomeCardContent) {
  return (
    // <div
    //   className={`flex flex-col gap-5 w-full min-h-64 ${bgColor} p-3 rounded-lg shadow-xl ${flexRowReverse ? "md:flex-row-reverse" : "md:flex-row"}`}
    // >
    // <div className="basis-2/6 flex items-center justify-center">
    //   <img src={img} className="w-full capi_vsm:w-3/4 md:w-full" alt="" />
    // </div>
    // <div className="basis-4/6 flex flex-col justify-center">
    //   <h2 className="font-headline font-semibold text-2xl text-center mb-5 md:text-left">
    //     {title}
    //   </h2>
    //   <p className="font-texts text-md text-center md:text-sm md:text-left">
    //     {content}
    //   </p>
    // </div>
    // </div>

    // usa `group` para permitir hover nos filhos (imagem/efeitos)
    <Card className={` ${bgColor} group transition-transform duration-200 ease-out hover:-translate-y-1 transform` }>
      <CardBody
        className={`overflow-visible text-black flex flex-col gap-5 w-full min-h-64 ${bgColor} p-3 rounded-lg ${
          flexRowReverse ? "md:flex-row-reverse" : "md:flex-row"
        }`}
      >
        <div className="basis-2/6 flex items-center justify-center">
          <Image className="w-full transition-transform duration-200 ease-out group-hover:scale-105" src={img} />
        </div>
        <div className="basis-4/6 flex flex-col justify-center">
          <h2 className="font-headline font-semibold text-2xl text-center mb-5 md:text-left">
            {title}
          </h2>
          <p className="font-texts text-md text-center md:text-sm md:text-left">
            {content}
          </p>
        </div>
      </CardBody>
    </Card>
  );
}
