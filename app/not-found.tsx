import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center px-4 pt-20 text-center">
      <div>
        <p className="font-display text-8xl text-primary">404</p>
        <h1 className="mt-4 text-3xl font-semibold">Signal lost.</h1>
        <p className="mt-3 text-white/58">The page you requested is outside this drop.</p>
        <Button asChild className="mt-6">
          <Link href="/">Return home</Link>
        </Button>
      </div>
    </div>
  );
}
