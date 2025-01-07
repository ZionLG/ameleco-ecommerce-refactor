import { Loader2 } from "lucide-react";
import React from "react";

export default function Loader() {
  return (
    <div className="ml-auto flex items-center gap-5">
      <Loader2 size={32} className="animate-spin" />
    </div>
  );
}
