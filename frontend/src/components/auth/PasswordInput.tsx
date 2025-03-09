"use client";

import { useState } from "react";
import { 
  TextField, 
  InputAdornment, 
  IconButton 
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export interface PasswordInputProps {
  id?: string;
  label?: string;
  autoComplete?: string;
  required?: boolean;
  autoFocus?: boolean;
  onChange: (value: string) => void;
}

export function PasswordInput({
  id = "password",
  label = "Password",
  autoComplete = "current-password",
  required = true,
  autoFocus = false,
  onChange,
}: PasswordInputProps) {
  const [value, setValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <TextField
      margin="normal"
      required={required}
      fullWidth
      id={id}
      label={label}
      name={id}
      type={showPassword ? "text" : "password"}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      value={value}
      onChange={handleChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}