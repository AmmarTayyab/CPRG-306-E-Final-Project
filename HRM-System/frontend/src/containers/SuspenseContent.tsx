import React from "react";

function SuspenseContent() {
  return (
    <div className="w-full text-gray-300 absolute top-[-2px] left-0 z-[100]">
      <div className="h-1.5 w-full bg-blue-100 overflow-hidden">
        <div className="animate-progress w-full h-full bg-blue-500 origin-left-right"></div>
      </div>
    </div>
  );
}

export default SuspenseContent;
