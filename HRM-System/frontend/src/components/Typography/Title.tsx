import React from "react";
import { TypographyProps } from "@/components/Typography/Typograpgy";

const Title: React.FC<TypographyProps> = ({ styleClass = "", children }) => {
  return <p className={`text-2xl font-bold  ${styleClass}`}>{children}</p>;
};

export default Title;
