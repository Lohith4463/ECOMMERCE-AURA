"use client";

import Link from "next/link";
import { PackageCheck, Settings, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";

export default function ProfilePage() {
  const { user, logout, loading } = useAuth();

  if (!loading && !user) {
    return (
      <div className="grid min-h-screen place-items-center px-4 pt-20 text-center">
        <div className="glass max-w-md rounded-[8px] p-8">
          <h1 className="font-display text-4xl">Private access required.</h1>
          <p className="mt-3 text-white/58">Log in to view orders, wishlist, address management, and your recommendation profile.</p>
          <Button asChild className="mt-6">
            <Link href="/login">Log in</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary">Profile</p>
      <h1 className="mt-3 font-display text-5xl">Your AURA account</h1>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {[
          [PackageCheck, "Orders", "Track limited drops and delivery status."],
          [ShieldCheck, "Security", "Firebase authentication and protected account state."],
          [Settings, "Preferences", "Tune sizes, colors, wishlist, and AI recommendations."]
        ].map(([Icon, title, copy]) => (
          <div key={String(title)} className="glass rounded-[8px] p-6">
            <Icon className="h-7 w-7 text-primary" />
            <h2 className="mt-5 text-xl font-semibold">{String(title)}</h2>
            <p className="mt-3 text-sm leading-6 text-white/58">{String(copy)}</p>
          </div>
        ))}
      </div>
      <div className="glass mt-6 rounded-[8px] p-6">
        <p className="text-sm text-white/55">Signed in as</p>
        <p className="mt-2 text-xl font-semibold">{user?.email ?? "Loading..."}</p>
        <Button variant="outline" className="mt-6" onClick={logout}>Log out</Button>
      </div>
    </div>
  );
}
