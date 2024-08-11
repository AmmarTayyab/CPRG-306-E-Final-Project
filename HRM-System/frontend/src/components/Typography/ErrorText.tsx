import React from "react";
import { TypographyProps } from "@/components/Typography/Typograpgy";

const ErrorText: React.FC<TypographyProps> = ({
  styleClass = "",
  children,
}) => {
  return <p className={`text-center text-error ${styleClass}`}>{children}</p>;
};

export default ErrorText;
