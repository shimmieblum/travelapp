"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import {
  AuthContainer,
  AuthSubcontainer,
  AuthTextInput,
  PasswordInput,
  SubmitButton,
  StyledDivider,
  AuthNavLink,
} from "@/components/auth";
import { AuthError } from "@supabase/supabase-js";
import { redirect, useRouter } from "next/navigation"; // Changed this import

export default function Login() {
  const router = useRouter(); // Add this line to get the router instance
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
      // Sign in with password
      const { error, data: signInData } =
        await supabase.auth.signInWithPassword(data);

      if (error) throw error;
      console.log(signInData); // Log the response

      // Set a small delay to ensure cookies are properly set
      router.push("/welcome"); // Use the redirect function instead of router.push("/welcome")
    } catch (error) {
      const message =
        error instanceof AuthError
          ? error.message
          : "An error occurred during login";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // const handleSocialAuth = async (provider: "google") => {
  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const { error } = await supabase.auth.signInWithOAuth({
  //       provider,
  //       options: {
  //         redirectTo: `${window.location.origin}/auth/callback`,
  //       },
  //     });

  //     if (error) throw error;
  //   } catch (error) {
  //     const message =
  //       error instanceof AuthError
  //         ? error.message
  //         : "An error occurred during login";
  //     setError(message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <AuthContainer title="Sign in" error={error}>
      <AuthSubcontainer>
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
        <AuthNavLink
          text="Don't have an account?"
          linkText="Sign up"
          href="/signup"
        />
      </AuthSubcontainer>
      {/* <StyledDivider text="or"/>
      {/* <AuthSubcontainer>
        <GoogleSignIn
          handler={() => handleSocialAuth("google")}
          loading={loading}
        />
      </AuthSubcontainer> */}
    </AuthContainer>
  );
}
