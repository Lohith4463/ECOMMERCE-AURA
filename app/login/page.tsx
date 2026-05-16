"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Chrome, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/context/toast-context";

export default function LoginPage() {
  const { login, signup, loginWithGoogle } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectParam = searchParams.get("redirect");
  const redirect = redirectParam?.startsWith("/") && !redirectParam.startsWith("//") ? redirectParam : "/profile";
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function getFirebaseMessage(error: unknown) {
    const message = error instanceof Error ? error.message : "Check your Firebase configuration.";

    if (message.includes("auth/configuration-not-found") || message.includes("CONFIGURATION_NOT_FOUND")) {
      return "Enable Firebase Authentication, then enable Email/Password and Google providers in Firebase Console.";
    }

    if (message.includes("auth/operation-not-allowed")) {
      return "Enable this sign-in provider in Firebase Authentication.";
    }

    if (message.includes("auth/invalid-api-key")) {
      return "The Firebase web API key is invalid. Copy the web app config again from Firebase Project settings.";
    }

    if (message.includes("auth/unauthorized-domain")) {
      return "Add localhost and your final domain to Firebase Authentication authorized domains.";
    }

    if (
      message.includes("auth/invalid-credential") ||
      message.includes("auth/user-not-found") ||
      message.includes("INVALID_LOGIN_CREDENTIALS")
    ) {
      return "No matching account was found. Use Sign up first, or check the email and password.";
    }

    if (message.includes("auth/email-already-in-use")) {
      return "This email already has an account. Switch to Log in.";
    }

    if (message.includes("auth/weak-password")) {
      return "Use a password with at least 6 characters.";
    }

    if (message.includes("auth/invalid-email")) {
      return "Enter a valid email address.";
    }

    return message;
  }

  async function submit() {
    setLoading(true);
    try {
      if (isSignup) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
      toast({ title: "Welcome to AURA", description: "Your private profile is now active." });
      router.push(redirect);
    } catch (error) {
      toast({ title: "Firebase Authentication setup needed", description: getFirebaseMessage(error) });
    } finally {
      setLoading(false);
    }
  }

  async function submitGoogle() {
    setLoading(true);
    try {
      await loginWithGoogle();
      toast({ title: "Welcome to AURA", description: "Your private profile is now active." });
      router.push(redirect);
    } catch (error) {
      toast({ title: "Firebase Authentication setup needed", description: getFirebaseMessage(error) });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center px-4 pt-20">
      <div className="glass w-full max-w-md rounded-[8px] p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary">Identity</p>
        <h1 className="mt-3 font-display text-4xl">{isSignup ? "Create access" : "Welcome back"}</h1>
        <p className="mt-3 text-sm leading-6 text-white/58">
          {isSignup
            ? "Create your Firebase account once, then checkout and profile access will unlock."
            : "Already created an account? Log in here. New users should switch to Sign up first."}
        </p>
        <div className="mt-8 grid gap-4">
          <Input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" type="email" />
          <Input value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" type="password" />
          <Button onClick={submit} disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {isSignup ? "Sign up" : "Log in"}
          </Button>
          <Button variant="outline" onClick={submitGoogle} disabled={loading}>
            <Chrome className="h-4 w-4" />
            Continue with Google
          </Button>
          <button className="text-sm text-white/55 hover:text-primary" onClick={() => setIsSignup((value) => !value)}>
            {isSignup ? "Already have access? Log in" : "Need an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
}
