import { redirect } from "next/navigation";

import { getTrail } from "./utils";

import UpdateTrailTemplate from "@/components/UI/templates/updateTrailTemplate";

interface IUpdateTrailPageProps {
  params: {
    id: string;
  };
}

export default async function UpdateTrailPage({
  params: { id },
}: IUpdateTrailPageProps) {
  const trail = await getTrail(id);

  if (!trail) {
    return redirect("/admin");
  }

  return <UpdateTrailTemplate trail={trail} />;
}
