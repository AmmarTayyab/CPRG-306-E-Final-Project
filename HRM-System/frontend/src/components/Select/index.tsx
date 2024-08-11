import React, { useState } from "react";
import { OptionsProp } from "@/types/Modal";


interface SelectFieldProps {
  label: string;
  altLabel?: string;
  options: OptionsProp[];
  updateType:string,
  updateFormValue:any,
  defaultValue:number,
}

const SelectField = ({ label, altLabel, options ,updateType,updateFormValue,defaultValue=0}: SelectFieldProps) => {

  const [value, setValue] = useState<number>(defaultValue);


  const updateValue = (newValue: number) => {
    updateFormValue({ updateType, value: newValue });
    setValue(newValue);
  };
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">{label}</span>
        {altLabel && <span className="label-text-alt">{altLabel}</span>}
      </div>
      <select className="select select-bordered w-full" onChange={(e) => updateValue(+e.target.value)} value={value}>
        <option value="">Select</option>
        {options.map((option) => (
          <option value={option.id} key={option.id}>{option.name}</option>
        ))}
      </select>
      <div className="label">
        <span className="label-text-alt">{altLabel}</span>
        <span className="label-text-alt">Alt label</span>
      </div>
    </label>
  );
};

export default SelectField;
