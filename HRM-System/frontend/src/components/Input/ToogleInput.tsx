import React, { useState } from "react";
import { ToggleInputProps } from "@/components/Input/Input";

const ToggleInput: React.FC<ToggleInputProps> = ({
  labelTitle,
  labelStyle = "",
  containerStyle = "",
  defaultValue = false,
  updateFormValue,
  updateType,
}) => {
  const [value, setValue] = useState<boolean>(defaultValue);

  const updateToggleValue = () => {
    const newValue = !value;
    setValue(newValue);
    updateFormValue({ updateType, value: newValue });
  };

  return (
    <div className={`form-control w-full ${containerStyle}`}>
      <label className="label cursor-pointer">
        <span className={"label-text text-base-content " + labelStyle}>
          {labelTitle}
        </span>
        <input
          type="checkbox"
          className="toggle"
          checked={value}
          onChange={updateToggleValue}
        />
      </label>
    </div>
  );
};

export default ToggleInput;
