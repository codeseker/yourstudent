"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

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
      <button className="bg-white text-black w-14" onClick={() => signIn()}>
        Login
      </button>

      <button className="bg-white text-black w-24" onClick={() => signOut()}>
        Logout
      </button>
    </div>
  );
}
