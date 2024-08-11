import React, { useState } from "react";
import { InputTextProps } from "@/components/Input/Input";

const InputText: React.FC<InputTextProps> = ({
  labelTitle,
  labelStyle = "",
  type = "text",
  containerStyle = "",
  defaultValue = "",
  placeholder = "",
  updateFormValue,
  updateType,
}) => {
  const [value, setValue] = useState<string>(defaultValue);

  const updateInputValue = (val: string) => {
    setValue(val);
    updateFormValue({ updateType, value: val });
  };

  return (
    <div className={`form-control w-full ${containerStyle}`}>
      <label className="label">
        <span className={"label-text text-base-content " + labelStyle}>
          {labelTitle}
        </span>
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => updateInputValue(e.target.value)}
        className="input input-bordered w-full"
      />
    </div>
  );
};

export default InputText;
