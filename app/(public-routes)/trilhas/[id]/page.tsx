import { Suspense, use } from "react";
import SingleTrailTemplate from "@/components/UI/templates/singleTrailTemplate";
import LoadingSpinner from "@/components/UI/atoms/loading";

interface ITrailsProps {
  params: Promise<{
    id: string;
  }>;
}

export default function Trails({ params }: ITrailsProps) {
  const { id } = use(params);
  
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
