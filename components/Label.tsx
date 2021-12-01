import { App } from "@/interfaces/app";
import React from "react";

const Label = ({ text }: App.Label) => {
  return <label className="font-bold text-sm mb-2 ml-1">{text}</label>;
};

export default Label;
