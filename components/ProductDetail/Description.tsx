import { GroqData } from "@/interfaces/groqData";
import React from "react";
import { BodySolver } from "../BodySolver";

export const Description = ({ body }: GroqData.Description) => {
  return (
    <div className="prose py-10 mx-auto">
      {Array.isArray(body) &&
        body.map((element, idx) => {
          return <BodySolver key={idx} element={element} />;
        })}
    </div>
  );
};

export default Description;
