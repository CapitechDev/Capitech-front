import { Spinner } from "@heroui/spinner";
import React from "react";

export default function LoadingSpinner({ text }: { text: string }) {
  return (
    <div className="w-full h-96 flex gap-2 items-center justify-center">
      <p>{text}s</p>
      <Spinner color="primary" />
    </div>
  );
}
