import { Image } from "@heroui/image";

interface IHomeTrailImageProps {
  trailName: string;
  className?: string;
}

const imagesRecord: Record<string, string>  = {
  html5: "html.png",
  html: "html.png",
  javascript: "javascript.png", 
  css: "css.png",
  sql: "sql.png",
  reactjs: "react.png",
  react: "react.png",
  express: "express.png"
}

export const HomeTrailImage = ({ trailName, className = "" }: IHomeTrailImageProps) => {
  const chooseImage = (name: string) => {
    const nameLowerCase = name.toLowerCase();
    if (imagesRecord[nameLowerCase]) {
      const img = imagesRecord[nameLowerCase];
      console.log(`/assets/trails/${img}`)
      return `/assets/trails/${img}`;
    }
    return "/assets/logo.png"
  };

  return (
    <>
      <Image className={"mb-2 " + className} src={chooseImage(trailName)} width={160} />
    </>
  );
};
