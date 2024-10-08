import React from "react";
import Subtitle from "../Typography/Subtitle";
import { TitleCardProps } from "@/components/Cards/cards";

const TitleCard: React.FC<TitleCardProps> = ({
  title,
  children,
  topMargin = "mt-6",
  TopSideButtons,
}) => {
  return (
    <div className={`card w-full p-6 bg-base-100 shadow-xl ${topMargin}`}>
      {/* Title for Card */}
      <Subtitle styleClass={TopSideButtons ? "inline-block" : ""}>
        {title}

        {/* Top side button, show only if present */}
        {TopSideButtons && (
          <div className="inline-block float-right">{TopSideButtons}</div>
        )}
      </Subtitle>

      <div className="divider mt-2"></div>

      {/** Card Body */}
      <div className="h-full w-full pb-6 bg-base-100">{children}</div>
    </div>
  );
};

export default TitleCard;
