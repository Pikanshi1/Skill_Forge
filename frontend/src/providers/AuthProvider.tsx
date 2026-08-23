"use client";

import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";

interface Props {
  children: React.ReactNode;
}

export default function AuthProvider({
  children,
}: Props) {

  const loadUser = useAuth().loadUser;

  useEffect(() => {

    loadUser();

  }, [loadUser]);

  return <>{children}</>;

}