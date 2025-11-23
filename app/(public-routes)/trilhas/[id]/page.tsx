import { Suspense } from "react";
import SingleTrailTemplate from "@/components/UI/templates/singleTrailTemplate";
import LoadingSpinner from "@/components/UI/atoms/loading";

interface ITrailsProps {
  params: {
    id: string;
  };
}

export default function Trails({ params: { id } }: ITrailsProps) {
  return (
    <Suspense
      fallback={
        <LoadingSpinner text="Carregando trilhas" />
      }
    >
      <SingleTrailTemplate id={id} />
    </Suspense>
  );
}
