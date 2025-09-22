import { ReactElement } from "react";

interface ITextInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  labelStyle?: string;
}

export function TextInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  labelStyle,
}: ITextInputProps): ReactElement {
  return (
    <>
      <label className={`${labelStyle}`} htmlFor={id}>
        {label}
      </label>
      <input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} />
    </>
  );
}
