import React from "react";
import { TypographyProps } from "@/components/Typography/Typograpgy";

const Subtitle: React.FC<TypographyProps> = ({ styleClass = "", children }) => {
  return (
    <div className={`text-xl font-semibold ${styleClass}`}>{children}</div>
  );
};

export default Subtitle;
