"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import AuthContainer from "@/components/auth/AuthContainer";
import AuthSubcontainer from "@/components/auth/AuthSubcontainer";
import AuthTextInput from "@/components/auth/TextInput";
import PasswordInput from "@/components/auth/PasswordInput";
import SubmitButton from "@/components/auth/SubmitButton";
import GoogleSignIn from "@/components/auth/GoogleSignIn";
import { AuthError } from "@supabase/supabase-js";

export default function Login() {
  const supabase = createClient();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = async () => {
    setLoading(true);
    setError(null);
    const data = { email, password };
    try {
      const { error } = await supabase.auth.signInWithPassword(data);

      if (error) throw error;
      // Redirect will happen automatically if session is established
    } catch (error) {
      const message =
        error instanceof AuthError
          ? error.message
          : "An error occurred during login";
      setError(message);
      setLoading(false);
    }
  };

  const handleSocialAuth = async (provider: "google") => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
    } catch (error) {
      const message =
        error instanceof AuthError
          ? error.message
          : "An error occurred during login";
      setError(message);
      setLoading(false);
    }
  };

  return (
    <AuthContainer title="Sign in" error={error}>
      <AuthSubcontainer withDivider={true}>
        <AuthTextInput
          id="email"
          autoFocus={true}
          label="Email"
          onChange={setEmail}
        />
        <PasswordInput onChange={setPassword} />
        <SubmitButton
          loading={loading}
          text="Sign In"
          onSubmit={handleSignin}
        />
      </AuthSubcontainer>
      <AuthSubcontainer>
        <GoogleSignIn
          handler={() => handleSocialAuth("google")}
          loading={loading}
        />
      </AuthSubcontainer>
    </AuthContainer>
  );
}
