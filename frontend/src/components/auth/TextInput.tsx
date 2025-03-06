"use client";

import { TextField } from "@mui/material";
import { useState } from "react";

export interface AuthTextInputProps {
  id: string;
  label: string;
  autoComplete?: string;
  required?: boolean;
  autoFocus?: boolean;
  onChange: (value: string) => void;
}

export default function AuthTextInput({
  id,
  label,
  autoComplete,
  required = true,
  autoFocus = false,
  onChange,
}: AuthTextInputProps) {
  const [value, setValue] = useState("");

  const getAutoComplete = () => autoComplete ?? id;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (onChange) onChange(e.target.value);
  };

  return (
    <TextField
      margin="normal"
      required={required}
      fullWidth
      id={id}
      label={label}
      name={id}
      type={"text"}
      autoComplete={getAutoComplete()}
      autoFocus={autoFocus}
      value={value}
      onChange={handleChange}
    />
  );
}
