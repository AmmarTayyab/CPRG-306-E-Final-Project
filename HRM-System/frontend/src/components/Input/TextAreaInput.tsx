import React, { useState } from "react";
import { TextAreaInputProps } from "@/components/Input/Input";

const TextAreaInput: React.FC<TextAreaInputProps> = ({
  labelTitle,
  labelStyle = "",
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
      <textarea
        value={value}
        className="textarea textarea-bordered w-full"
        placeholder={placeholder}
        onChange={(e) => updateInputValue(e.target.value)}
      ></textarea>
    </div>
  );
};

export default TextAreaInput;
