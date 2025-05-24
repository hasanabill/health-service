"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!role || !allowedRoles.includes(role))) {
      router.push("/login");
    }
  }, [role, loading, allowedRoles, router]);

  if (loading) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
