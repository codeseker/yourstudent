"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./components/Mode";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Ensure only HOD sir's email can access the dashboard
    if (session?.user?.email === process.env.NEXT_PUBLIC_HOD_SIR_EMAIL) {
      router.push("/admin/dashboard");
    }
  }, [session, router]);

  return (
    <div>
      {session?.user ? (
        <Button onClick={() => signOut()}>Logout</Button>
      ) : (
        <Button onClick={() => signIn()}>Login</Button>
      )}

      <ModeToggle />
    </div>
  );
}
