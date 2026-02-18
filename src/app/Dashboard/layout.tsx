"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onUserChange } from "@/lib/login";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    onUserChange((user) => {
      if (!user) {
        router.push("/Login");
      } else {
        setChecking(false);
      }
    });
  }, [router]);

  if (checking) {
    return (
      <div className="text-center py-20 text-gray-500">
        Verificando sesión...
      </div>
    );
  }

  return <>{children}</>;
}
