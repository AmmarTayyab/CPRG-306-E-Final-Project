interface InputTextProps {
  labelTitle: string;
  labelStyle?: string;
  type?: string;
  containerStyle?: string;
  defaultValue?: string;
  placeholder?: string;
  updateFormValue: (arg: { updateType: string; value: string }) => void;
  updateType: string;
}

interface SearchBarProps {
  searchText: string;
  styleClass?: string;
  placeholderText?: string;
  setSearchText: (text: string) => void;
}

interface Option {
  name: string;
  value?: string;
}

interface SelectBoxProps {
  labelTitle: string;
  labelDescription?: string;
  defaultValue?: string;
  containerStyle?: string;
  placeholder?: string;
  labelStyle?: string;
  options: Option[];
  updateType: string;
  updateFormValue: (arg: { updateType: string; value: string }) => void;
}

interface TextAreaInputProps {
  labelTitle: string;
  labelStyle?: string;
  containerStyle?: string;
  defaultValue?: string;
  placeholder?: string;
  updateFormValue: (arg: { updateType: string; value: string }) => void;
  updateType: string;
}

interface ToggleInputProps {
  labelTitle: string;
  labelStyle?: string;
  containerStyle?: string;
  defaultValue?: boolean;
  updateFormValue: (arg: { updateType: string; value: boolean }) => void;
  updateType: string;
}

export type {
  InputTextProps,
  SearchBarProps,
  Option,
  SelectBoxProps,
  TextAreaInputProps,
  ToggleInputProps,
};
