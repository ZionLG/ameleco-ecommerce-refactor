import { Dot } from "lucide-react";
import React from "react";

function Stock({ stock }: { stock: number }) {
  return (
    <span
      className={`flex items-center font-bold ${
        stock > 0 ? "text-green-600" : "text-gray-500"
      }`}
    >
      <Dot />
      {stock > 0 ? (
        <span>In stock ({stock} units)</span>
      ) : (
        <span>Sold out</span>
      )}
    </span>
  );
}

export default Stock;
