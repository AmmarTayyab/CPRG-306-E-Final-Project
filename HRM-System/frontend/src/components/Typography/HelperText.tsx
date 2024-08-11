import React from "react";
import { TypographyProps } from "@/components/Typography/Typograpgy";

const HelperText: React.FC<TypographyProps> = ({
  styleClass = "",
  children,
}) => {
  return <div className={`text-slate-400 ${styleClass}`}>{children}</div>;
};

export default HelperText;
