"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import {
  AuthContainer,
  AuthSubcontainer,
  AuthTextInput,
  PasswordInput,
  SubmitButton,
  AuthNavLink,
} from "@/components/auth";
import { AuthError } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function signup() {
  const router = useRouter();
  const supabase = createClient();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignup = async () => {
    setLoading(true);
    setError(null);
    try {
      // Include the name in the user metadata
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name, // Store the name in user metadata
          }
        }
      });

      if (error) throw error;
      
      // Redirect to login page after successful registration
      router.push("/login");
    } catch (error) {
      const message =
        error instanceof AuthError
          ? error.message
          : "An error occured during signup";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer title="Sign up" error={error}>
      <AuthSubcontainer>
        <AuthTextInput
          id="name"
          autoFocus={true}
          label="Name"
          onChange={setName}
        />
        <AuthTextInput
          id="email"
          label="Email"
          onChange={setEmail}
        />
        <PasswordInput onChange={setPassword} />
        <SubmitButton
          loading={loading}
          onSubmit={handleSignup}
          text="Sign Up"
        />
        <AuthNavLink 
          text="Already have an account?" 
          linkText="Sign in" 
          href="/login" 
        />
      </AuthSubcontainer>
      {/* <StyledDivider text="or"/>
      <AuthSubcontainer>
        <GoogleSignup/>
    
      </AuthSubcontainer> */}
    </AuthContainer>
  );
}
